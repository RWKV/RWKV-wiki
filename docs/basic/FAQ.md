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

## What is channel / time mixing, explain it in simple terms?

In its simplest form, RWKV processes one token at a time, and update a "hidden state" which consist of a vector floating point numbers. This hidden state is used to generate the next token, and represents the model current "state of mind".

When used as a standard AI completion model. This "hidden state" will be generated using the model input state.

Channel mixing is the process where the next token being generated is mixed with the previous state, to update this "state of mind". In general channel mixing contains data from the most recent tokens.

Time mixing is a similar process, however allows the model to retain the previous state of mind over a longer period of time. Which is trained by the model. This allow it to retain data from the past indefinitely, if it was trained to do so.

Because the current token, is able to read data from the past state via channel and time mixing. This provides an alternative to "attention" models.
