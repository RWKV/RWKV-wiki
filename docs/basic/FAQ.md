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

## I would like to study more on the architecture, where should I go ?

See the [architecture page](../advance/architecture.md)