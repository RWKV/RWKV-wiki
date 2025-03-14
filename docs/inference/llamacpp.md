# llama.cpp Inference - RWKV Inference Documentation  

---  
**description:** llama.cpp supports inference for RWKV models. This tutorial guides you on how to use llama.cpp to run RWKV model inference.  
**keywords:** llama.cpp RWKV inference, RWKV model inference with llamacpp, RWKV model llama.cpp tutorial, RWKV model quantized inference  

---  
::: tip  
[llama.cpp](https://github.com/ggerganov/llama.cpp) is a lightweight framework for running large language models, specifically optimized for CPU performance.  
:::  

Thanks to the efforts of RWKV community member [@MollySophia](https://github.com/MollySophia), llama.cpp now supports RWKV-6 models.  

This guide explains how to perform inference with RWKV-6 models using llama.cpp.  

## Inference with RWKV Models in llama.cpp  

### Build llama.cpp Locally  

You can download precompiled binaries from the [llama.cpp releases page](https://github.com/ggerganov/llama.cpp/releases).  

llama.cpp offers multiple precompiled versions. Choose the appropriate package based on your GPU type:  

| System | GPU Type | Package Name |  
|--------|----------|--------------|  
| macOS | Apple Silicon | `macos-arm64.zip` |  
| Windows | Intel GPU (including Arc dGPU/Xe iGPU) | `win-sycl-x64.zip` |  
| Windows | NVIDIA GPU (CUDA 11.7-12.3) | `win-cuda-cu11.7-x64.zip` |  
| Windows | NVIDIA GPU (CUDA 12.4+) | `win-cuda-cu12.4-x64.zip` |  
| Windows | AMD and other GPUs (including AMD iGPUs) | `win-vulkan-x64.zip` |  
| Windows | No GPU | `win-openblas-x64.zip` |  

Alternatively, follow the [official llama.cpp build instructions](https://github.com/ggerganov/llama.cpp/blob/master/docs/build.md) to compile from source.  

### Obtain GGUF Format Models  

llama.cpp uses `.gguf` format models, but RWKV officially releases `.pth` models. Use one of the methods below to obtain a `.gguf` model.  

::: tabs  
@tab Download GGUF Models (Recommended)  
Download pre-quantized GGUF models from the [RWKV-6-World-GGUF repository](https://modelscope.cn/collections/RWKV-6-World-GGUF-f06d2c9def1349).  

Create a `models` folder in your llama.cpp directory and place the downloaded GGUF model there.  

::: warning  
RWKV GGUF models come in various quantization levels. Higher precision (e.g., `FP16`) yields better responses but requires more resources.  

Recommended priority: `FP16` > `Q8_0` > `Q5_K_M` > `Q4_K_M`. Lower quantizations (e.g., `Q3_0`, `Q2_0`) may severely degrade performance.  

@tab Convert from HF to GGUF  

1. Download an RWKV Hugging Face model from the [RWKV HF Hub](https://huggingface.co/RWKV) or [mirror](https://hf-mirror.com/RWKV) (accessible in China), such as `RWKV/v6-Finch-1B6-HF`.  
2. Run the following command in the llama.cpp directory to convert the HF model to GGUF:  

```bash copy  
python llama.cpp/convert_hf_to_gguf.py ./v6-Finch-1B6-HF  
```  

::: warning  
Replace `./v6-Finch-1B6-HF` with your actual RWKV HF model directory.  

If you have a `.pth` model, use the [pth-to-HF script](#appendix-code) in the appendix to convert it to HF format first.  
:::  

### Run RWKV Model for Chat  

Execute the following command in the llama.cpp directory to start a **chat session**:  

```bash copy  
./llama-cli -m models/rwkv-6-world-7b-Q8_0.gguf -p "You are a helpful assistant" -cnv -t 8 -ngl 99 -n 500  
```  

This command runs the `models/rwkv-6-world-7b-Q8_0.gguf` model with 8 threads, initial prompt `You are a helpful assistant`, and generates up to 500 tokens per response.  

![llama.cpp-RWKV-inference-cnv-mode](./imgs/llama.cpp-RWKV-inference-cnv-mode.png)  

**Parameter Explanation:**  

- `./llama-cli`: Launches the compiled `llama-cli` executable.  
- `-m models/rwkv-6-world-7b-Q8_0.gguf`: Path to the model.  
- `-p "You are a helpful assistant"`: Initial prompt to start the chat.  
- `-cnv`: Enables chat mode (default, can be omitted).  
- `-t 8`: Thread count (adjust based on available CPU cores).  
- `-ngl 99`: Loads all model layers onto the GPU.  
- `-n 500`: Maximum tokens to generate.  

::: tip  
For a full list of parameters, see the [llama.cpp documentation](https://github.com/ggerganov/llama.cpp/blob/master/examples/main/README.md).  
:::  

## Additional Features (Optional)  

### Enable completion Mode  

::: tip  
By default, `./llama-cli` uses chat mode. Add `-no-cnv` to switch to **completion mode**, where the model extends the given prompt.  
:::  

```bash copy  
./llama-cli -m models/rwkv-6-world-7b-Q8_0.gguf -p "User: What's Spring Festival.\n\nAssistant:" -no-cnv -t 8 -ngl 99 -n 500  
```  

![RWKV completion inference](./imgs/llama.cpp-RWKV-inference-single-prompt.png)  

- `-p "User: What's mbti?tell me in chinese.\n\nAssistant:"`: Prompt for completion. For more prompt formats, see [RWKV Prompt Guide](https://rwkv.cn/RWKV-Prompts/Chat-Prompts).  
- `-no-cnv`: Disables chat mode for completion.  

### Launch Web Service (Recommended)  

Start a web server with:  

```bash copy  
./llama-server -m models/rwkv-6-world-7b-Q8_0.gguf -ngl 99  
```  

Access the Web UI at `http://127.0.0.1:8080`:  

![WebUI](./imgs/llama.cpp-chatui-new-version.png)  

### Quantize GGUF Models  

Use `./llama-quantize` to quantize `fp16` or `fp32` GGUF models. Example:  

```bash copy  
./llama-quantize models/rwkv-6-world-1.6b-F16.gguf models/rwkv-6-world-1b6-Q8_0.gguf Q8_0  
```  

::: warning  
Input models must be `fp32` or `fp16`. Recommended quantizations: `Q5_1`, `Q8_0`.  
:::  

Run `./llama-quantize --help` to view all quantization options:  

![Quantization types](./imgs/llama.cpp-quantization-type.png)  

## Appendix Code  

### Convert `.pth` to HF Format  

Use this script to convert `.pth` models to HF format (generates `pytorch_model.bin`):  

```python copy  
# Convert the model for the pytoch_model.bin  
import torch  

SOURCE_MODEL = "./v6-FinchX-14B-pth/rwkv-14b-final.pth"  
TARGET_MODEL = "./v6-Finch-14B-HF/pytorch_model.bin"  

# Delete target model if exists  
import os  
if os.path.exists(TARGET_MODEL):  
    os.remove(TARGET_MODEL)  

model = torch.load(SOURCE_MODEL, mmap=True, map_location='cpu')  

# Rename keys to match HF format  
new_model = {}  
for key in model.keys():  
    if key.startswith("blocks."):  
        new_key = "rwkv." + key  
        new_key = new_key.replace(".att.", ".attention.")  
        new_key = new_key.replace(".ffn.", ".feed_forward.")  
        new_key = new_key.replace("0.ln0.", "0.pre_ln.")  
    else:  
        new_key = key  
        if key == "emb.weight":  
            new_key = "rwkv.embeddings.weight"  
        if key.startswith("ln_out."):  
            new_key = "rwkv." + key  

    print(f"Renaming key: {key} -> {new_key}")  
    new_model[new_key] = model[key]  

# Save the converted model  
print(f"Saving to: {TARGET_MODEL}")  
torch.save(new_model, TARGET_MODEL)  
```
