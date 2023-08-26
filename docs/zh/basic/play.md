# 如何使用 Raven 模型?

## 在线示例

如果你只是想试一试 RWKV Raven，你可以使用下面的在线应用。

- [7B Public Demo](https://huggingface.co/spaces/BlinkDL/Raven-RWKV-7B)
- [14B Public demo](https://huggingface.co/spaces/BlinkDL/ChatRWKV-gradio)

::: tip
在线应用的聊天功能已被禁用
:::

## 本地运行推荐步骤

如果你不熟悉 Python 和 Hugging face，你可以使用下面的傻瓜式应用：

- [RWKV Runner](https://github.com/josStorer/RWKV-Runner)
    - [安装程序（请阅读 README 说明）](https://github.com/josStorer/RWKV-Runner/releases/)

[![RWKV Runner Demo](/img/rwkv-runner-demo.png)](https://github.com/josStorer/RWKV-Runner)

或者如果你安装了 NPM，也可以使用下面的 CLI（新手不推荐）：

- [RWKV-cpp-node CLI](https://www.npmjs.com/package/rwkv-cpp-node)

```bash
# Install globally, do not use NPX as it has known display issues
npm install -g rwkv-cpp-node

# Run the setup, and use the chat demo
rwkv-cpp-node
```

# RWKV Prompt 工程指南

相较于 transformer 模型，RWKV 对 prompt 非常敏感，因为 RWKV 缺乏回溯能力。

因此，**不要**使用以下写法：

```
{{CONTEXT}}

{{INSTRUCTION}}

{{ANSWER}}
```

而是**应该使用**以下的 Prompt 格式：

```
{{INSTRUCTION}}

{{CONTEXT}}

{{ANSWER}}
```

这是为什么呢？通俗来讲，你可以想象自己是一场语言考试的考官，语言模型是考生。 Transformer 模型是写在纸上让它笔试，而 RWKV 则是听力考试，你是在将题目读给语言模型。

如果你没有事先告诉模型题目要求是什么，模型不知道如何应对材料，它就会错过材料里的关键部分，从而影响答题。但如果你事先告诉语言模型题目要求，它就会知道如何按题目要求分析文段，就像大多数人在英语听力考试里做的那样。

对于问答任务，最好是将问题在材料前后重复一遍：

```
{{QUESTION}}

{{CONTEXT}}

{{QUESTION}}

{{ANSWER}}
```

## 如何调优？

如果上面新手指南不能满足你进一步的需求（如使用不同参数量模型、调整量化设置等），那么请看这章。

### 指令微调模型下载
- [Raven](https://huggingface.co/BlinkDL/rwkv-4-raven/tree/main)

### 基础模型下载
- [Pile 7B](https://huggingface.co/BlinkDL/rwkv-4-pile-7b)
- [Pile 14B](https://huggingface.co/BlinkDL/rwkv-4-pile-14b)
- [PilePlus models](https://huggingface.co/BlinkDL/rwkv-4-pileplus)
- [RWKV World](https://huggingface.co/BlinkDL/rwkv-4-world)

::: tip
强烈建议使用指令微调模型，除非你知道自己在做什么
:::

### RWKV.cpp / RWKV.cpp cuda

下载完模型后，你可以使用 RWKV.cpp / RWKV-cpp-cuda 项目进行量化。

- [RWKV.cpp](https://github.com/saharNooby/rwkv.cpp)
- [RWKV-cpp-cuda](https://github.com/harrisonvanderbyl/rwkv-cpp-cuda)

这些项目专门设计用于本地推断，不需要 Python 或 Hugging face，不能用于训练，可以在 CPU 和 GPU 上运行。

::: tip
RWKV-cpp-cuda 项目支持 Vulkan，这意味着 AMD 显卡也可使用。
:::

### RWKV 移动端

- [AltaeraAI : Android RWKV（需要一定命令行知识）](https://altaera.ai/)

### 聊天程序

官方项目：
- [ChatRWKV](https://github.com/BlinkDL/ChatRWKV)

### RWKV 主项目

当前模型使用 v4neo。
- [RWKV](https://github.com/BlinkDL/RWKV-LM/tree/main/RWKV-v4neo)

::: tip
新用户强烈建议使用前面介绍的工具，除非你知道自己在做什么（如进行微调）
:::
