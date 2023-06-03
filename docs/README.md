![RWKV raven avartar](./img/rwkv-avartar-256p.png)

# RWKV Language Model

RWKV (pronounced as RwaKuv) is an RNN with GPT-level LLM performance, which can also be directly trained like a GPT transformer (parallelizable).

So it's combining the best of RNN and transformer - great performance, fast inference, fast training, saves VRAM, "infinite" ctxlen, and free sentence embedding. Moreover it's 100% attention-free.

- [arXiv paper](https://arxiv.org/abs/2305.13048)
- [Discord Forum](https://discord.gg/bDSBUMeFpc)
- [14B demo](https://huggingface.co/spaces/BlinkDL/ChatRWKV-gradio)
- [7B demo](https://huggingface.co/spaces/BlinkDL/Raven-RWKV-7B)

# TLDR vs Existing transformer models

**Good**
+ Lower resource usage (VRAM, CPU, GPU, etc) when running and training
+ Scales to any context length linearly (transformers scales quadratically)
+ Perform just as well, in terms of answer quality and capability
+ RWKV models are generally better trained in other languages (e.g. Chinese, Japanese, etc), then most existing OSS models

**Bad**
+ Is sensitive to prompt fomatting, you may need to change how you prompt the model
+ Is weak at task that require lookback, so reorder your prompt accordingly
    + (e.g. Instead of saying "For the document above do X", which will require a lookback. Say "For the document below do X" instead)

# Quick RWKV community terminology

- **RWKV** - The model architecture itself, code found at [https://github.com/BlinkDL/RWKV-LM](https://github.com/BlinkDL/RWKV-LM)
- **Base model / Pile Plus Model** - RWKV Base model is currently trained on "The Pile" with additional mix of other datasets. This model is not instruction trained.
- **Raven** - Official finetuned version of the base model, with instruction training
- **RWKV World** - New base model that is being trained on a larger more diverse mix of dataset, which include samples from over a 100 languages. This model is not instruction trained.
- **Raven World** - Upcoming finetuned version of the RWKV World model, with instruction training
