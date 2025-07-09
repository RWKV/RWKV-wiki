![RWKV raven avartar](./img/rwkv-avartar-256p.png)

# RWKV Language Model

RWKV (pronounced RWaKuV) is an RNN with GPT-level large language model (LLM) performance that can be trained directly like a GPT Transformer (parallelizable).

RWKV combines the best features of RNN and Transformer: excellent performance, constant memory usage, constant inference generation speed, "infinite" context length, and free sentence embeddings. It is also 100% free of self-attention mechanisms.

The RWKV project was initially proposed by Bo Peng (Blink_DL), and as the project gained attention, it gradually developed into an open-source community.

On September 20, 2023, the RWKV open-source project officially joined the Linux Foundation. Today, the RWKV project is an open-source non-profit organization under the Linux Foundation, with some computing power previously supported by sponsors.

- [Discord Forum](https://discord.gg/bDSBUMeFpc)
- [HF Gradio-1 | RWKV7-G1 2.9B](https://huggingface.co/spaces/BlinkDL/RWKV-Gradio-1)
- [HF Gradio-2 | RWKV7-G1](https://huggingface.co/spaces/BlinkDL/RWKV-Gradio-2)

# RWKV Architecture and Papers

RWKV-7 (Goose) is the latest version of the RWKV architecture. The paper was co-authored by Bo Peng and the RWKV community, published on March 18, 2025. 
- **RWKV-7 Paper**: "RWKV-7 Goose with Expressive Dynamic State Evolution"
- **Paper Link**: [arXiv:2503.14456](https://arxiv.org/abs/2503.14456)

RWKV-7 adopts Dynamic State Evolution, surpassing the fundamental limitations of the TC0 expressive power of the attention/linear attention paradigm.

::: details **Click to view RWKV-7 Architecture Diagram**
![RWKV-7-architecture](./basic/images/rwkv-7-architecture.png)
:::

RWKV 5/6 (Eagle/Finch) architectures have several improvements based on the RWKV-4 architecture. Therefore, these two architectures are published in the same paper.

- **RWKV 5/6 Paper**: "Eagle and Finch: RWKV with Matrix-Valued States and Dynamic Recurrence"
- **Paper Link**: [arXiv:2404.05892](https://arxiv.org/abs/2404.05892)

RWKV-4 is the first official version of the RWKV model. The paper was co-authored by Bo Peng and the RWKV community and was first published on May 22, 2023. In October of the same year, the RWKV-4 architecture paper was accepted by [EMNLP 2023](https://2023.emnlp.org/program/accepted_findings/).

- **RWKV-4 Paper**: "RWKV: Reinventing RNNs for the Transformer Era"
- **Paper Link**: [arXiv:2305.13048](https://arxiv.org/abs/2305.13048)


# RWKV Model Version Status

RWKV has released open-source models of various parameter scales for each architecture version.

| Version | RWKV-V4 | RWKV-v5-Eagle | RWKV-v6-Finch | RWKV-v7-Goose | RWKV-v7-G1 |
| --- | --- | --- | --- | --- | --- | 
| Paper | [Published](https://arxiv.org/abs/2305.13048) | [Published](https://arxiv.org/abs/2404.05892) | [Published](https://arxiv.org/abs/2404.05892) | [Published](https://arxiv.org/abs/2503.14456) | [Published](https://arxiv.org/abs/2503.14456) |
| Overall Status | **EOL** | **EOL**| **Stable** | **Stable** | **In Progress**| 
| 0.4B Model |  Released |  Released |  No Plan | [Released](https://huggingface.co/BlinkDL/rwkv-7-world/tree/main) | [Released](https://huggingface.co/BlinkDL/rwkv7-g1/blob/main/rwkv7-g1-0.4b-20250324-ctx4096.pth) | 
| 1.5B Model |  Released |  Released|  [Released](https://huggingface.co/BlinkDL/rwkv-6-world/blob/main/RWKV-x060-World-1B6-v2.1-20240328-ctx4096.pth) | [Released](https://huggingface.co/BlinkDL/rwkv-7-world/tree/main) | [Released](https://huggingface.co/BlinkDL/rwkv7-g1/blob/main/rwkv7-g1-1.5b-20250429-ctx4096.pth) |
| 3B Model |  Released |  Released |  [Released](https://huggingface.co/BlinkDL/rwkv-6-world/blob/main/RWKV-x060-World-1B6-v2.1-20240328-ctx4096.pth) | [Released](https://huggingface.co/BlinkDL/rwkv-7-world/tree/main) | [Released](https://huggingface.co/BlinkDL/rwkv7-g1/blob/main/rwkv7-g1-2.9b-20250519-ctx4096.pth)|
| 7B Model | Released |  Released|  [Released](https://huggingface.co/BlinkDL/rwkv-6-world/blob/main/RWKV-x060-World-7B-v2.1-20240507-ctx4096.pth) | No Plan  | ⚙️ **In Training**  |
| 14B Model |  Released |  No Plan |  [Released](https://huggingface.co/BlinkDL/rwkv-6-world/blob/main/RWKV-x060-World-14B-v2.1-20240719-ctx4096.pth) | No Plan  | **📅 Planned** |

# Which RWKV Models Should I Use?

Here's the English translation:

::: tip
Due to performance issues caused by outdated architectures, all RWKV-5, RWKV-4 series models (Raven / World / Pile ...) and earlier RWKV versions have reached end-of-life, with existing models serving only as archives.
:::

- **Models with 7B parameters and below**: Please use the [RWKV7-G1 2.9B model](https://modelscope.cn/models/RWKV/rwkv7-g1/files). Thanks to the latest architectural design and the newest World v3.5 dataset (totaling 5.16T tokens), the RWKV7-G1 model has strong **reasoning, coding, and mathematical capabilities**, performing better than previous models across all tasks.

- **Models with more than 7B parameters**: Since RWKV7-G1 7B and larger models are currently in training, we recommend using the [RWKV-6-World-14B-V2.1](https://hf-mirror.com/BlinkDL/rwkv-6-world/blob/main/RWKV-x060-World-14B-v2.1-20240719-ctx4096.pth) model.

::: tip
After the RWKV7-G1 7B/14B models complete training, they will completely replace the existing RWKV-6-World 7B/14B models.
:::

# Differences Between RWKV and Transformer

- Advantages
  - Lower resource usage during runtime and training (VRAM, CPU, GPU, etc.).
  - **10 to 100 times lower computational requirements compared to Transformers with larger contexts**.
  - Supports linear scaling to any context length (Transformers scale quadratically).
  - Performs as well as Transformer architectures in terms of answer quality and generalization ability.
  - RWKV models' training data includes languages other than English (e.g., Chinese, Japanese, etc.), offering better multilingual capabilities than most existing open-source models.

- Disadvantages
  - RWKV base models are very sensitive to the format of prompts, and the format of prompts significantly affects the generation results.
  - Due to architectural design, RWKV models are weaker on **tasks requiring lookback/review**, and we are working on various optimizations to address this issue.

# Basic Terminology of the RWKV Community

| Concept | Description |
| --- | --- |
| **RWKV** | The model architecture itself, training code available [here](https://github.com/BlinkDL/RWKV-LM) |
| **state** | RWKV is a variant of RNN architecture, state is the hidden state that RWKV passes across time steps during inference, used to retain historical context information |
| **ChatRWKV** | Official chatbot for RWKV (similar to ChatGPT, but based on RWKV), code available [here](https://github.com/BlinkDL/ChatRWKV) |
| **RWKV-4/5/6/7** | Different architectural versions of RWKV. Note that the latest RWKV-7 series models are recommended |
| **RWKV World** | Base RWKV models trained on data from over 100 languages worldwide. These models cover a broader and more diverse dataset, including training data from over 100 languages, as well as some instruction tuning |
| **Raven** | Official fine-tuned version of the RWKV-4 base model, including instruction training. However, since the RWKV-4 series has been discontinued, continued use is not recommended |
| **RWKV ABC/MIDI** | RWKV music models based on ABC/MIDI format |
| **RWKV CHNtuned / one-state-chat / role_play / novel ...** | Fine-tuned models provided by the RWKV community, optimized for specific tasks or data types. Please prioritize using fine-tuned models from the RWKV-7 series |
| **RWKV7-G1 (Goose One)** | Base model trained on RWKV-7 architecture and World v3.5 dataset, supports **reasoning/thinking** (Think), with stronger performance |

# RWKV Model Naming Rules

RWKV models typically have two naming conventions:

- RWKV-6-World-3B-v2.1-20240208-ctx4096.pth
- RWKV-x070-World-1.5B-v3-20250127-ctx4096.pth

The meaning of each field in the model name:

| Field | Meaning |
| --- | --- |
| **RWKV** | Model name |
| **6 / 070** | RWKV model architecture, recommended to use RWKV-7 models |
| **World** | Model type, World indicates RWKV models trained with global languages, thus supporting multilingual tasks |
| **3B / 1.5B** | Model parameter scale, "B" stands for "Billions" |
| **v2.1 / v3** | Model training dataset version, v2.1 ≈ 1.1T , v3 ≈ 2.5T  |
| **20240208 / 20250127** | Model release date |
| **ctx4096** | Pre-trained context length |
| **.pth** | RWKV model file format, also supports `.gguf` and `.safetensors` etc. |

# Who sponsors the compute for RWKV?

RWKV is made possible, as an Open Source project, thanks to the large amount of GPU compute and researchers time contributions from

<div class="sponsor_logos">
    <a href="https://www.rwkv.com/" target="_blank"><img src="https://wiki.rwkv.com/img/RWKV.png" width="100px"/></a>
    <a href="https://www.yuanhuai.com" target="_blank"><img src="https://wiki.rwkv.com/img/SYIT.jpg" width="100px"/></a>
    <a href="https://www.stability.ai/" target="_blank"><img src="https://wiki.rwkv.com/img/Stability-AI.jpg" width="100px"/></a>
    <a href="https://www.eleuther.ai/" target="_blank"><img src="https://wiki.rwkv.com/img/EleutherAI_logo.svg.png" width="100px"/></a>
</div>

Without their invaluable support, we would not have been able to develop the core RWKV foundation models that you see today.

---

In addition, we would like to thank
- [alpin @ pygmalionAI](https://pygmalion.chat/)
- [AutoMeta @ AlignmentLab](https://twitter.com/alignment_lab)
- [FeatherlessAI](https://featherless.ai)
- Various other folks who donated slices of GPU time / preferred not to be named

For helping with GPU time, on smaller experiments, finetunes, and various models. Especially for those models that never get publically released in failed runs.