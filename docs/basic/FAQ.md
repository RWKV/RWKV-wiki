# Frequently Ask Questions

## When is the next RWKV model coming out?

RWKV neither has a fixed release schedule nor makes commitments on when the next model will be released. BlinkDL, who is in charge of the RWKV project, releases new models when they're ready. This means a new release could happen within days or might take months.

All RWKV models are OSS. Our training processes depend heavily on available GPUs provided by our sponsors.

Typically, as one model version is being released, training / preparation for the next version is already in progress.

## What is the dataset that RWKV is trained on?

- RWKV base model is trained primarily on ["the pile"](https://pile.eleuther.ai/), with additional datasets for various other languages.
- RWKV raven is instruction trained on a filtered version of gpt4all
- RWKV world model is trained on both "the pile" and [redpajamas](https://github.com/togethercomputer/RedPajama-Data)

## Is the RWKV model censored?

RWKV models are generally not censored. While we remove common gotchas from the gpt4all training dataset (such as "I cannot answer this as a LLM" responses), it isn't perfect. Consequently, the model may still occasionally self-censor despite efforts to prevent this behavior.

## Why does the various model have context length (4k/8k) listed in their name? 

While RWKV on a technical level has an "infinite" context length, it requires training data of a certain context length, to be able to perform tasks efficiently. The listed model "context length" is the "effective context length" which the model has been trained with. Anything longer than that, and the model performance is expected to degrade drastically, as it has not been trained to handle such a long context. But if you have the training data, you can to train / finetune a model to longer context length.

## What is RWKV licensed under?

RWKV and all its models are released under the Apache 2.0 license, which means they can be used in both commercial and non-commercial applications.

## What is racoon?

Racoon is a community finetuned model, for chat and general purpose use. And is made by @nath , you can find it here : https://huggingface.co/m8than/rwkv-v4-raccoon

It has its own quirky personality and is more then willing to insult you the user if needed be.

## What are the RWKV chat commands ?

RWKV.cpp and the RWKV discord chat bot include the following special commands. Which you can use accordingly.

You can configure the following setting anytime.

- `-temp=X` : Set the temperature of the model to X, where X is between 0.2 to 5
- `-top_p=Y` : Set top_p to be between 0.0 and 1.0

You can only use one of the following command per prompt.

- `+reset` : Reset the current chat history to its initial state
- `+gen` : Generate a response continuing from the prompt
    - `+++` : Continue the generation of response
    - `++` : Retry with an alternative response
- `+i` : Generate a response using the prompt as an instruction (using an instruction template)
- `+qa` : Generate a response using the prompt as a question, from a blank state (using question-answer template)
- `+` : Retry with an alternative chat reply (default mode is chat mode, unless you used the +gen / +i / +qa command)

These commands are implemented by the `chat.py` code, and are not part of the model itself.

## I would like to study more on the architecture (hidden state, time mixing, etc), where should I go ?

See the [architecture page](../advance/architecture.md)

## How much would it cost to train RWKV >20B from scratch ? And why can't you give me a simple answer to how much I need ?

> TLDR: Don't consider training a model from scratch unless you have access to ~$1M worth of GPU time.

The cost of training models continues to decrease, but most individuals still underestimate the cost of training from scratch.

There are lots of factors involved in training a model, most important are the dataset size (aka. number of tokens), the model size, and your timeline. Also you will need to budget for mistakes that could happen in the training process and the labor cost involved in setting up and preparing the whole process, making it difficult to predict costs accurately. (Not to mention with that amount of money involved, you probably would want to have a say of the datasets being used, all of which takes even more time and labour to prepare)

For example, it is predicted that LLaMA2 [70B foundation model cost $2.6M to train from scratch, with 2 Trillion tokens](https://twitter.com/moinnadeem/status/1681393075367841792) in GPU time alone—so as a general rule of thumb, unless you have access to $1M worth of GPU time, and a decent amount to prepare the datasets, you should not be considering training anything >14B from scratch.

Even though RWKV as a recurrent neural network should theoretically be cheaper to train than a transformer, the cost—at roughly one-fifth of $2.6M—still costs more than what individuals or companies can afford.

At this point, however some of you may ask: is it possible to just train on a single machine? instead of an expensive GPU farm?

In theory, you can train on a single machine, as long as you have the [minimum required vram for the model size](https://wiki.rwkv.com/advance/finetune.html#how-much-gpu-vram-do-you-need). However with a large enough dataset, or in the case of 70B LLaMA2, 2 Trillion tokens—it would have taken a single A100 a total of 1,720,320 hours, or a 196 years.

Since no one wants to wait 190+ years for their model to finish, we split workload across multiple training nodes. This is sadly not a perfectly scalable process. Every additional node adds a penalty in efficiencies, due to the high communication overheads involved.

The end result, ends up being a very complicated math of "how fast you want the model" vs "how much can you pay" with faster training time, generally meaning increasing costs in overall. Making estimates of $5M to $1M all very possible numbers depending on how fast (or slow) would you want your model to be.

> If you do have GPU time you can donate to RWKV for training an OSS model through your research institute, etc. Do get in touch with us 😉 (it does not need to be ~$1M worth, even small amount helps in a long way)

## Does RWKV support "Training Parallelization"? Why does the RetNet paper claim otherwise?

RWKV supports "Training Parallelization" across multiple GPUs via deepspeed. And in many cases outperforms transformer in training speed over similar param count.

This is consistent with the definition [huggingface](https://huggingface.co/docs/transformers/v4.15.0/parallelism), or other [papers](https://www.researchgate.net/figure/Different-Training-Parallelization-Strategies_fig2_334821612) have adopted.

RetNet defined "Training Parallelization" as the ability to train loss on a later token, without waiting for the previous token training to complete, a definition which RWKV fails. This has been [confirmed by the paper authors here](https://web.archive.org/web/20230916013316/https://github.com/microsoft/unilm/issues/1243), who separately acknowledges that RWKV has no issue having high throughput across multiple GPUs (as per their testing)

RWKV does not dispute the validity of claims made in the context of this alternate definition, e.g. layer 1 tokens need to be evaluated first before cascading to any other tokens or layers. We have requested changes because the paper's definition is unclear and possibly misleading. We are unable to force changes on other papers publications beyond our control.
