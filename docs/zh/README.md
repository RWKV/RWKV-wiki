> RWKV Wiki 中文版正处于翻译阶段，有很多文本尚未翻译完，需要有志之士的深入参与。
> 
> 如能帮助翻译和完善工作，编者将不胜感激。
> 
> @TODO 翻译英文wiki


![RWKV raven avartar](../img/rwkv-avartar-256p.png)

# RWKV 语言模型

**RWKV**（读作 RwaKuv）是一个同时具有 RNN 和 GPT 级别训练和推断性能的 LLM（大型语言模型）架构。

它同时具备 RNN 和 Transformer 的特点，如：生成质量高、推断时间短、训练速度快、节省显存、“无限”长度、低成本文本 Embedding……

但 RWKV **没有用到 Attention**。

RWKV 现版本为 RWKV 4，另 RWKV 5 正在开发中。

- [Discord 服务器](https://discord.gg/bDSBUMeFpc)
- [14B demo](https://huggingface.co/spaces/BlinkDL/ChatRWKV-gradio)
- [7B demo](https://huggingface.co/spaces/BlinkDL/Raven-RWKV-7B)

# RWKV 架构论文

[![RWKV 论文 cover](../img/RWKV-paper.png)](https://arxiv.org/abs/2305.13048)
- [arXiv (2305.13048) 论文](https://arxiv.org/abs/2305.13048)

# 与已有 Transformer 模型的简要对比

**优点**
+ 低训练和推断成本（VRAM、CPU、GPU等）
+ 随文本长度具有线性复杂度（Transformer 为平方复杂度）
+ 在回答能力和质量上足够好
+ 相比其它开源 LLM，RWKV 在其它语言上（如汉语、日语等）训练更为彻底
+ [节能](https://ml.energy/leaderboard)，能效比（J/token）略低于同参数量的 Llama

**缺点**
+ 对 Prompt 相当敏感，不当 Prompt 工程会损害模型性能
    + 相比基于 Attention 的模型，对需要回溯的任务表现更差，使用时要注意 Prompt 语序
    + 正确示例：
      > 请缩写以下文段：
      > 
      > 我们家的后园有半亩空地，母亲说：“让它荒着怪可惜的，你们那么爱吃花生，就开辟出来种花生吧。”我们姐弟几个都很高兴，买种，翻地，播种，浇水，施肥，没过几个月，居然收获了。
    + 错误示例：
      > 我们家的后园有半亩空地，母亲说：“让它荒着怪可惜的，你们那么爱吃花生，就开辟出来种花生吧。”我们姐弟几个都很高兴，买种，翻地，播种，浇水，施肥，没过几个月，居然收获了。
      > 
      > 请缩写以上文段。
+ “无限”长度推断尚不能做到真正无限
    + 外推性（指推断长度超过训练长度时模型保持性能的泛化能力）较差，但外推问题属于现今 LLM 通病。

# RWKV 常用术语表速查

- **RWKV** - 模型架构本身，源代码位于 [https://github.com/BlinkDL/RWKV-LM](https://github.com/BlinkDL/RWKV-LM)
- **Base model / Pile Plus Model** - 基于 RWKV 架构的基础模型，使用 The Pile 数据集训练，辅以其它数据集，没有经过指令微调，不应作为对话或文学模型使用
- **Raven** - 对基础模型的指令微调版本，可用于绝大多数情景
- **RWKV World** - 次世代基础模型，训练集基于更广泛的多语言语料（包含超过100种语言），未经指令微调
- **Raven World** - RWKV World 的指令微调版本
- **RWKV 5** - RWKV 架构的下一代版本，尚未正式发布
