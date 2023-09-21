![RWKV raven avartar](./img/rwkv-avartar-256p.png)

# RWKV Language Model

RWKV (pronounced as RwaKuv) is an RNN with GPT-level LLM performance, which can also be directly trained like a GPT transformer (parallelizable).

So it's combining the best of RNN and transformer - great performance, fast inference, fast training, saves VRAM, "infinite" ctxlen, and free sentence embedding. Moreover it's 100% attention-free.

- [Discord Forum](https://discord.gg/bDSBUMeFpc)
- [7B world demo](https://huggingface.co/spaces/BlinkDL/Raven-RWKV-7B)
- [14B raven demo](https://huggingface.co/spaces/BlinkDL/ChatRWKV-gradio)

# RWKV architecture paper

[![RWKV paper cover](./img/RWKV-paper.png)](https://arxiv.org/abs/2305.13048)
- [arXiv (2305.13048) paper](https://arxiv.org/abs/2305.13048)

# TLDR vs Existing transformer models

**Good**
+ Lower resource usage (VRAM, CPU, GPU, etc) when running and training. 
+ **10x to a 100x lower compute requirements** compared to transformers with large context sizes.
+ Scales to any context length linearly (transformers scales quadratically)
+ Perform just as well, in terms of answer quality and capability
+ RWKV models are generally better trained in other languages (e.g. Chinese, Japanese, etc), then most existing OSS models

**Bad**
+ Is sensitive to prompt fomatting, you may need to change how you prompt the model
+ Is weaker at task that require lookback, so reorder your prompt accordingly
    + (e.g. Instead of saying "For the document above do X", which will require a lookback. Say "For the document below do X" instead)

# Quick RWKV community terminology

- **RWKV** - The model architecture itself, code found at [https://github.com/BlinkDL/RWKV-LM](https://github.com/BlinkDL/RWKV-LM)
- **RWKV World** - New base model that is being trained on a larger more diverse mix of dataset, which include samples from over a 100 languages. Partially instruction trained.
- **Raven** - Official finetuned version of the base model, with instruction training
- **Base model / Pile Plus Model** - RWKV Base model is currently trained on "The Pile" with additional mix of other datasets. This model is not instruction trained.

# Which RWKV models should I be using?

- For the majority of use cases, you should be using the pretrained, finetuned 7B world model
    - [Model file link here](https://huggingface.co/BlinkDL/rwkv-4-world/blob/main/RWKV-4-World-7B-v1-20230626-ctx4096.pth) [HF Repo link here](https://huggingface.co/BlinkDL/rwkv-4-world)
- On a case by case basis, you may find the older (smaller dataset), but larger raven model, to be bettter in certain specific benchmarks. When the 14B world model is ready, it is expected to replace the raven model in all use cases.
    - [HF Repo link here](https://huggingface.co/BlinkDL/rwkv-4-raven)
- If you want to finetune a model, for a very specific use case, without any existing instruction tuning, you may find the pile model more useful (rare, in most use cases its better to finetune the world or raven model)
    - [HF Repo link here](https://huggingface.co/BlinkDL/rwkv-4-pile-14b)
