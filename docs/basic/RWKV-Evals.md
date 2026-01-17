# RWKV-Evals

RWKV Evaluation Data presents RWKV's performance across various large language model benchmarks, including Uncheatable Eval, MMLU, RULER, and LongBench.

## Uncheatable Eval Test
::: tip
 [Uncheatable Eval](https://huggingface.co/spaces/Jellyfish042/UncheatableEval) is an "uncheatable evaluation" that uses real-time data, such as the latest academic papers and news articles, to assess the true modeling capabilities and generalization abilities of open-source large language models.

 The result of the Uncheatable Eval test is the compression ratio; therefore, a **lower** score indicates **better** model performance.
:::

Below is a comparison of Uncheatable Eval scores between RWKV and other models:

### 14B Parameter Models

| Name | Params (B) | Average (lower=better) | ao3 english | bbc news | wikipedia english | arxiv computer science | arxiv physics | github cpp | github python |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RWKV7-g0b-13.3b** | 13.269 | 6.843 | 9.848 | 8.202 | 7.636 | 7.108 | 7.380 | 4.026 | 3.892 |
| Qwen3-14B-Base | 14.768 | 6.845 | 10.569 | 8.445 | 7.942 | 7.001 | 7.210 | 3.439 | 3.312 |
| gemma-3-12b-pt | 12.187 | 6.945 | 10.540 | 7.914 | 7.607 | 7.286 | 7.387 | 3.883 | 3.997 |
| Qwen2.5-14B | 14.770 | 6.951 | 10.558 | 8.317 | 7.944 | 7.224 | 7.392 | 3.625 | 3.599 |
| Mistral-Nemo-Base-2407 | 12.248 | 6.970 | 10.165 | 8.118 | 7.642 | 7.287 | 7.455 | 4.079 | 4.042 |
| Motif-2-12.7B-Base | 12.704 | 7.099 | 10.628 | 8.328 | 7.897 | 7.134 | 7.404 | 4.189 | 4.114 |
| Llama-2-13b-hf | 13.016 | 7.540 | 10.655 | 8.307 | 7.901 | 7.993 | 8.122 | 4.795 | 5.009 |

### 7B Parameter Models

| Name | Params (B) | Average (lower=better) | ao3 english | bbc news | wikipedia english | arxiv computer science | arxiv physics | github cpp | github python |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Qwen3-8B-Base | 8.191 | 7.091 | 10.890 | 8.718 | 8.255 | 7.207 | 7.465 | 3.617 | 3.482 |
| Meta-Llama-3-8B | 8.030 | 7.162 | 10.619 | 8.295 | 7.785 | 7.536 | 7.541 | 4.174 | 4.181 |
| **RWKV7-g0a3-7.2b-20251029-ctx8192** | 7.199 | 7.222 | 10.164 | 8.480 | 7.996 | 7.440 | 7.747 | 4.378 | 4.347 |
| Qwen2.5-7B | 7.616 | 7.323 | 11.079 | 8.729 | 8.449 | 7.539 | 7.792 | 3.868 | 3.806 |
| Falcon-H1-7B-Base | 7.586 | 7.339 | 10.958 | 8.576 | 8.225 | 7.403 | 7.569 | 4.251 | 4.392 |
| Mistral-7B-v0.1 | 7.242 | 7.406 | 10.662 | 8.306 | 7.976 | 7.745 | 7.903 | 4.612 | 4.635 |
| Hunyuan-7B-Pretrain | 7.505 | 7.541 | 11.509 | 8.987 | 8.499 | 7.653 | 8.108 | 4.201 | 3.829 |
| falcon-mamba-7b | 7.273 | 7.548 | 10.760 | 8.958 | 8.589 | 7.674 | 7.737 | 4.437 | 4.680 |
| Zamba2-7B | 7.357 | 7.582 | 10.702 | 8.627 | 8.074 | 7.843 | 8.124 | 4.833 | 4.869 |
| Minitron-8B-Base | 8.272 | 7.582 | 10.835 | 8.654 | 8.284 | 7.856 | 8.230 | 4.508 | 4.708 |
| Olmo-3-1025-7B | 7.298 | 7.595 | 11.101 | 8.784 | 8.522 | 7.490 | 7.947 | 4.930 | 4.394 |
| RWKV-x060-World-7B-v3-20241112-ctx4096 | 7.636 | 7.633 | 10.629 | 8.753 | 8.288 | 7.936 | 8.109 | 4.786 | 4.929 |

### 3B Parameter Models

| Name | Params (B) | Average (lower=better) | ao3 english | bbc news | wikipedia english | arxiv computer science | arxiv physics | github cpp | github python |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RWKV7-g1a4-2.9b-20251118-ctx8192** | 2.948 | 7.486 | 10.481 | 8.800 | 8.310 | 7.712 | 8.072 | 4.553 | 4.474 |
| Llama-3.2-3B | 3.213 | 7.643 | 11.219 | 8.701 | 8.365 | 7.928 | 8.065 | 4.661 | 4.562 |
| Qwen2.5-3B | 3.086 | 7.722 | 11.575 | 9.139 | 8.895 | 7.911 | 8.220 | 4.203 | 4.113 |
| SmolLM3-3B-Base | 3.075 | 7.784 | 11.187 | 8.905 | 8.611 | 8.097 | 8.631 | 4.513 | 4.546 |
| RWKV-x070-World-2.9B-v3-20250211-ctx4096 | 2.948 | 7.800 | 10.812 | 8.909 | 8.501 | 8.049 | 8.307 | 4.955 | 5.066 |
| stablelm-3b-4e1t | 2.795 | 7.907 | 11.211 | 8.815 | 8.434 | 8.299 | 8.476 | 4.906 | 5.207 |
| Falcon-H1-3B-Base | 3.149 | 7.936 | 11.685 | 9.158 | 8.910 | 7.891 | 8.161 | 4.832 | 4.917 |
| recurrentgemma-2b | 2.683 | 8.052 | 11.632 | 8.951 | 8.835 | 8.401 | 8.488 | 4.897 | 5.157 |
| RWKV-x060-World-3B-v2.1-20240417-ctx4096 | 3.100 | 8.147 | 11.005 | 9.161 | 8.815 | 8.451 | 8.559 | 5.479 | 5.561 |
| mamba2attn-2.7b | 2.698 | 8.204 | 11.436 | 9.246 | 8.947 | 8.474 | 8.236 | 5.336 | 5.751 |

### 1.5B Parameter Models

| Name | Params (B) | Average (lower=better) | ao3 english | bbc news | wikipedia english | arxiv computer science | arxiv physics | github cpp | github python |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Qwen3-1.7B-Base | 1.721 | 7.965 | 12.016 | 9.743 | 9.352 | 7.936 | 8.350 | 4.260 | 4.095 |
| **RWKV7-g1b-1.5b-20251015-ctx8192** | 1.527 | 7.969 | 10.972 | 9.250 | 8.843 | 8.110 | 8.537 | 5.041 | 5.027 |
| Qwen2.5-1.5B | 1.544 | 8.124 | 12.114 | 9.562 | 9.393 | 8.270 | 8.646 | 4.502 | 4.384 |
| RWKV-x070-World-1.5B-v3-20250127-ctx4096 | 1.527 | 8.231 | 11.273 | 9.320 | 8.965 | 8.431 | 8.758 | 5.385 | 5.483 |
| SmolLM2-1.7B | 1.711 | 8.298 | 11.536 | 9.373 | 9.351 | 8.547 | 9.047 | 5.080 | 5.152 |
| Llama-3.2-1B | 1.236 | 8.306 | 12.036 | 9.331 | 9.097 | 8.556 | 8.755 | 5.267 | 5.101 |
| Index-1.9B | 2.173 | 8.340 | 11.831 | 9.493 | 9.069 | 8.497 | 8.561 | 5.380 | 5.547 |
| stablelm-2-1_6b | 1.645 | 8.396 | 11.761 | 9.237 | 8.943 | 8.762 | 9.088 | 5.558 | 5.425 |
| Falcon-H1-1.5B-Deep-Base | 1.555 | 8.505 | 12.144 | 9.666 | 9.482 | 8.407 | 8.968 | 5.497 | 5.368 |
| RWKV-x060-World-1B6-v2.1-20240328-ctx4096 | 1.600 | 8.564 | 11.434 | 9.555 | 9.276 | 8.822 | 8.990 | 5.906 | 5.968 |
| Falcon-H1-1.5B-Base | 1.555 | 8.639 | 12.287 | 9.796 | 9.645 | 8.507 | 9.089 | 5.635 | 5.514 |
| mamba2-1.3b | 1.344 | 8.699 | 11.944 | 9.710 | 9.463 | 8.925 | 8.714 | 5.851 | 6.286 |
| RWKV-5-World-1B5-v2-20231025-ctx4096 | 1.578 | 8.715 | 11.595 | 9.731 | 9.451 | 8.977 | 9.103 | 6.039 | 6.110 |
| mamba-1.4b-hf | 1.372 | 8.806 | 12.026 | 9.783 | 9.552 | 9.081 | 8.836 | 5.958 | 6.408 |

## MMLU Test

::: tip
MMLU (Massive Multitask Language Understanding) is a widely recognized benchmark of general knowledge attained by AI models. It covers a broad range of topics from 57 different categories, covering elementary-level knowledge up to advanced professional subjects like law, physics, history, and computer science.
:::

| Model | MMLU | MMLU COT |
| --- | --- | --- |
| **RWKV7-g0b-13.3b** | 0.765 | 0.827 |
| **RWKV7-g0a3-7.2b** | 0.651 | 0.723 |
| **RWKV7-g1a4-2.9b** | 0.613 | 0.675 |
| **RWKV7-g1b-1.5b** | 0.505 | 0.542 |

## MMLU Pro Test

::: tip
 MMLU-Pro dataset is a more robust and challenging massive multi-task understanding dataset tailored to more rigorously benchmark large language models' capabilities. This dataset contains 12K complex questions across various disciplines.
:::

| Model | MMLU-PRO | MMLU-PRO COT |
| --- | --- | --- |
| **RWKV7-g0b-13.3b** | 0.502 | 0.612 |
| **RWKV7-g0a3-7.2b** | 0.359 | 0.521 |
| **RWKV7-g1a4-2.9b** | 0.324 | 0.43 |
| **RWKV7-g1b-1.5b** | 0.222 | 0.292 |

## GSM8K Test

::: tip
GSM8K (Grade School Math 8K) is a dataset of 8.5K high quality linguistically diverse grade school math word problems. The dataset was created to support the task of question answering on basic mathematical problems that require multi-step reasoning.
:::

| Model | GSM8K |
| --- | --- |
| **RWKV7-g0b-13.3b** | 0.923 |
| **RWKV7-g0a3-7.2b** | 0.839 |
| **RWKV7-g1a4-2.9b** | 0.773 |
| **RWKV7-g1b-1.5b** | 0.585 |

## MATH500 Test

::: tip
MATH-500 is an authoritative benchmark for measuring the mathematical reasoning capabilities of AI models. It contains 500 challenging mathematical problems covering algebra, geometry, calculus, probability, statistics, and other fields.
:::

| Model | MATH500 |
| --- | --- |
| **RWKV7-g0b-13.3b** | 0.768 |
| **RWKV7-g0a3-7.2b** | 0.678 |
| **RWKV7-g1a4-2.9b** | 0.482 |
| **RWKV7-g1b-1.5b** | 0.298 |

## IFEval

::: tip
IFEval (Instruction-Following Evaluation) is a straightforward and easy-to-reproduce evaluation benchmark. It focuses on a set of "verifiable instructions" such as "write in more than 400 words" and "mention the keyword of AI at least 3 times".
:::

| Model | IFEval (strict prompt-level) |
| --- | --- |
| **RWKV7-g0b-13.3b** | 0.689 |
| **RWKV7-g0a3-7.2b** | 0.58 |
| **RWKV7-g1a3-2.9b** | 0.51 |
| **RWKV7-g1b-1.5b** | 0.421 |

## RULER Test

::: tip
[RULER](https://arxiv.org/abs/2404.06654) is a new LLM testing method that optimizes and extends the NIAH (Needle In A Haystack) test. It includes four types of tasks: Enhanced Retrieval (Extended NIAH), Multi-hop Tracing, Information Aggregation (CWE, FWE), and QA with interference.
:::

### Enhanced Needle In A Haystack (NIAH)

RULER includes the Enhanced Needle In A Haystack (NIAH) test, divided into four sub-tasks to evaluate the model's retrieval capabilities:

| Sub-task | Brief Description |
| :--- | :--- |
| Single NIAH (S-NIAH) | Tests the model's ability to handle a single input and a single target output. |
| Multi-keys NIAH (MK-NIAH) | Tests the model's ability to handle multiple key-value pairs, where each key is associated with a single output. |
| Multi-values NIAH (MV-NIAH) | Tests the model's ability to handle multiple key-value pairs, where each key is associated with multiple values or outputs. |
| Multi-queries NIAH (MQ-NIAH) | Tests the model's ability to synthesize and generate corresponding results under multiple query conditions. |

**Single NIAH test results are as follows:**

| Model | NIAH_single_1 | NIAH_single_2 | NIAH_single_3 |
| :--- | :--- | :--- | :--- |
| RWKV-6-7B-v2.1-4k | 100 | 98.67 | 95 |
| Llama2-7B-4k | 97.6 | 100 | 96.8 |
| Mamba-2.8B-4k | 100 | 19 | 1 |
| Mamba-1.4B-4k | 94 | 21 | 5 |
| RWKV-6-3B-v2.1-4k | 100 | 88 | 79 |
| RWKV-6-1.6B-v2.1-4k | 98 | 53 | 55 |

**NIAH-Multi-keys test results are as follows:**

| Model | NIAH_multikey_1 | NIAH_multikey_2 | NIAH_multikey_3 |
| :--- | :--- | :--- | :--- |
| RWKV-6-7B-v2.1-4k | 48.33 | 7.67 | 1.33 |
| Llama2-7B-4k | 100 | 84.4 | 60 |
| Mamba-2.8B-4k | 7 | 0 | 1 |
| Mamba-1.4B-4k | 8 | 0 | 0 |
| RWKV-6-3B-v2.1-4k | 36 | 1 | 0 |
| RWKV-6-1.6B-v2.1-4k | 25 | 1 | 0 |

**Multi-values and Multi-queries NIAH test results are as follows:**

| Model | NIAH_multivalue | NIAH_multiquery |
| :--- | :--- | :--- |
| RWKV-6-7B-v2.1-4k | 80.42 | 83.67 |
| Llama2-7B-4k | 94 | 96.7 |
| Mamba-2.8B-4k | 0.75 | 1.25 |
| Mamba-1.4B-4k | 5.25 | 4.75 |
| RWKV-6-3B-v2.1-4k | 38.5 | 40.75 |
| RWKV-6-1.6B-v2.1-4k | 25 | 20.75 |

### Variable Tracking (VT)

::: tip
Multi-hop Tracing - Variable Tracking: This task mainly checks whether the model can successfully identify and track entities (variables) and reference relationships with multi-hop connections within a long context. For example, given the assignment $X_1 = V$, then $X_2 = X_1$, $X_3 = X_2$ ... finally returning all variable names pointing to the value $V$.
:::

| Model | Multi-hop Tracing |
| :--- | :--- |
| RWKV-6-7B-v2.1-4k | 7.53 |
| Llama2-7B-4k | 63.12 |
| Mamba-2.8B-4k | 45 |
| Mamba-1.4B-4k | 23.4 |
| RWKV-6-3B-v2.1-4k | 11.8 |
| RWKV-6-1.6B-v2.1-4k | 1.4 |

### Information Aggregation (CWE, FWE)

::: tip
**Information Aggregation (CWE, FWE)**: This task involves Common Words Extraction (CWE) and Frequent Words Extraction (FWE), used to test the model's ability to **aggregate common information across long contexts**.
:::

| Model | Common Words Extraction (CWE) | Frequent Words Extraction (FWE) |
| :--- | :--- | :--- |
| RWKV-6-7B-v2.1-4k | 38.6 | 78.33 |
| Llama2-7B-4k | 73.04 | 78.8 |
| Mamba-2.8B-4k | 2 | 53 |
| Mamba-1.4B-4k | 15.5 | 57.33 |
| RWKV-6-3B-v2.1-4k | 30.3 | 62.67 |
| RWKV-6-1.6B-v2.1-4k | 11 | 46.33 |

### Question Answering (QA)

::: tip
**Question Answering (QA)**: This task adds distracting information to the input of existing short-context QA datasets to evaluate QA capabilities under various context sizes.
:::

| Model | qa_1 | qa_2 |
| :--- | :--- | :--- |
| RWKV-6-7B-v2.1-4k | 45 | 37 |
| Llama2-7B-4k | 59.2 | 42 |
| Mamba-2.8B-4k | 23 | 18 |
| Mamba-1.4B-4k | 24 | 23 |
| RWKV-6-3B-v2.1-4k | 35 | 25 |
| RWKV-6-1.6B-v2.1-4k | 35 | 28 |

> **Data Source**
>
> RULER Data Source: [https://github.com/Ojiyumm/RULER_RWKV](https://github.com/Ojiyumm/RULER_RWKV)

## LongBench Test

::: tip
[LongBench](https://arxiv.org/abs/2308.14508) is a benchmark for evaluating the long-text understanding capabilities of large language models.

LongBench consists of six major categories and twenty-one different bilingual (Chinese-English) tasks, covering critical long-text application scenarios such as Single-Document QA, Multi-Document QA, Summarization, Few-shot Learning, Synthetic Tasks, and Code Completion.
:::

Below is a comparison of LongBench scores for RWKV and other models, with data tables presented by the six categories:

### Single-Document QA

Single-Document QA includes the following four test tasks:

| Task | Task Description |
| :--- | :--- |
| NarrativeQA | QA based on stories or scripts, including understanding of characters, plots, themes, etc. |
| Qasper | QA based on single papers; questions are asked by NLP readers and answered by NLP practitioners. |
| MultiFieldQA-en | Answering English questions based on a single document from relatively diverse fields. |
| MultiFieldQA-zh | Answering Chinese questions based on a single document from relatively diverse fields. |

**Single-Document QA Test Results:**

| Model | NarrativeQA | Qasper | MultiFieldQA-en | MultiFieldQA-zh |
| :--- | :--- | :--- | :--- | :--- |
| GPT-3.5-Turbo-16k | 23.6 | 43.3 | 52.3 | 61.2 |
| Llama2-7B-chat-4k | 18.7 | 19.2 | 36.8 | 11.9 |
| LongChat-v1.5-7B-32k | 16.9 | 27.7 | 41.4 | 29.1 |
| XGen-7B-8k | 18.0 | 18.1 | 37.7 | 14.8 |
| InternLM-7B-8k | 12.1 | 16.7 | 23.4 | 33.6 |
| ChatGLM2-6B-32k | 21.1 | 31.5 | 46.2 | 51.6 |
| Vicuna-v1.5-7B-16k | 19.4 | 26.1 | 38.5 | 43.0 |
| ChatGLM3-6B-32k | 26.0 | 43.3 | 51.7 | 62.3 |
| Mamba_1B4 | 2.23 | 4.44 | 11.33 | 13.03 |
| Mamba_2B8 | 2.32 | 4.89 | 8.15 | 6.83 |
| Llama2-7B | 18.7 | 19.2 | 11.90 | 36.8 |
| Mistral-7B | 12.79 | 8.9 | 30.55 | 17.91 |
| **RWKV-6-World-1B6-v2.1** | 4.53 | 19.79 | 22.99 | 18.57 |
| **RWKV-6-World-3B-v2.1** | 2.87 | 14.2 | 18.78 | 21.49 |
| **RWKV-6-World-7b-v2.1-4k** | 20.75 | 40.2 | 36.01 | 50.19 |

### Multi-Document QA

Multi-Document QA includes the following four test tasks:

| Task | Task Description |
| :--- | :--- |
| HotpotQA | Answering questions based on HotpotQA documents; involves many 2-hop questions written by native speakers based on two related paragraphs. |
| 2WikiMultihopQA | Answering questions based on 2WikiMultihopQA data; composed of up to 5-hop questions synthesized via manually designed templates. |
| MuSiQue | Answering questions based on MuSiQue data; composed of simple questions requiring up to 4-hop reasoning. |
| DuReader | Answering questions based on the Chinese DuReader dataset, containing 200k questions and 1M documents from Baidu Search and Baidu Zhidao. |

**Multi-Document QA Test Results:**

| Model | HotpotQA | 2WikiMQA | Musique | DuReader (zh) |
| :--- | :--- | :--- | :--- | :--- |
| GPT-3.5-Turbo-16k | 51.6 | 37.7 | 26.9 | 28.7 |
| Llama2-7B-chat-4k | 25.4 | 32.8 | 9.4 | 5.2 |
| LongChat-v1.5-7B-32k | 31.5 | 20.6 | 9.7 | 19.5 |
| XGen-7B-8k | 29.7 | 21.1 | 10.3 | 11.0 |
| InternLM-7B-8k | 28.7 | 22.8 | 9.0 | 11.1 |
| ChatGLM2-6B-32k | 45.1 | 34.0 | 21.9 | 37.6 |
| Vicuna-v1.5-7B-16k | 25.3 | 20.8 | 9.8 | 19.3 |
| ChatGLM3-6B-32k | 54.4 | 44.9 | 40.4 | 44.78 |
| Mamba_1B4 | 5.73 | 8.77 | 3.3 | 11.95 |
| Mamba_2B8 | 5.49 | 8.45 | 3.45 | 13.96 |
| Llama2-7B | 25.4 | 32.8 | 9.4 | 5.2 |
| Mistral-7B | 9.39 | 11.17 | 4.58 | 11.68 |
| **RWKV-6-World-1B6-v2.1** | 8.72 | 11.86 | 3.96 | 11.40 |
| **RWKV-6-World-3B-v2.1** | 6.79 | 9.64 | 4.13 | 17.41 |
| **RWKV-6-World-7b-v2.1-4k** | 22.74 | 16.3 | 10.49 | 28.01 |

### Summarization

The Summarization category involves the following four test tasks:

| Task | Task Description |
| :--- | :--- |
| GovReport | Summarization task requiring summaries of government work reports. |
| QMSum | Summarization task requiring summaries of meeting minutes based on user queries. |
| MultiNews | Multi-document summarization task requiring summaries based on multiple news articles. |
| VCSUM | Summarization task requiring summaries of Chinese meeting minutes. |

**Summarization Test Results:**

| Model | GovReport | QMSum | MultiNews | VCSUM (zh) |
| :--- | :--- | :--- | :--- | :--- |
| GPT-3.5-Turbo-16k | 29.5 | 23.4 | 26.7 | 16.0 |
| Llama2-7B-chat-4k | 27.3 | 20.8 | 25.8 | 0.2 |
| LongChat-v1.5-7B-32k | 30.8 | 22.7 | 26.4 | 9.9 |
| XGen-7B-8k | 27.3 | 20.5 | 26.2 | 2.2 |
| InternLM-7B-8k | 9.7 | 15.9 | 22.8 | 12.4 |
| ChatGLM2-6B-32k | 32.4 | 24.0 | 26.5 | 16.2 |
| Vicuna-v1.5-7B-16k | 27.9 | 22.8 | 27.2 | 15.1 |
| ChatGLM3-6B-32k | 36.8 | 23.9 | 27.9 | 17.8 |
| Mamba_1B4 | 9.34 | 10.85 | 15.86 | 6.33 |
| Mamba_2B8 | 10.41 | 11.42 | 18.94 | 6.1 |
| Llama2-7B | 27.3 | 20.8 | 25.8 | 0.2 |
| Mistral-7B | 28.84 | 20.32 | 22.79 | 4.1 |
| **RWKV-6-World-1B6-v2.1** | 17.51 | 20.36 | 21.52 | 10.71 |
| **RWKV-6-World-3B-v2.1** | 19.21 | 21 | 21.76 | 10.18 |
| **RWKV-6-World-7b-v2.1-4k** | 31.64 | 21.31 | 26.06 | 15.19 |

### Few-shot Learning

Few-shot Learning includes the following four test tasks:

| Task | Task Description |
| :--- | :--- |
| TREC | Classification task requiring question classification, containing 50 categories in total. |
| TriviaQA | Single-document QA task, providing several Few-shot examples. |
| SAMSum | Dialogue summarization task, providing several Few-shot examples. |
| LSHT | Chinese classification task requiring news classification, containing 24 categories in total. |

**Few-shot Learning Test Results:**

| Model | TREC | TriviaQA | SAMSum | LSHT (zh) |
| :--- | :--- | :--- | :--- | :--- |
| GPT-3.5-Turbo-16k | 68.0 | 91.4 | 41.7 | 29.2 |
| Llama2-7B-chat-4k | 61.5 | 77.8 | 40.7 | 19.8 |
| LongChat-v1.5-7B-32k | 63.5 | 82.3 | 34.2 | 23.2 |
| XGen-7B-8k | 65.5 | 77.8 | 25.3 | 20.5 |
| InternLM-7B-8k | 52.0 | 77.8 | 21.2 | 15.2 |
| ChatGLM2-6B-32k | 62.5 | 78.7 | 36.3 | 27.7 |
| Vicuna-v1.5-7B-16k | 71.5 | 86.2 | 40.8 | 28.8 |
| ChatGLM3-6B-32k | 79.0 | 87.1 | 38.2 | 42.0 |
| Mamba_1B4 | 45.5 | 37.33 | 12.56 | 8.5 |
| Mamba_2B8 | 21.5 | 34.62 | 9.3 | 5 |
| Llama2-7B | 61.5 | 77.8 | 40.7 | 19.8 |
| Mistral-7B | 70.0 | 89.26 | 43.74 | 25.5 |
| **RWKV-6-World-1B6-v2.1** | 39.5 | 47.64 | 13.58 | 18.8 |
| **RWKV-6-World-3B-v2.1** | 51.5 | 57.15 | 17.95 | 15.2 |
| **RWKV-6-World-7b-v2.1-4k** | 55.5 | 86.89 | 44.25 | 30.2 |

### Synthetic Tasks

Synthetic Tasks include the following three test tasks:

| Task | Task Description |
| :--- | :--- |
| PassageCount | Determine the total number of unique paragraphs among the given paragraphs. |
| PassageRetrieval-en | Given 30 English Wikipedia paragraphs, determine which paragraph the given summary belongs to. |
| PassageRetrieval-zh | Given several Chinese paragraphs from the C4 dataset, determine which paragraph the given summary belongs to. |

**Synthetic Tasks Test Results:**

| Model | Passage Count | PassageRetrieval-en | PassageRetrieval-zh |
| :--- | :--- | :--- | :--- |
| GPT-3.5-Turbo-16k | 4.5 | 71.0 | 77.5 |
| Llama2-7B-chat-4k | 2.1 | 9.8 | 0.5 |
| LongChat-v1.5-7B-32k | 1.0 | 30.5 | 7.6 |
| XGen-7B-8k | 2.1 | 8.5 | 3.5 |
| InternLM-7B-8k | 3.0 | 6.0 | 0.9 |
| ChatGLM2-6B-32k | 1.5 | 77.0 | 64.5 |
| Vicuna-v1.5-7B-16k | 6.5 | 4.5 | 5.0 |
| ChatGLM3-6B-32k | 2.0 | 99.0 | 94.0 |
| Mamba_1B4 | 0.45 | 3.32 | 3.81 |
| Mamba_2B8 | 0.74 | 1.83 | 3.37 |
| Llama2-7B | 2.1 | 9.8 | 0.5 |
| Mistral-7B | 1.05 | 12.5 | 16.75 |
| **RWKV-6-World-1B6-v2.1** | 0 | 4.25 | 4.16 |
| **RWKV-6-World-3B-v2.1** | 0 | 3.83 | 4.12 |
| **RWKV-6-World-7b-v2.1-4k** | 5 | 34.5 | 54.22 |

### Code Completion

Code Completion includes the following two test tasks:

| Task | Task Description |
| :--- | :--- |
| LCC | Given a long piece of code, predict the next line of code. |
| RepoBench-P | Given code from multiple files in a GitHub repository (including inter-file dependencies), predict the next line of code. |

**Code Completion Test Results:**

| Model | LCC | RepoBench-P |
| :--- | :--- | :--- |
| GPT-3.5-Turbo-16k | 54.7 | 53.6 |
| Llama2-7B-chat-4k | 52.4 | 43.8 |
| LongChat-v1.5-7B-32k | 53.0 | 55.3 |
| XGen-7B-8k | 38.6 | 38.6 |
| InternLM-7B-8k | 44.1 | 28.8 |
| ChatGLM2-6B-32k | 55.6 | 49.9 |
| Vicuna-v1.5-7B-16k | 51.0 | 43.5 |
| ChatGLM3-6B-32k | 57.66 | 54.76 |
| Mamba_1B4 | 44.33 | 41.86 |
| Mamba_2B8 | 39.53 | 24.38 |
| Llama2-7B | 52.4 | 43.8 |
| Mistral-7B | 70.64 | 59.7 |
| **RWKV-6-World-1B6-v2.1** | 39.5 | 40.44 |
| **RWKV-6-World-3B-v2.1** | 40.01 | 41.35 |
| **RWKV-6-World-7b-v2.1-4k** | 73.84 | 54.1 |

### Comprehensive Score Comparison of RWKV, Mamba, and Llama2

| Model | Single DocQ | Few-shc | Summarization | Multi Doc QA | Code Completion | Syntetic |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RWKV-6-World-1B6-v2.1** | 16.470 | 29.868 | 17.525 | 8.985 | 39.970 | 2.803 |
| **RWKV-6-World-3B-v2.1** | 14.335 | 35.443 | 18.038 | 9.493 | 40.680 | 2.650 |
| **RWKV-6-World-7b-v2.1-4k** | 36.788 | 54.203 | 23.550 | 19.385 | 63.970 | 31.240 |
| Mamba_1B4 | 7.758 | 25.973 | 10.595 | 7.438 | 43.095 | 2.527 |
| Mamba_2B8 | 5.548 | 17.605 | 11.718 | 7.838 | 31.955 | 1.980 |
| Llama2-7B | 21.650 | 49.950 | 18.525 | 18.200 | 48.100 | 4.133 |
| Mistral-7B | 17.538 | 52.833 | 19.013 | 9.205 | 65.17 | 10.100 |

> **Data Source**
>
> Evaluation Data Source: [https://github.com/Ojiyumm/LongBench_RWKV](https://github.com/Ojiyumm/LongBench_RWKV)