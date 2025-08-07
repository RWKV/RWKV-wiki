# RWKV pip Usage Guide

The following content will guide you on **developing applications based on RWKV models using the [RWKV pip library](https://pypi.org/project/rwkv/)**.

The original code for the RWKV pip library can be found in the **[ChatRWKV](https://github.com/BlinkDL/ChatRWKV)** repository.

## Detailed Explanation of API_DEMO_CHAT.py

> **[API_DEMO_CHAT](https://github.com/BlinkDL/ChatRWKV/blob/main/API_DEMO_CHAT.py)** is a development demo based on the RWKV pip library, used to **implement a command-line chatbot**.
>
> The following will introduce the code design of this chatbot DEMO with detailed comments, section by section.

```python
########################################################################################################
# The RWKV Language Model - https://github.com/BlinkDL/RWKV-LM
########################################################################################################

print("RWKV Chat Simple Demo")  # Print a simple message indicating this is a RWKV chat demo.
import os, copy, types, gc, sys, re  # Import packages for OS, object copying, types, garbage collection, system, and regex
import numpy as np  # Import numpy library
from prompt_toolkit import prompt  # Import prompt from prompt_toolkit for command line input
import torch  # Import pytorch library
```

This part of the code imports packages needed for inference with the RWKV model. Note the following two points:

- Minimum torch version is 1.13, with 2.x+cu121 recommended
- You need to `pip install rwkv` first

---

```python
# Optimize PyTorch settings, allow using tf32
torch.backends.cudnn.benchmark = True
torch.backends.cudnn.allow_tf32 = True
torch.backends.cuda.matmul.allow_tf32 = True

# os.environ["RWKV_V7_ON"] = '1' # Enable RWKV-7 model
os.environ["RWKV_JIT_ON"] = "1" # Enable JIT compilation
os.environ["RWKV_CUDA_ON"] = "0"  # Disable native CUDA operators, change to '1' to enable CUDA operators (faster, but requires c++ compiler and CUDA libraries)
```

> When inferencing RWKV-7 models, make sure to set `os.environ["RWKV_V7_ON"]` to `1`.

These are torch settings and environment optimizations to speed up inference.

---

```python
from rwkv.model import RWKV  # Import RWKV class from the RWKV model library for loading and operating RWKV models.
from rwkv.utils import PIPELINE  # Import PIPELINE from RWKV utility library for data encoding and decoding

args = types.SimpleNamespace()

args.strategy = "cuda fp16"  # Device and precision for model inference, using CUDA (GPU) with FP16 precision
args.MODEL_NAME = "E://RWKV-Runner//models//rwkv-final-v6-2.1-1b6"  # Specify the path to the RWKV model, absolute path recommended
```

This section introduces two utility classes from the RWKV toolkit: RWKV and PIPELINE, and specifies the **device** and **precision** for loading the RWKV model, as well as the local file path of the RWKV model.

`args.strategy` affects the model's generation effect and speed. ChatRWKV supports the following strategies:

> In the table below, `fp16i8` refers to int8 quantization based on fp16 precision.
>
> Quantization can reduce VRAM requirements but is slightly inferior to fp16 in precision. Therefore, if VRAM is sufficient, try to use fp16 layers.

| Strategy | VRAM & RAM | Speed |
| --- | --- | --- |
| **cpu fp32** | 32GB RAM for 7B model | Uses CPU with fp32 precision to load the model, suitable for Intel. Very slow for AMD because pytorch's cpu gemv has issues on AMD and only runs on a single core. |
| **cpu bf16** | 16GB RAM for 7B model | Uses CPU with bf16 precision to load the model. Faster on newer Intel CPUs (like Xeon Platinum) that support bfloat16. |
| **cpu fp32i8** | 12GB RAM for 7B model | Uses CPU with int8 quantization precision to load the model. Slower (even slower than cpu fp32). |
| **cuda fp16** | 15GB VRAM for 7B model | Loads all model layers with fp16 precision, fastest speed but also highest VRAM requirement. |
| **cuda fp16i8** | 9GB VRAM for 7B model | Quantizes all model layers to int8, fairly fast. If you set `os.environ["RWKV_CUDA_ON"] = '1'` to compile CUDA kernels, it can reduce VRAM usage by 1-2GB. |
| **cuda fp16i8 \*20 -> cuda fp16** | VRAM usage between fp16 and fp16i8 | Quantizes the first 20 layers (`*20` indicates the number of layers) to fp16i8, with remaining layers loaded in fp16. If you have more VRAM after quantization, consider reducing the number of fp16i8 layers. If VRAM is insufficient, increase the number of fp16i8 quantized layers. |
| **cuda fp16i8 \*20+** | Less VRAM than fp16i8 | Quantizes the first 20 layers to fp16i8 and pins them to the GPU, with other layers loaded dynamically as needed (unpinned layers load 3x slower but save VRAM). If VRAM is insufficient, reduce the number of pinned layers (`*20`). If VRAM is sufficient, increase the number of pinned layers. |
| **cuda fp16i8 \*20 -> cpu fp32** | Less VRAM than fp16i8, but consumes more RAM | Quantizes the first 20 layers to fp16i8 and pins them to the GPU, with other layers loaded in CPU fp32. This strategy is faster than the previous one (only pinning 20 layers to GPU) when CPU performance is strong. If you have remaining VRAM after loading 20 layers, consider increasing the number of GPU layers. If VRAM is insufficient, reduce the number of GPU layers. |
| **cuda:0 fp16 \*20 -> cuda:1 fp16** | Uses dual GPUs to drive the model | Loads the first 20 layers of the model on cuda:0 (GPU 1) with fp16, then loads the remaining layers on cuda:1 (GPU 2) with fp16 (automatically calculates the remaining layers). It's recommended to run more layers on the faster GPU. If VRAM on one card is insufficient, you can replace fp16 with fp16i8 (int8 quantization). |

---

```python
# STATE_NAME = None # Don't use State

# Specify the path to the State file to load.
STATE_NAME = "E://RWKV-Runner//models//rwkv-x060-eng_single_round_qa-1B6-20240516-ctx2048"  # Specify the path to the custom State file to load.
```

This section determines whether to load a State file. `"None"` means not loading a custom State; if you need to load one, fill in the absolute path to the State file.

> State is a unique status for RNN models like RWKV. By loading a custom State file, you can enhance the RWKV model's performance on different tasks. (Similar to enhancement plugins)

---

```python
# Set model decoding parameters
GEN_TEMP = 1.0
GEN_TOP_P = 0.3
GEN_alpha_presence = 0.5
GEN_alpha_frequency = 0.5
GEN_penalty_decay = 0.996

# Check if a State file is loaded. If a State is specified, adjust generation parameters for better response quality.
if STATE_NAME != None:
    GEN_TOP_P = 0.2
    GEN_alpha_presence = 0.3
    GEN_alpha_frequency = 0.3

CHUNK_LEN = 256  # Process input in chunks
```

This mainly sets which decoding parameters the RWKV model should use when **loading or not loading** a State.

> For the meaning and function of RWKV decoding parameters, please refer to the [RWKV Decoding Parameters Documentation](../basic/decoding-parameters).

After specifying a custom State file, we want the model to better follow the format and style in the State, so we **lowered the topp parameter and penalty parameters**.

`CHUNK_LEN` divides the input text into blocks of the specified size. The larger this value, the **more text the model processes in parallel**, but also **uses more VRAM**. When VRAM is insufficient, consider adjusting it to 128 or 64.

---

```python
print(f"Loading model - {args.MODEL_NAME}")# Print model loading message
model = RWKV(model=args.MODEL_NAME, strategy=args.strategy)  # Load the RWKV model.
pipeline = PIPELINE(model, "rwkv_vocab_v20230424")  # Initialize PIPELINE, using the RWKV-World vocabulary to process input and output encoding/decoding.
```

This section starts loading the RWKV model using the previously set **strategy** and **decoding parameters**.

If you want a notification after the model is loaded, you can insert at the end of this section: `print(f"{args.MODEL_NAME} - Model loaded successfully")`

---

```python
model_tokens = []
model_state = None

# If STATE_NAME is specified, load the custom State file and initialize the model State
if STATE_NAME != None:
    args = model.args  # Get model parameters
    state_raw = torch.load(STATE_NAME + '.pth')  # Load State data from the specified State file
    state_init = [None for i in range(args.n_layer * 3)]  # Initialize state list
    for i in range(args.n_layer): # Start loop, traverse each layer.
        dd = model.strategy[i]  # Get the loading strategy for each model layer
        dev = dd.device  # Get the loading device for each layer (e.g., GPU)
        atype = dd.atype  # Get the data type for each layer (FP32/FP16 or int8, etc.)
        # Initialize model state
        state_init[i*3+0] = torch.zeros(args.n_embd, dtype=atype, requires_grad=False, device=dev).contiguous()
        state_init[i*3+1] = state_raw[f'blocks.{i}.att.time_state'].transpose(1,2).to(dtype=torch.float, device=dev).requires_grad_(False).contiguous()
        state_init[i*3+2] = torch.zeros(args.n_embd, dtype=atype, requires_grad=False, device=dev).contiguous()
    model_state = copy.deepcopy(state_init)  # Copy the initialized state
```

This code is used to load a custom State file and write it to the model's initialization State.

You usually don't need to modify this part of the code.

---

```python
def run_rnn(ctx):
    # Define two global variables for updating tokens and model state
    global model_tokens, model_state
    ctx = ctx.replace("\r\n", "\n")  # Convert CRLF (Windows line breaks) to LF (Linux line breaks) in the text
    tokens = pipeline.encode(ctx)  # Encode the text into tokens based on the RWKV model's vocabulary
    tokens = [int(x) for x in tokens]  # Convert tokens to an integer (int) list to ensure type consistency
    model_tokens += tokens  # Add tokens to the global model token list

    while len(tokens) > 0:  # Use a while loop to perform model forward propagation until all tokens are processed
        out, model_state = model.forward(tokens[:CHUNK_LEN], model_state)  # Model forward propagation, process a token list of size CHUNK_LEN, and update model state
        tokens = tokens[CHUNK_LEN:]  # Remove the processed token block and continue processing the remaining tokens

    return out  # Return the model's prefill result
```

This is a function that controls the RWKV model using RNN mode for prefill. This function will cut the ctx (previous text) into segments of length CHUNK_LEN, feed them one by one into the RNN for processing, and finally obtain the model_state and out after processing the previous text.

This function accepts a ctx parameter, typically **text** (string). It then processes the text and the tokens converted from the text in several steps:

1. Use the `replace` method to standardize line breaks to `\n`, as RWKV model training datasets use `\n` as the standard line break format.
2. Use the `pipeline.encode` method to convert the user's input text into corresponding tokens according to the RWKV-World vocabulary.
3. Convert tokens to an integer (int) list to ensure type consistency.
4. Forward propagate based on the current token, process input text in parallel, update model state, and return out.

> Note that the `out` returned by the function is not a specific token or text; it returns the model's raw prediction (tensor) for the next token.

To convert `out` to actual tokens or text, you need to predict the next **token** through sampling (e.g., the `pipeline.sample_logits` function in the following code), and then decode the token into **text**.

---

```python
# If no custom State is loaded, use the initial prompt for conversation
if STATE_NAME == None:
    init_ctx = "User: hi" + "\n\n"
    init_ctx += "Assistant: Hi. I am your assistant and I will provide expert full response in full details. Please feel free to ask any question and I will always answer it." + "\n\n"
    run_rnn(init_ctx)  # Run RNN mode to prefill the initial prompt text
    print(init_ctx, end="")  # Print the initialized conversation text
```

If no State file is loaded, a **default conversation text** is used for prefill.

---

```python
# Read messages from user input, loop to generate the next token
while True:
    msg = prompt("User: ")  # Read messages from user input, store in the msg variable
    msg = msg.strip()  # Use the strip method to remove leading and trailing spaces from the message
    msg = re.sub(r"\n+", "\n", msg)  # Replace multiple line breaks with a single line break
    if len(msg) > 0:  # If after processing, the user input message is not empty
        occurrence = {}  # Use the occurrence dictionary to record the number of times each token appears in the generation context, used later to implement repetition penalty
        out_tokens = []  # Use the out_tokens list to record the tokens to be output
        out_last = 0  # Used to record the position of the last generated token

        out = run_rnn("User: " + msg + "\n\nAssistant:")  # Concatenate user input into RWKV dataset conversation format for prefill
        print("\nAssistant:", end="")  # Print the "Assistant:" label

        for i in range(99999):
            for n in occurrence:
                out[n] -= GEN_alpha_presence + occurrence[n] * GEN_alpha_frequency  # Apply presence penalty and frequency penalty parameters
            out[0] -= 1e10  # Disable END_OF_TEXT

            token = pipeline.sample_logits(out, temperature=GEN_TEMP, top_p=GEN_TOP_P)  # Sample to generate the next token

            out, model_state = model.forward([token], model_state)  # Model forward propagation
            model_tokens += [token]
            out_tokens += [token]  # Add the newly generated token to the output token list

            for xxx in occurrence:
                occurrence[xxx] *= GEN_penalty_decay  # Apply decay to repetition penalty
            occurrence[token] = 1 + (occurrence[token] if token in occurrence else 0)  # Update the token occurrence count

            tmp = pipeline.decode(out_tokens[out_last:])  # Decode the most recently generated tokens into text
            if ("\ufffd" not in tmp) and (not tmp.endswith("\n")):  # When the generated text is a valid UTF-8 string and doesn't end with a line break
                print(tmp, end="", flush=True) # Print the decoded text in real-time
                out_last = i + 1 # Update the output position variable out_last

            if "\n\n" in tmp:  # If the generated text contains double line breaks, indicating the model's response has ended (you can change \n\n to other stop words)
                print(tmp, end="", flush=True) # Print the decoded text in real-time
                break # End this round of inference
    else:
        print("!!! Error: please say something !!!")  # If the user didn't input a message, prompt "Input error, say something!"
```

**This section is the functional code for cyclically detecting user input and using RNN mode for inference to generate text.**

The main logic of the above code is as follows:

1. Receive user messages, standardize spaces and empty lines, judge the content length of the input text
   - If the user input is empty after standardization, prompt "Please say something"
   - If the user input is not empty after standardization, proceed to step 2
2. Concatenate the user's input into a chat format prompt, then perform prefill to get logits
3. Predict tokens and print the decoded text characters
   - Apply presence penalty (GEN_alpha_presence) and frequency penalty (GEN_alpha_frequency)
   - Sample `out` based on temperature and topp parameters to get the next token
   - Forward propagate with the new token to start the next round of prediction
   - Apply penalty decay parameter (penalty_decay) to adjust the probability of token generation
   - Decode the already generated token list into text characters
   - Output the decoded text characters in real-time, check if there are \n\n stop words in the text. If stop words appear, exit this round of inference.

---

From the inference process, we can see that the model updates the hidden state (State) at each time step and uses the current hidden state to generate the output for the next time step. This conforms to the core feature of RNN: **each output of the model depends on the generation result of the previous step**.
