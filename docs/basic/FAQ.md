# Frequently Ask Questions

## When is the next RWKV model coming out?

RWKV does not have a fixed release schedule, nor make commitments on when the next model will be released. In general BlinkDL, who is in charge of the RWKV project, releases a new model as and when it is ready.

So anywhere from next few days, to next few months.

Generally speaking as the current version of the model is being released, the training process for the next version of the model is already underway.

## What is the dataset that RWKV is trained on?

- RWKV base model is trained primarily on ["the pile"](https://pile.eleuther.ai/), with additional datasets for various other languages.
- RWKV raven is instruction trained on a filtered version of gpt4all
- RWKV world model is trained on both "the pile" and [redpajamas](https://github.com/togethercomputer/RedPajama-Data)

## Is the RWKV model censored?

RWKV models are generally not censored. However while we remove common gotchas from the gpt4all training dataset (aka the "I cannot answer this as a LLM"), it is by no means a perfect dataset. As such it is possible for the model to still self-censor itself in some cases.

## Why does the various model have context length (4k/8k) listed in their name? 

While RWKV on a technical level has "infinite" context length, it requires training data of a certain context length, to be able to perform tasks efficently. The listed model "context length" is the "effective context length" which the model has been trained with. Anything longer then that, and the model performance is expected to degrade drastically, as it has not been trained to handle such long context.

It is possible to train / finetune a model to longer context length, provided you have the training data to do so.

## What is RWKV licensed under?

RWKV and its models is Apache 2.0 licensed, which means it is suitable for both commercial and non-commercial use.

## What is racoon??

Racoon is a community finetuned model, for chat and general purpose use. And is made by @nath , you can find it here : https://huggingface.co/m8than/rwkv-v4-raccoon

It has its own quirky personality, and is more then willing to insult you the user if needed be.

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
- `+i` : Generate a response using the prompt as an instruction (using instruction template)
- `+qa` : Generate a response using the prompt as a question, from a blank state (using question answer template)
- `+` : Retry with an alternative chat reply (default mode is chat mode, unless you used the +gen / +i / +qa command)

These commands are implemented by the `chat.py` code, and are not part of the model itself.

## I would like to study more on the architecture (hidden state, time mixing, etc), where should I go ?

See the [architecture page](../advance/architecture.md)

## How much would it cost to train RWKV >20B from scratch ? And why can't you give me a simple answer to how much I need ?

> TLDR: If you do not have access to ~$1M worth of GPU time, do not consider this task

While the price of training a model keeps falling, training from scratch is a task most individuals underestimate the cost.

There are lots of factors involved in training a model, most importantly is the dataset size (aka. number of tokens), the model size, and your timeline. Also you will need to budget in for mistakes, that could happen in the training process, and the human cost involved in setting up and preparing the whole process. All of which makes things hard to predict accurately. (Not to mention with that amount of money involved, you probably would want to have a say of the datasets being used, all of which takes even more time and labour to prepare)

For example, it is predicted that LLaMA2 [70B foundation model cost $2.6M to train from scratch, with 2 Trillion tokens](https://twitter.com/moinnadeem/status/1681393075367841792) - so as a general rule of thumb, unless you have access to $1M worth of GPU time, you should not be considering training anything >14B from scratch.

While RWKV as a RNN, should in theory be cheaper to train then a transformer. Even 1/5 of $2.6M, is a cost most individuals or companies will not be able to afford.
At this point, however some of you may ask: is it possible to just train on a single machine? instead of an expensive GPU farm?

In theory, you can train on a single machine, as long as you have the [minimum required vram for the model size](https://wiki.rwkv.com/advance/finetune.html#how-much-gpu-vram-do-you-need). However with a large enough dataset, or in the case of 70B LLaMA2 2 Trillion tokens - it would have taken a single A100 a total of 1,720,320 hours, or a 196 years.

As such, because no one wants to wait 190+ years for their model to finish - we split workload across multiple training nodes. However, this is not a perfectly scalable process. For every node we add, we face a heavy penalty in efficiency, due to the high communication overheads involved.

The end result, ends up being a very complicated math of "how fast you want the model" vs "how much can you pay" with faster training time, generally meaning increasing costs in overall. Making estimates of $5M to $1M all very possible numbers depending on how fast (or slow) would you want your model to be.

> If you however, do have GPU time you can donate to RWKV for training an OSS model, through your research institute, etc. Do get in touch with us 😉 (it does not need to be ~$1M worth, even small amount helps in a long way)
