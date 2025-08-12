# RWKV-Performance-Data

## NVIDIA

::: info
The data on this page is from: [RWKV-Inference-Performance-Test](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test). We welcome everyone to follow the repository's guidelines to run tests and submit performance data for NVIDIA hardware.
:::

### NVIDIA RTX 4090

Performance of RWKV models on NVIDIA RTX 4090:

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage |
| :---: |:---:|:---:|:---:| :----------:|
| [RWKV pip](https://pypi.org/project/rwkv/)  | RWKV7-G1 2.9B | fp16 | 56.18 | 5.52 GB |
| [llama.cpp(CUDA)](https://github.com/ggml-org/llama.cpp)  | RWKV7-G1 2.9B | fp16 | 89.16 | 5.75GB |
| [llama.cpp(CUDA)](https://github.com/ggml-org/llama.cpp)  | RWKV7-G1 2.9B | Q8_0 | 110.3 |3.47GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | fp16 |  95.98 | 5.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | int8  |  108.22 | 3.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | nf4 |  115.46  | 2.4GB |

Data Source: [issue #3](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/3)

::: info Test Environment:

- CPU: Intel(R) Xeon(R) Platinum 8331C
- OS: ubuntu 22.04 Linux-6.8.0-60-generic-x86_64-with-glibc2.35
- python_version: 3.10.16
- pytorch_version: 2.5.1+cu121

:::

### NVIDIA RTX 4060Ti 8GB

Performance of RWKV models on NVIDIA RTX 4060Ti 8GB:

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage | 
| :---: |:---:|:---:|:---:| :----------:|
| [RWKV pip](https://pypi.org/project/rwkv/)  | RWKV7-G1 2.9B | fp16 | 36.61 | 5.52 GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | fp16 |  43.92 | 5.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | int8  | 62.93  | 3.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | nf4 |  86.03  | 2.4GB |

Data Source: [issue #1](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/1)

::: info Test Environment:

- CPU: Intel i7-13700F
- OS version: Windows 10 Professional
- driver version: 576.02
- CUDA version: 12.9
:::

### NVIDIA RTX 4060 Laptop

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage |
| :---: |:---:|:---:|:---:| :----------:|
| [web-rwkv](https://github.com/cryscan/web-rwkv) | `RWKV7-G0 7.2B` | nf4 | 40.30 | 5.1GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | fp16 |  40.98 | 5.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | int8  | 60.21  | 3.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | nf4 |  77.26  | 2.4GB |

Data Source: [issue #15](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/15)

::: info Test Environment:

- CPU: AMD Ryzen 7 8845H (16) @ 5.61 GHz
- OS version: Arch Linux x86_64 @ Kernel: Linux 6.15.7-arch1-1
- driver version: 575.64.05
:::

## AMD

::: info
Inference performance of RWKV models on AMD hardware, including various professional GPUs, consumer GPUs, and even integrated graphics.

:::

### AMD RX 7900 XTX

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage | 
| :---: |:---:|:---:|:---:| :----------:|
| [llama.cpp(Vulkan)](https://github.com/ggml-org/llama.cpp) | RWKV7-G1 2.9B | fp16 | 41.55 | 5.75GB |
| [llama.cpp(Vulkan)](https://github.com/ggml-org/llama.cpp) | RWKV7-G1 2.9B | Q8_0 | 42.85 | 3.47GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | fp16 | 106.00 | 5.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | int8 | 137.36 | 3.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | nf4 | 151.64 | 2.4GB |

Data Source: [issue #5](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/5) | [issue #6](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/6)

::: info Test Environment:

- CPU: AMD Ryzen 9 5950X
- OS version: Ubuntu 25.04, 6.14.0-23-generic
- driver_info: "radv Mesa 25.0.3-1ubuntu2"
:::

### AMD Radeon PRO W7900

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage | 
| :---: |:---:|:---:|:---:| :----------:|
| [RWKV pip](https://pypi.org/project/rwkv/)  | RWKV7-G1 2.9B | fp16 | 45.28 | 5.52 GB |
| [llama.cpp(ROCm)](https://github.com/ggml-org/llama.cpp) | RWKV7-G1 2.9B | fp16 | 48.71 | 5.75GB  |
| [llama.cpp(ROCm)](https://github.com/ggml-org/llama.cpp) | RWKV7-G1 2.9B | Q8_0 | 58.59 | 3.47GB |
| [llama.cpp(Vulkan)](https://github.com/ggml-org/llama.cpp) | RWKV7-G1 2.9B | fp16 | 39.49 | 5.75GB |
| [llama.cpp(Vulkan)](https://github.com/ggml-org/llama.cpp) | RWKV7-G1 2.9B | Q8_0 | 45.21 | 3.47GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | fp16 | 61.62 | 5.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | int8 | 79.46 | 3.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | nf4 | 89.76 | 2.4GB |

Data Source: [issue #9](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/9) | [issue #13](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/13) | [issue #14](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/14)

::: info Test Environment:

- CPU: Intel I3 12100
- OS version: Ubuntu 24.04.2 LTS 6.11.0-26-generic
:::

### AMD Radeon Pro VII (Instinct MI50)

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage | 
| :---: |:---:|:---:|:---:| :----------:|
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | FP16 | 59.83 | 5.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | INT8 | 72.70 | 3.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | NF4 | 65.99 | 2.4GB |

Data Source: [issue #10](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/10)

::: info Test Environment:

- CPU: AMD Ryzen 9 5900X
- OS version: Windows11 24H2
- AMD Software: PRO Edition 25.5.1 Vulkan
:::

### AMD RYZEN AI MAX+ 395w [CPU]

| Inference Tool | Model | Precision | Tokens/s | RAM Usage | 
| :---: |:---:|:---:|:---:| :----------:|
| [llama.cpp(CPU)](https://github.com/ggml-org/llama.cpp)  | RWKV7-G1 2.9B | fp16 | 14.10  | to-be-tested |
| [llama.cpp(CPU)](https://github.com/ggml-org/llama.cpp)  | RWKV7-G1 2.9B | Q8_0 | 22.42 | to-be-tested |

Data Source: [issue #18](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/18)

::: info Test Environment:

- CPU: AMD RYZEN AI MAX+ 395w
- OS version: Ubuntu 24.04.2 LTS Linux-6.14.0-24-generic-x86_64-with-glibc2.39
- driver_info: "Mesa 24.2.8-1ubuntu1 24.04.1"
:::

### Radeon 8060S [Integrated]

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage |
| :---: |:---:|:---:|:---:| :----------:|
| [RWKV pip](https://pypi.org/project/rwkv/)  | `RWKV7-G0 7.2B` | fp16 |  9.49  | 13.47GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | `RWKV7-G0 7.2B` | fp16 | 10.16 | 13.25GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | `RWKV7-G0 7.2B` | int8 | 14.71 | 7.82GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | `RWKV7-G0 7.2B` | nf4 | 26.09 | 4.85GB |
| [RWKV pip](https://pypi.org/project/rwkv/)  | RWKV7-G1 2.9B | fp16 | 17.57 | 5.52 GB |
| [llama.cpp(ROCm)](https://github.com/ggml-org/llama.cpp)  | RWKV7-G1 2.9B | fp16 | 27.38 | 5.75GB |
| [llama.cpp(ROCm)](https://github.com/ggml-org/llama.cpp)  | RWKV7-G1 2.9B | Q8_0 | 43.10 | 3.47GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | fp16 |  31.29 | 5.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | int8  |51.56  | 3.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | nf4  | 77.71  | 2.4GB |

Data Source: [issue #16](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/16) | [issue #17](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/17) | [issue #18](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/18)

::: info Test Environment:

- CPU: AMD RYZEN AI MAX+ 395w
- OS version: Ubuntu 24.04.2 LTS Linux-6.14.0-24-generic-x86_64-with-glibc2.39
- driver_info: "Mesa 24.2.8-1ubuntu1~24.04.1"
:::

### AMD Radeon 780M [Integrated]

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage | 
| :---: |:---:|:---:|:---:| :----------:|
| [web-rwkv](https://github.com/cryscan/web-rwkv)  | `RWKV7-G0 7.2B` | fp16 | 5.80 | 13.26GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv)  | `RWKV7-G0 7.2B`   | int8 | 10.26 | 7.8GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv)  | `RWKV7-G0 7.2B` | nf4 | 15.76 | 4.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | fp16 |  13.61 | 5.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | int8  | 23.65  | 3.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | nf4 |  32.22  | 2.4GB |

::: info Test Environment:

- CPU: AMD Ryzen 7 8845H (16) @ 5.61 GHz
- OS version: Arch Linux x86_64 @ Kernel: Linux 6.15.7-arch1-1
- driver_info: "Mesa 25.1.6-arch1.1"
:::

Data Source: [issue #11](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/11) | [issue #12](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/12)  | [issue #15](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/15)

### AMD Radeon 610M [Integrated]

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage |
| :---: |:---:|:---:|:---:| :----------:|
| [llama.cpp(Vulkan)](https://github.com/ggml-org/llama.cpp)  | RWKV7-G1 2.9B | fp16 | 6.12 | 5.75GB |
| [llama.cpp(Vulkan)](https://github.com/ggml-org/llama.cpp)  | RWKV7-G1 2.9B | Q8_0 | 7.54 |3.47GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | fp16 |  8.49 | 5.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | int8  | 11.96  | 3.9GB |
| [web-rwkv](https://github.com/cryscan/web-rwkv) | RWKV7-G1 2.9B | nf4 |  8.03 | 2.4GB |

Data Source: [issue #19](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/19) | [issue #20](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/20)

::: info Test Environment:

- CPU: AMD Ryzen 9 9955HX 16-Core Processor
- OS version: Ubuntu 25.04 Kernel 6.14.0-15-generic
- driver_info: "Mesa 25.0.7-0ubuntu0.25.04.1"
:::

## Mobile Chips

::: info
Inference performance of RWKV models on mobile chips, including Qualcomm, MTK SoCs, and various embedded/edge computing devices.
:::

### Qualcomm Snapdragon 8 Gen 3

Performance on Snapdragon 8 Gen 3 (Xiaomi 14):

| Model        | Precision             | Tokens/s |
| ------------ | --------------------- | ------------------- |
| RWKV7-G1 2.9B | A16W4 | 31.3             |
| RWKV7-G1 2.9B | A16W8 | 18.7           |

### Qualcomm Snapdragon 8 Elite

Performance on Qualcomm Snapdragon 8 Elite (Xiaomi 15):

| Model        | Precision             | Tokens/s |
| ------------ | --------------------- | ------------------- |
| RWKV7-G1 2.9B | A16W4 | 30.26             |
| RWKV7-G1 2.9B | A16W8 | 19.34         |

::: info
**Explanation of parameters in the table:**

- Precision: Represents different quantization strategies or computational precisions.
- a16: Activations are quantized to 16-bit (int16).
- w8/w4: Weights are quantized to 8-bit/4-bit (per-channel linear quantization).
:::

### Rockchip RK3588

| Inference Tool | Model | Precision | Tokens/s | VRAM Usage | 
| :---: |:---:|:---:|:---:| :----------:|
| [llama.cpp(BLAS)](https://github.com/ggml-org/llama.cpp) | RWKV7-G1 2.9B | F16 | 3.62 | `~6.5GB System RAM`|
| [llama.cpp(BLAS)](https://github.com/ggml-org/llama.cpp) | RWKV7-G1 2.9B | Q8_0 | 5.67 | `~3.9GB System RAM` |
| [RKNN-LLM(NPU)](https://github.com/airockchip/rknn-llm) | RWKV7-G1 2.9B | FP16 | 4.04 | 5.49GB |
| [RKNN-LLM(NPU)](https://github.com/airockchip/rknn-llm) | RWKV7-G1 2.9B | W8A8 | 6.58 | 2.80GB |

Data Source: [issue #7](https://github.com/RWKV-Vibe/RWKV-Inference-Performance-Test/issues/7)

::: info Test Environment:

- CPU: Rockchip RK3588
- OS version: Armbian 25.5.2 noble on Radxa ROCK 5B
:::

## Moore-Threads Hardware

::: info
Inference performance of RWKV models on Moore-Threads hardware. Currently includes the MTT-S4000, and performance data for other Moore-Threads hardware will be added later.
:::

### Moore-Threads MTT-S4000

Performance of RWKV models on Moore-Threads MTT-S4000:

| Model | Precision | Tokens/s | VRAM Usage (GB) | 
|:---:|:---:|:---:| :----------:|
| RWKV-6-1B6-v2.1 | fp16 | 57.31 | 3.42 |
| RWKV-6-1B6-v2.1 | fp32 | 30.45 | 6.30 |
| RWKV-6-3B-v2.1 | fp16 | 36.09 | 6.27 |
| RWKV-6-3B-v2.1 | fp32 | 30.03 | 11.99 |
| RWKV-6-7B-v2.1 | fp16 | 30.39 | 14.43 |
| RWKV-6-7B-v2.1 | fp32 | 16.62 | 28.71 |
| RWKV-6-14B-v2.1 | fp16 | 16.19 | 26.57 |

Explanation of parameters in the table:

- Model: Represents RWKV-6 models with different parameter counts.
- Precision: Represents different quantization strategies or computational precisions.

::: info
The performance data is based on the project: [https://github.com/yuunnn-w/RWKV_Pytorch](https://github.com/yuunnn-w/RWKV_Pytorch)
:::