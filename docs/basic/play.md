# How to play with the Raven model?

If you simply want to give the RWKV Raven a try, you can try the following public demos.

- [7B Public Demo](https://huggingface.co/spaces/BlinkDL/Raven-RWKV-7B)
- [14B Public demo](https://huggingface.co/spaces/BlinkDL/ChatRWKV-gradio)

> PS: Chat is disabled in the above public demo

If you are not familiar with python or hugging face, you can install chat models locally with any of the following

- [RWKV Runner Project](https://github.com/josStorer/RWKV-Runner)
    - [exe installer download](https://github.com/josStorer/RWKV-Runner/releases/tag/v1.1.5)

- [RWKV node CLI](https://www.npmjs.com/package/rwkv-cpp-node)

```bash
# Install globally, do not use NPX as it has known display issues
npm install -g rwkv-cpp-node

# Run the setup, and use the chat demo
rwkv-cpp-node
```

# How to play with custom models instead?

If the above "guided" setups are not what you are looking for, and you want to experiment with different model sizes / quantization settings. The following are the general list to find the various things you may need.

## Base Models download
- [Pile 7B](https://huggingface.co/BlinkDL/rwkv-4-pile-7b)
- [Pile 14B](https://huggingface.co/BlinkDL/rwkv-4-pile-14b)
- [PilePlus models](https://huggingface.co/BlinkDL/rwkv-4-pileplus)
- [RWKV World](https://huggingface.co/BlinkDL/rwkv-4-world)

## Instruction trained models
- [Raven](https://huggingface.co/BlinkDL/rwkv-4-raven/tree/main)

## RWKV.cpp / RWKV.cpp cuda project

After downloading the desired model, you can quantize or convert them for running against the RWKV.cpp / RWKV-cpp-cuda project

- https://github.com/saharNooby/rwkv.cpp
- https://github.com/harrisonvanderbyl/rwkv-cpp-cuda

These projects are designed to run locally, without the need of python or hugging face. And can be ranned on CPU or GPU (or both) respectively

> PS: Despite the "cuda" name, rwkv-cpp-cuda does have vulkan support, meaning it can run on AMD GPU's
