# llama.cpp Inference
 
::: tip  
[llama.cpp](https://github.com/ggerganov/llama.cpp) is a lightweight framework for running large language models, specifically optimized for CPU performance.  
:::  

Thanks to the efforts of RWKV community member [@MollySophia](https://github.com/MollySophia), llama.cpp now supports RWKV-6/7 models.  

This guide explains how to perform inference with RWKV models using llama.cpp.  

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

llama.cpp uses `.gguf` format models. Use one of the methods below to obtain a `.gguf` RWKV model.  

::: tabs  
@tab Download GGUF Models (Recommended)  
Download pre-quantized GGUF models from the [RWKV GGUF repository](https://huggingface.co/zhiyuan8).  

Create a `models` folder in your llama.cpp directory and place the downloaded GGUF model there.  

::: warning  
RWKV GGUF models come in various quantization levels. Higher precision (e.g., `FP16`) yields better responses but requires more resources.  

Recommended priority: `FP16` > `Q8_0` > `Q5_K_M` > `Q4_K_M`. Lower quantizations (e.g., `Q3_0`, `Q2_0`) may severely degrade performance.  

@tab Convert from HF to GGUF  

1. Download an RWKV Hugging Face model from the [RWKV HF Hub](https://huggingface.co/RWKV), such as `RWKV/RWKV7-Goose-World3-2.9B-HF`.  
2. Use the following command to download the source code of `llama.cpp`:

```bash copy
git clone https://github.com/ggml-org/llama.cpp.git
```

3. Run the following command in the llama.cpp directory to convert the HF model to GGUF:  

```bash copy  
python llama.cpp/convert_hf_to_gguf.py ./RWKV7-Goose-World3-2.9B-HF 
```  

::: warning  
Replace `./RWKV7-Goose-World3-2.9B-HF` with your actual RWKV HF model directory.
:::  

### Run RWKV Model for Chat  

Execute the following command in the llama.cpp directory to start a **chat session**:  

```bash copy  
./llama-cli -m models/rwkv-7-world-2.9b-Q8_0.gguf -p "You are a helpful assistant" -cnv -t 8 -ngl 99 -n 500  
```  

This command runs the `models/rwkv-7-world-2.9b-Q8_0.gguf` model with 8 threads, initial prompt `You are a helpful assistant`, and generates up to 500 tokens per response.  

![llama.cpp-RWKV-inference-cnv-mode](./imgs/llama.cpp-RWKV-inference-cnv-mode.png)  

**Parameter Explanation:**  

- `./llama-cli`: Launches the compiled `llama-cli` executable.  
- `-m models/rwkv-7-world-2.9b-Q8_0.gguf`: Path to the model.  
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
./llama-cli -m models/rwkv-7-world-2.9b-Q8_0.gguf -p "User: What's Spring Festival.\n\nAssistant:" -no-cnv -t 8 -ngl 99 -n 500  
```  

![RWKV completion inference](./imgs/llama.cpp-RWKV-inference-single-prompt.png)  

- `-p "User: What's Spring Festival.\n\nAssistant:"`: The "prompt" parameter enables the model to continue writing based on this prompt word.
- `-no-cnv`: Disables chat mode for completion.  

### Launch Web Service (Recommended)  

Start a web server with:  

```bash copy  
./llama-server -m models/rwkv-7-world-2.9b-Q8_0.gguf -ngl 99  
```  

Access the Web UI at `http://127.0.0.1:8080`:  

![WebUI](./imgs/llama.cpp-chatui-new-version.png)  

### Quantize GGUF Models  

Use `./llama-quantize` to quantize `fp16` or `fp32` GGUF models. Example:  

```bash copy  
./llama-quantize models/rwkv-7-world-2.9b-F16.gguf models/rwkv-7-world-2.9b-Q8_0.gguf Q8_0  
```  

::: warning  
Input models must be `fp32` or `fp16`. Recommended quantizations: `Q5_1`, `Q8_0`.  
:::  

Run `./llama-quantize --help` to view all quantization options:  

![Quantization types](./imgs/llama.cpp-quantization-type.png)  

