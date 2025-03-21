# Prompting Format Guidelines

**RWKV is a variant of RNN, and it is more sensitive to prompt formats compared to Transformer-based models.**

RWKV is more suitable for two prompt formats: QA and Instruction.

## QA Format

```markdown copy
User: (Your question, e.g., "Please recommend three world famous novels suitable for five - year - old children.")

Assistant:
```
::: tip
The QA (Question - Answer) format is the default training format for RWKV.

Here, `User:` represents the question asked by the user, and `Assistant:` represents the answer from the model. Therefore, we need to leave a blank after the **last** `Assistant:` to let the model continue writing.
:::

## Instruction Format

```markdown copy
Instruction: Please translate the following Swedish into Chinese.

Input: hur lång tid tog det att bygga twin towers

Response:
```

`Instruction:` is the instruction given by the user to the model, `Input:` is the input provided by the user to the model, and `Response:` is the answer from the model.

Leave a blank after `Response:` to let the model continue writing.

::: warning
**Should not swap the positions of `Instruction:` and `Input:`**
:::
Due to the architectural design, RWKV has a relatively weak "recall" ability. If the RWKV model first receives the material content (Input) and then the instruction (Instruction), it may miss important information in the content when executing the instruction.

However, if you first tell the model **what instruction to execute** and then give the model **the input material content**, the model will first understand the instruction and then process the material content based on the instruction. Just like this:

```markdown copy
Instruction: Summarize the following material text in one sentence.

Input: On February 22, 2025, the RWKV project held a developer conference themed "RWKV - 7 and Future Trends" in Caohejing, Shanghai, China. Developers, industry experts, and technological innovators from all over the country gathered together —— from well - known university laboratories to cutting - edge startup teams. The innovative energy on - site confirmed the excellent performance and far - reaching significance of RWKV - 7.
During the RWKV developer conference, 10 guests from academia, enterprises, and the RWKV open - source community brought in - depth sharing for developers, and the on - site audience interacted enthusiastically with the guests. For example, Yang Kaicheng from DeepGlint presented "RWKV - CLIP: A Robust Vision - Language Representation Learner", Hou Haowen from Guangming Laboratory presented "VisualRWKV: A Vision - Language Model Based on RWKV", Cheng Zhengxue from Shanghai Jiao Tong University presented "L3TC: Efficient Multimodal Data Compression Based on RWKV", Jiang Juntao from Zhejiang University presented "RWKV - Unet: Improving Medical Image Segmentation Results with Long - Distance Collaboration", etc.
During the conference, other AI enterprises also highly praised RWKV - 7, believing that it redefined the economic formula of AI infrastructure. The participants were also deeply touched by the demonstration of RWKV application results. Meanwhile, RWKV Yuanzhi Intelligence also shared RWKV - 7 and related demo presentations with thousands of developers at the 2025 Global Developer Conference.

Response:
```

Reference response:

``` text copy
The RWKV developer conference in Caohejing, Shanghai, China on February 22, 2025, attracted 10 guests from academia, enterprises, and the RWKV open-source community. The conference showcased the latest developments in RWKV-7 and its future trends. The on-site audience interacted with the guests and were impressed by the innovative energy on-site. The conference also featured presentations from other AI enterprises praising RWKV-7's redefinition of economic formula for AI infrastructure.
```

## Few-Shot Prompting

For some Q&A tasks with context, we recommend repeating a few similar questions ([few-shot](https://en.wikipedia.org/wiki/Few-shot_learning)) before the prompt to enable in-context learning for the model.

``` text copy
{{QUESTION}}

{{CONTEXT}}

{{QUESTION}}

{{ANSWER}}
```
As shown below:

```markdown copy
User: Translate "hello, I love you." into Chinese.

Assistant: 你好，我爱你。

User: Translate "how are you?" into Chinese.

Assistant: 你好吗？

User: Translate "I am fine, thank you." into Chinese.

Assistant:
```


