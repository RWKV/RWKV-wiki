# Frequently Asked Questions

## When will the next RWKV model be released?

RWKV does not have a fixed release schedule and does not make promises regarding when the next model will be released. Generally, BlinkDL (Bo), the lead of the RWKV project, releases new models as soon as they are ready.

Therefore, the next version could be released in the coming days or in the coming months.

Typically, when we release the latest version of a model, the training/preparation process for the *next* version is already underway.

## What do v2 / v2.1 / v3 in RWKV model names mean?

v2 / v2.1 / v3 represent the version of the training dataset used for the RWKV model.

- v1 ≈ 0.59T tokens
- v2 ≈ 1.1T tokens
- v2.1 ≈ 1.42T tokens, total training data for v2.1 models ≈ 2.5T tokens
- v3 ≈ 3T tokens, total training data for v3 models ≈ 5.5T tokens

If the model name does not specify v2 or a later version, it defaults to being based on the v1 dataset.

<CallOut type="info">
If you want to learn more about RWKV's training datasets, please visit [RWKV Training Datasets](./Dataset).
</CallOut>

## Why does RWKV list context length (4k / 8k) in the model name?

Although RWKV technically possesses an "infinite" context length, it requires training data with a certain context length to perform tasks effectively.

The listed "context length" represents the "effective context length" on which the model has been trained. For content exceeding this length, a slight degradation in model performance is expected.

If you have the training data, it is possible to train/fine-tune an RWKV model to support a longer context length.

## Under what open-source license is RWKV released?

RWKV and its models are released under the Apache 2.0 open-source license, meaning they are suitable for both commercial and non-commercial use.

## What tokenizer does RWKV use?

The RWKV-World series models use the `rwkv_vocab_v20230424` tokenizer. The specific file is `rwkv_vocab_v20230424.txt`, which can be found in the [RWKV-v5/tokenizer](https://github.com/BlinkDL/RWKV-LM/blob/main/RWKV-v5/tokenizer/rwkv_vocab_v20230424.txt) directory of the main RWKV repository.

The `rwkv_vocab_v20230424` tokenizer merges the vocabularies of the following tokenizers, with manually selected tokens for non-European languages:

- [GPT-NeoX-20B](https://huggingface.co/EleutherAI/gpt-neox-20b)
- [GPT2](https://huggingface.co/openai-community/gpt2)
- [cl100k_base of tiktoken](https://github.com/openai/tiktoken)
- [Llama2](https://huggingface.co/meta-llama/Llama-2-7b-hf)
- [Bloom](https://huggingface.co/bigscience/bloom)

The tokenizer is implemented using a Trie (prefix tree), maintaining simplicity while improving speed. The encoding process is performed by matching the longest element in the vocabulary with the input string from left to right.

The vocabulary size of the tokenizer is V = 65536, numbered from 0 to 65535, with tokens arranged by their byte length.

Here is a brief overview:

- token 0: Represents the boundary between text documents, known as `<EOS>` or `<SOS>`. This token does not encode any specific content and is used solely for document separation.

- token 1-256: Consist of byte encodings (token k encodes byte k−1), where tokens 1-128 correspond to standard ASCII characters.

- token 257-65529: Tokens with a length of at least 2 UTF-8 bytes, including words, prefixes, suffixes, accented letters, Chinese characters (Hanzi), Korean (Hangul), Hiragana, Katakana, and emojis. For example, Chinese characters are assigned to tokens between 10250 and 18493.

- token 65530-65535: Reserved tokens for future use.

## What is the cost to train an RWKV model larger than 20B from scratch? Can you give me a simple answer: how much money is needed?

<CallOut type="info">
In short: If you do not have access to nearly $1 million worth of GPU resources, do not consider this task.
</CallOut>

Although the cost of training models is constantly decreasing, most people underestimate the cost involved in training a model from scratch.

Training a model involves many factors, the most important being the size of the dataset and the size of the model parameters. You may need to pay for errors that occur during training; every adjustment to training settings and the training process itself involves labor costs. These factors make the cost of the entire training process difficult to predict accurately. (Not to mention, with that much money involved, you might have specific requirements for the dataset used to train the model, and all additional dataset requirements require more time and labor to prepare.)

For example, it is estimated that [training the LLaMA2-70B base model from scratch](https://twitter.com/moinnadeem/status/1681393075367841792) requires $2.6 million in GPU resources. Although, theoretically, as an RNN, RWKV should be cheaper to train than a Transformer. But even if the cost is cut to $500,000, most individuals or companies cannot afford it.

Therefore, as a general rule, unless you have nearly $1 million in GPU resources and a sufficient labor budget to prepare the dataset, it is not recommended to train any model larger than 14B from scratch.

At this point, some might ask: Is it possible to train on a single-card machine instead of an expensive GPU cluster?

Theoretically, as long as you have the minimum VRAM required to train an RWKV model (e.g., one A100), you can train it on a single machine. However, for larger datasets—such as in the case of 70B LLaMA2 / 2T tokens—a single A100 would take a total of 1,720,320 hours, or 196 years.

No one wants to wait over 190 years to complete model training, so we usually distribute the workload across multiple training nodes. Unfortunately, this is not a perfectly scalable process. Each added node reduces training efficiency due to the high communication overhead between GPUs.

The end result becomes a very complex math problem: a balance between "how fast you want the model" and "how much you can pay". Faster training times usually mean increased overall costs.

**Summary: Depending on the training speed, training an RWKV model larger than 20B from scratch will cost approximately $1 million to $5 million.**

> If you have GPU compute power to donate to RWKV for training open-source software models, please contact us through your research institution or other channels 😉 (It doesn't need to be on the scale of $1 million; even small donations can be very helpful).

## Does RWKV support "training parallelization"? Why does the RetNet paper claim it does not?

RWKV supports "training parallelization" across multiple GPUs via DeepSpeed. In many cases, it surpasses Transformers in training speed for similar parameter counts.

This is consistent with the definitions adopted by [Hugging Face](https://huggingface.co/docs/transformers/v4.15.0/parallelism) or other [papers](https://www.researchgate.net/figure/Different-Training-Parallelization-Strategies_fig2_334821612).

RetNet defines "training parallelization" as the ability to train on a subsequent token without waiting for the previous token's training to complete; RWKV fails under this specific definition.

In fact, the authors of the RetNet paper have [acknowledged](https://web.archive.org/web/20230916013316/https://github.com/microsoft/unilm/issues/1243) that RWKV supports "training parallelization", and they have separately admitted that RWKV has no issues with high throughput across multiple GPUs (based on actual testing).