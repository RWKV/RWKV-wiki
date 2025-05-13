# Various RWKV related links

The following are links to various RWKV community projects (usually hosted on GitHub) for specific use cases or references.

::: warning
Marked as **(May be Outdated)** indicates that the project has been **archived** or has not been updated for a long time. However, even if some projects are outdated, their implementation ideas can still be used as a reference for development.

In addition, we would like to thank the developers who have contributed to the RWKV ecosystem, whether they are still active in the RWKV community or not.
:::

## Official RWKV Links

- Torch implementation of various RWKV modules: [https://github.com/RWKV/RWKV-block](https://github.com/RWKV/RWKV-block)
- Official RWKV repository: [https://github.com/BlinkDL/RWKV-LM](https://github.com/BlinkDL/RWKV-LM)
- [RWKV pip package](https://pypi.org/project/rwkv/): The pip package of RWKV. For specific usage, you can refer to the [RWKV pip Usage Guide](https://rwkv.cn/RWKV-Developer/RWKVpip)
- [RWKV-CUDA](https://github.com/BlinkDL/RWKV-CUDA): The official CUDA operator of RWKV
- [Hugging face documentation](https://huggingface.co/docs/transformers/model_doc/rwkv): The introduction of RWKV on Hugging Face
- RWKV-4 architecture paper: [arXiv (2305.13048)](https://arxiv.org/abs/2305.13048)
- RWKV 5 /6 architecture paper: [arXiv (2404.05892)](https://arxiv.org/abs/2404.05892)
- RWKV-7 architecture paper: [arXiv (2503.14456)](https://arxiv.org/abs/2503.14456)

## RWKV Fine-tuning/Training Tools

### Fine-tuning Projects

- **(Recommended)** [RWKV-PEFT](https://github.com/JL-er/RWKV-PEFT): An efficient fine-tuning repository for RWKV, which includes various fine-tuning methods such as LoRA, Pissa, Lisa, State, etc.
- [RWKV-PEFT-Simple](https://github.com/Seikaijyu/RWKV-PEFT-Simple): A simplified version of RWKV-PEFT, providing convenient scripts and fine-tuning instructions
- **(Under Development)** [RWKV-LM-RLHF](https://github.com/OpenMOSE/RWKV-LM-RLHF): An RWKV reinforcement learning (RLHF) toolkit, including SFT, alignment (DPO, ORPO), etc.
- [RWKV-LM-RLHF-DPO](https://github.com/Triang-jyed-driung/RWKV-LM-RLHF-DPO): The DPO implementation (Direct Preference Optimization) of RWKV
- **(May be Outdated)** [RWKV-LoRA](https://github.com/Blealtan/RWKV-LM-LoRA): The LoRA fine-tuning implementation of RWKV, which does not support fine-tuning RWKV-6 or later versions.

### Training Projects

- [RWKV-infctx-trainer](https://github.com/RWKV/RWKV-infctx-trainer/): An RWKV infinite context trainer that supports training contexts of 10k length and above
- [RWKV-Ouroboros](https://github.com/neromous/RWKV-Ouroboros): An rwkv-trainer project based on the API, which supports alternating training and inference
- [nanoRWKV](https://github.com/Hannibal046/nanoRWKV): The nanoGPT-style implementation of the RWKV model
- [RWKV_LM_EXT](https://github.com/yynil/RWKV_LM_EXT): Realizes the functional extension of RWKV, including sequence classification/embedding/peft/cross-encoder/dual-encoder/multimodal, etc.
- [chunkRWKV6](https://github.com/00ffcc/chunkRWKV6): Optimizes the prefill and training speed of RWKV using block parallelism

## RWKV Inference Frameworks

### rwkv.cpp
- [rwkv.cpp](https://github.com/RWKV/rwkv.cpp): Inferences the RWKV model on the CPU, supporting FP16, quantized INT4, INT5, and INT8 inferences

### Pytorch Native Implementation

- [RWKV_Explained](https://github.com/SmerkyG/RWKV_Explained): The Pytorch implementation and code explanation of RWKV
- [RWKV_Pytorch](https://github.com/yuunnn-w/RWKV_Pytorch): The inference framework of the RWKV model implemented purely with native Pytorch
- [rwkv-kit](https://github.com/TorchRWKV/rwkv-kit): The inference framework of the RWKV model, supporting various functions such as batch inference and parallel inference training

### WebGPU Implementation

- [web-rwkv](https://github.com/cryscan/web-rwkv): Implements the inference of the RWKV model in pure WebGPU/Rust

### candle Implementation

- [candle-rwkv](https://github.com/nkypy/candle-rwkv): Implements the inference of the RWKV model (supporting quantization) in the minimalist machine learning framework candle of Rust

### Keras Implementation

- [RWKV6-Keras](https://github.com/pass-lin/RWKV6-Keras): The Keras implementation of the RWKV model, supporting both training and inference

### JAX Implementation

- [rwkv-jax](https://github.com/saran-gangster/rwkv-jax): The JAX implementation of the RWKV language model, suitable for TPU training
- **(May be Outdated)** [RWKV-LM-jax](https://github.com/mrsteyk/RWKV-LM-jax)
- **(May be Outdated)** [tpu_rwkv](https://github.com/tensorpro/tpu_rwkv)

### Mobile Inference

- **(Under Development)** [rwkv-mobile](https://github.com/MollySophia/rwkv-mobile): The RWKV mobile inference engine
- [rwkv-qualcomm](https://github.com/MollySophia/rwkv-qualcomm): Infers the RWKV model using the Qualcomm AI Engine Direct SDK

### Other Inference Engines Supporting RWKV

- [rwkv-by-hand-excel](https://github.com/playaswd/rwkv-by-hand-excel):rwkv by Hand ✍️ Exercises in Excel
- [RWKV-Infer](https://github.com/OpenMOSE/RWKV-Infer): Performs RWKV-V6 inference using FLA, supporting inference by combining multiple states
- [MLC LLM](https://github.com/mlc-ai/mlc-llm): A machine learning compiler and high-performance deployment engine, supporting the RWKV model

## RAG (Retrieval-Augmented Generation) System

- [RWKV-RAG](https://github.com/AIIRWKV/RWKV-RAG): A one-click RAG deployment system based on the RWKV model, which can easily build and manage a local knowledge base, and also provides a question-answering robot based on the local knowledge base and the one-click fine-tuning function of RWKV

## Chatbots/Inference API Servers

- **(Chinese, Recommended)** [RWKV runner](https://github.com/josStorer/RWKV-Runner): RWKV Runner is a management and startup tool for the RWKV model, with a user-friendly GUI interface, supporting both training and inference
- **(Chinese, Recommended)** [AI00 RWKV server](https://github.com/cgisky1980/ai00_rwkv_server): The Ai00 Server is an **inference API server** for the RWKV model based on the web-rwkv inference engine
- **(Chinese)** [Wenda web UI](https://github.com/wenda-LLM/wenda): An LLM calling platform for content generation in specific environments, supporting the RWKV model
- **(Chinese)** [role play chatbot](https://github.com/shengxia/RWKV_Role_Playing): A role-playing webui based on RWKV, made using Gradio
- [Easy_RWKV_webui](https://github.com/No-22-Github/Easy_RWKV_webui): An online chat room for the RWKV model based on PyWebIO
- [Mini Model Daemon](https://github.com/recursal/minmodmon): An inference tool for the RWKV model based on the web-rwkv inference backend
- [LocalAI](https://github.com/go-skynet/LocalAI): An open-source alternative to OpenAI, supporting RWKV
- [GPT Academic](https://github.com/binary-husky/gpt_academic): Provides practical interactive interfaces for large language models such as GPT/GLM, supporting RWKV
- [LLMFarm](https://github.com/guinmoon/LLMFarm): Uses the GGML library to use large language models offline on iOS and MacOS, supporting RWKV

## RWKV Benchmark Tests

- [Uncheatable Eval](https://github.com/Jellyfish042/uncheatable_eval): Tests the performance of LLM using the latest dynamic data, including RWKV
- [RULER_RWKV](https://github.com/Ojiyumm/RULER_RWKV): The [RULER](https://arxiv.org/abs/2404.06654) test scores of the RWKV model
- [LongBench_RWKV](https://github.com/Ojiyumm/LongBench_RWKV): The [LongBench](https://arxiv.org/abs/2308.14508) test scores of RWKV
- [rwkv_mmlu](https://github.com/Jellyfish042/rwkv_mmlu): The MMLU test scores of the RWKV model

## RWKV Multimodal

::: tip
Multimodal refers to tasks other than text tasks.
:::

### Any Modality

- **(Under Development)** [WorldRWKV](https://github.com/JL-er/WorldRWKV): Uses the pure RWKV7 architecture to implement the training and inference of any modality

### Image/Graphic-related

- [RwkvCompress](https://github.com/sjtu-medialab/RwkvCompress): An image compression model based on RWKV, which can efficiently compress and reconstruct images
- [VisualRWKV](https://github.com/howard-hou/VisualRWKV): A visual language model based on RWKV, which can handle visual tasks
- [Vision-RWKV](https://github.com/OpenGVLab/Vision-RWKV): A visual perception model based on RWKV, which can smoothly process high-resolution images
- [Diffusion-RWKV](https://github.com/feizc/Diffusion-RWKV): A model for image generation tasks based on RWKV, which is good at handling high-resolution images
- [RWKV-CLIP](https://github.com/deepglint/RWKV-CLIP): The CLIP (visual-language representation learning) model driven by RWKV
- [RWKV-SAM](https://github.com/HarborYuan/ovsam): The image segmentation method "RWKV-SAM" based on RWKV
- [PointRWKV](https://github.com/hithqd/PointRWKV): A 3D point cloud learning framework based on RWKV
- [Restore-RWKV](https://github.com/Yaziwel/Restore-RWKV): Uses RWKV for efficient and effective medical image restoration (PyTorch implementation)
- [LION](https://github.com/happinesslz/LION): A Linear Group RNN for 3D object detection in point clouds (supporting RWKV)
- [LineRWKV](https://github.com/diegovalsesia/linerwkv): LineRWKV is a method for lossless and lossy compression of hyperspectral images

### Audio-related

- [RWKV-ASR](https://github.com/AGENDD/RWKV-ASR): Uses the pre-trained RWKV language model for **speech recognition**

### Time Series

- [BlackGoose Rimer](https://github.com/Alic-Li/BlackGoose_Rimer): A pure RWKV time series task model that surpasses the Transformer in both speed and performance
- [RWKV-TS](https://github.com/howard-hou/RWKV-TS): A time series task model based on RWKV, with low latency and memory usage

### Robotics/Embodied Intelligence

- [DecisionRWKV](https://github.com/ancorasir/DecisionRWKV): Experience replay (experience replay) + Decision-RWKV model, a lifelong learning algorithm suitable for robots.
- [OccRWKV](https://github.com/jmwang0117/OccRWKV): An efficient 3D semantic occupancy prediction with linear complexity

## RWKV Tokenizers

- [rwkv-tokenizer](https://github.com/cahya-wirawan/rwkv-tokenizer): A fast RWKV Tokenizer written in Rust, supporting the RWKV-V5/6 World model
- [rwkv_tokenizer.c](https://github.com/mrsteyk/rwkv_tokenizer.c): The RWKV Trie tokenizer written in C language
- [rwkv-tokenizer-go](https://github.com/Ronsor/rwkv-tokenizer-go): The RWKV tokenizer in Go language
- [RWKV-World-Tokenizer-CPP](https://github.com/m8than/RWKV-World-Tokenizer-CPP): A highly optimized trie tokenizer for the RWKV World model written in C++

## Prompt Collections

- [Awesome-RWKV-Prompts](https://github.com/shoumenchougou/Awesome-RWKV-Prompts): User-friendly and ready-to-use RWKV Prompts examples, suitable for all users.
- **(May be Outdated)** [RWKV_chains](https://github.com/jiamingkong/RWKV_chains): Prompts that enable the RWKV model to work with Langchain

## Other RWKV Projects

- [SpikeGPT](https://github.com/ridgerchu/SpikeGPT): A new model inspired by RWKV
- [JSONL to binidx](https://github.com/Abel2076/json2binidx_tool): This tool is used to convert `.jsonl` files into `.bin /.idx` (binidx) data suitable for RWKV training.
- [AI Town - RWKV Proxy](https://github.com/recursal/ai-town-rwkv-proxy?tab=readme-ov-file): Operate a large AI town locally through RWKV!
- [Bot-Ani-RWKV-twitter-bot-detection](https://github.com/Max-SF1/Bot-Ani-RWKV-twitter-bot-detection): A Twitter bot detection tool based on RWKV 