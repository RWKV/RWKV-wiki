# How to play with the Raven model?

## Online public demos

If you simply want to give the RWKV Raven a try, you can try the following public demos.

- [7B Public Demo](https://huggingface.co/spaces/BlinkDL/Raven-RWKV-7B)
- [14B Public demo](https://huggingface.co/spaces/BlinkDL/ChatRWKV-gradio)

::: tip
Chat is disabled in the above public demo
:::

## Minimal steps for local setup (Recommended route)

If you are not familiar with python or hugging face, you can install chat models locally with the following app

- [RWKV Runner Project](https://github.com/josStorer/RWKV-Runner)
    - [installer download (do read the installer README instructions)](https://github.com/josStorer/RWKV-Runner/releases/)

[![RWKV Runner Demo](/img/rwkv-runner-demo.png)](https://github.com/josStorer/RWKV-Runner)

Or interact with the model via the following CLI, if you have NPM installed

- [RWKV-cpp-node CLI](https://www.npmjs.com/package/rwkv-cpp-node)

```bash
# Install globally, do not use NPX as it has known display issues
npm install -g rwkv-cpp-node

# Run the setup, and use the chat demo
rwkv-cpp-node
```

# Prompting guidelines for RWKV

RWKV is more sensitive to prompt format, then transformer based models. Due to its weaker ability in "looking back"

As such, instead of doing something like the following

```
{{CONTEXT}}

{{INSTRUCTION}}

{{ANSWER}}
```

As the format you should instead, do the following

```
{{INSTRUCTION}}

{{CONTEXT}}

{{ANSWER}}
```

For a human analogy, you can think of it as the instruction/input's are being read out loud to to model, without letting the model write it down. If the model is told the context first before instruction, it does not know what to do with the context, and may not remember parts that are crucial to the instruction. As it has not been told what to do with it yet.

However if you tell the model the instruction first, then the context, it will understand the instruction first, and use that knowledge to process the context.

For Q&A with context task, the most optimal is to repeat the question before and after the context like the following

```
{{QUESTION}}

{{CONTEXT}}

{{QUESTION}}

{{ANSWER}}
```

## How to play with custom models instead?

If the above "guided" setups are not what you are looking for, and you want to experiment with different model sizes / quantization settings. The following are the general list to find the various things you may need.

### Instruction trained models download
- [Raven](https://huggingface.co/BlinkDL/rwkv-4-raven/tree/main)

### Base Models download
- [Pile 7B](https://huggingface.co/BlinkDL/rwkv-4-pile-7b)
- [Pile 14B](https://huggingface.co/BlinkDL/rwkv-4-pile-14b)
- [PilePlus models](https://huggingface.co/BlinkDL/rwkv-4-pileplus)
- [RWKV World](https://huggingface.co/BlinkDL/rwkv-4-world)

::: tip
It is strongly advised to try the raven instruction model, unless you are familiar with few shot prompting with the base models
:::

### RWKV.cpp / RWKV.cpp cuda project

After downloading the desired model, you can quantize or convert them for running against the RWKV.cpp / RWKV-cpp-cuda project

- [RWKV.cpp](https://github.com/saharNooby/rwkv.cpp)
- [RWKV-cpp-cuda](https://github.com/harrisonvanderbyl/rwkv-cpp-cuda)

These projects are designed to run locally, without the need of python or hugging face. And can be ranned on CPU or GPU (or both) respectively

::: tip
Despite the "cuda" name, rwkv-cpp-cuda does have vulkan support, meaning it can run on AMD GPU's
:::

### RWKV mobile projects

- [AltaeraAI : Run RWKV on your android phone \(May require some CLI knowledge to get it running\)](https://altaera.ai/)

### Chat client projects

The official RWKV chat project can be found here
- [ChatRWKV](https://github.com/BlinkDL/ChatRWKV)

### RWKV main repo

The main RWKV repo can be found here, use v4neo to run current models
- [RWKV](https://github.com/BlinkDL/RWKV-LM/tree/main/RWKV-v4neo)

::: tip
For new users, unless you plan to finetune, due to the complexity involved with python dependencies, it is recommmended to use the RWKV.cpp project instead.
:::
