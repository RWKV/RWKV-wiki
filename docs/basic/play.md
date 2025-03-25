# How to play with the Goose / RWKV model?

## Online public demos

If you simply want to try RWKV Goose, checkout the following public demo.

- [HF Gradio](https://huggingface.co/spaces/BlinkDL/RWKV-Gradio-2)

::: tip
Chat is disabled in the above public demo
:::

## Minimal steps for local setup (Recommended route)

If you are not familiar with Python or HuggingFace, you can install chat models locally with the following app:

- [RWKV Runner Project](https://github.com/josStorer/RWKV-Runner)
    - [installer download (do read the installer README instructions)](https://github.com/josStorer/RWKV-Runner/releases/)

[![RWKV Runner Demo](/img/rwkv-runner-demo.png)](https://github.com/josStorer/RWKV-Runner)

**Windows setup guide video**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/LrrYJ1LeVqw?si=fd7HW7Wcog4AL3mQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Prompting guidelines for RWKV

RWKV is more sensitive to prompt format than transformer-based models, due to its weaker ability in "looking back".

Thus, instead of doing something like the following:

```
{{CONTEXT}}

{{INSTRUCTION}}

{{ANSWER}}
```

Use the following format:

```
{{INSTRUCTION}}

{{CONTEXT}}

{{ANSWER}}
```

In the first version, you give some context to model without letting the model write it down, and the model doesn't know what to focus on and may forget crucial parts. If you give the model instructions first, and then the context, it understands what it needs to do before processing the information, allowing it to focus on relevant details.

For Q&A tasks with context, the optimal approach is to repeat the question before and after the context as following:

```
{{QUESTION}}

{{CONTEXT}}

{{QUESTION}}

{{ANSWER}}
```

## How to play with custom models instead?

If you'd like to experiment with different model sizes / quantization settings, here's a general list to find the various things you may need.

### RWKV-7 Models
- [Pile 0.5](https://huggingface.co/fla-hub/rwkv7-421M-pile)
- [Pile 1.5B](https://huggingface.co/fla-hub/rwkv7-1.47B-pile)
- [World 0.5B](https://huggingface.co/fla-hub/rwkv7-0.4B-world)
- [World 1.5B](https://huggingface.co/fla-hub/rwkv7-1.5B-world)
- [World 3B](https://huggingface.co/fla-hub/rwkv7-2.9B-world)

### RWKV-6 Models
- [RWKV-6 World](https://huggingface.co/BlinkDL/rwkv-6-world)
- [RWKV-6 Tunes](https://huggingface.co/BlinkDL/rwkv-6-misc)

### RWKV.cpp / RWKV.cpp cuda project

After downloading the desired model, you can quantize or convert them for running against the RWKV.cpp / RWKV-cpp-cuda project

- [RWKV.cpp](https://github.com/saharNooby/rwkv.cpp)
- [RWKV-cpp-cuda](https://github.com/harrisonvanderbyl/rwkv-cpp-cuda)

These projects are designed to run locally on either run CPU or GPU (or both) respectively.

::: tip
Despite the "cuda" name, rwkv-cpp-cuda does have vulkan support, so it could run on AMD GPUs
:::

### Chat client projects

The official RWKV chat project can be found here
- [ChatRWKV](https://github.com/BlinkDL/ChatRWKV)

### RWKV main repo

The main RWKV repo can be found here, use v7 to run current models
- [RWKV](https://github.com/BlinkDL/RWKV-LM/tree/main/RWKV-v7)

::: tip
For new users, we recommend using the RWKV.cpp project unless you plan to finetune because of the complexity involved with python dependencies.
:::

Interact with the model via the following CLI, if you have NPM installed:

### RWKV cpp node (slightly out of date)

- [RWKV-cpp-node CLI](https://www.npmjs.com/package/rwkv-cpp-node)

```bash
# Install globally, do not use NPX as it has known display issues
npm install -g rwkv-cpp-node

# Run the setup, and use the chat demo
rwkv-cpp-node
```
