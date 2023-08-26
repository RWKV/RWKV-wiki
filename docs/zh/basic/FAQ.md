# FAQ

:::tip
下面的问题翻译自英文版条目，需要针对中文使用者习惯进行补充。
:::

## RWKV 新模型何时发布？

RWKV 没有固定的发版周期，也没有这方面的承诺，BlinkDL（PENG Bo）随缘发布。所以从几天到几个月都是可能的。

另外，作为开源大模型，RWKV 的训练过程受 GPU 资源掣肘。好在 RWKV 项目有赞助者的慷慨资助，现今 RWKV 模型基本处于不断迭代中。

## RWKV 基于哪些数据集进行训练？

- RWKV 基础模型主要使用 [the pile](https://pile.eleuther.ai/)，结合了一些其它语言的语料
- RWKV raven 使用经过处理的 gpt4all 对基础模型进行微调
- RWKV world 在 the pile 和 [redpajamas](https://github.com/togethercomputer/RedPajama-Data) 上进行训练

## RWKV 模型会输出“对不起，作为一个AI模型，我不能……”吗？

RWKV 模型在绝大多数情景下不会出现类似 OpenAI GPT 的限制，如有需要请自行微调。

不过 RWKV 项目在处理 gpt4all 训练集时难免会有遗漏，所以有些情景下依然有可能输出。

## 为何模型文件名里有“ctx4096”“ctx8192”之类的字样？ 

虽然 RWKV 可以进行任意长度推断，由于外推问题，在保证效果的前提下推断长度不能超过训练长度。

模型名中的“ctx”指训练时的输入长度，在这个长度以内的推断可以使模型发挥一般性你。当推断长度超过标明数值时，模型性能会大幅下降。

训练更长 ctx 的模型是完全可行的，这也是为什么 RWKV 在工程上可以视作“无限”长度推断。

## RWKV 使用什么开源许可证（协议）？

RWKV 源代码和模型参数采用 Apache 2.0 开源许可证，可以同时适用于商业和非商业用途。

## RWKV discord 机器人怎么用？


RWKV.cpp and the RWKV discord 聊天机器人支持一些特殊指令。

考虑到适用范围和更新周期，详细介绍请看英文原版条目。

## 我该从哪里了解模型架构？

请参考[模型介绍](../advance/architecture.md)

## 我自己从头训练 >20B RWKV 模型（也包含其它大语言模型），需要准备什么？

> TLDR: 准备一座煤矿，房地产也行；或者给自己准备200年阳寿

由于微调技术的发展给人带来一种“大语言模型训练飞入寻常百姓家”的错觉，绝大多数人似乎完全低估了从头训练一个大语言模型有多大的开销。

训练一个大语言模型的成本来自很多方面，最主要的有语料数量、模型大小和训练时长控制。除此之外你还得考虑试错成本（必然会发生）还有人力成本（如标注高质量语料，配置并行训练环境等）。

为了筹备这些要素，你还需要钱，很多很多的钱。这些全都是成本，而且会**直接影响**大语言模型的最终性能。举个例子：据估计，LLaMA2 [仅仅是从头训练 70B 基础模型就消耗了近 200 万亿 Token 的语料，耗费近 200 万 GPU 小时](https://twitter.com/moinnadeem/status/1681393075367841792)！

为了照顾数感不好的朋友，我们来算一笔账：根据[原始论文](https://arxiv.org/pdf/2307.09288.pdf)，LLaMA2 在 A100-80GB 上进行训练，从 2023 年 1 月开始训练，到 2023 年 7 月训练结束，耗期 6 月（这差不多也是一般人能接受的训练时长极限），由木桶原理易知这也是 70B 模型的训练时间。
- 较准确的总 GPU 时间为 1,720,320 小时（A100），折合约 196 年，考虑到显存限制所带来的 Swap 损耗，这个时间只会更长。**显然这个时间完全不可接受。**
- 为了在 6 个月内训练完成，你需要使用多块 A100，忽略并行通信带来的损耗，你需要至少 1,720,320 / 4,320 ≈ 400 块 A100-80GB 显卡。
- A100-40GB 显卡需要复杂的模型并行和 Swap 才能装下 20B 以上的模型训练信息，实现过于复杂且效率低下，这里只考虑数据并行和简单的模型并行，也就是说只能使用 A100-80GB。
- 考虑到市场稀缺和批发减价，这里参考 [Amazon 价格](https://www.amazon.com/Nvidia-Memory-Graphics-Ampere-Architecture/dp/B0BS56B54P)，一块 A100-80GB 显卡价格约 $17,000。
- 也就是说，为了完成时长可以接受的训练，仅显卡花费就需要约 6,800,000 美元，（截至2023年8月末）折合人民币约**伍仟万元**！

> 能不能再给力一点啊，老师？

那如果不自己购买 A100 显卡，而是使用现成的云服务，那么这个价格还能稍微压低一些：
- 以国内较为划算的 autodl 平台计算。
- 按照 autodl 会员价，A100-80GB 训练价格约为 6.68 元/GPU时。
- 总 GPU 时间为 1,720,320 小时，并行策略同上。
- 则总费用约为 **1150 万元**，确实比自己买 A100 省不少！

这还只是考虑到控制大参数量模型训练时长所必需的 GPU 费用，并未将其它成本计算在内。

考虑到 RWKV 低能耗和运算速度快的优点，训练同参数量的 RWKV 模型按照激进估计也需要 1150 / 5 ≈ 230 万元。

这已经超出中国 99% 人口的承担能力。

> 能不能再给力一点啊，老师？

很难。如果我们考虑用 Swap 的方案去训练，你需要 **196 年** 的时间等待训练完成——这还是在一遍过的情况下，完全不考虑试错成本。

---

最后，经过一系列复杂论证，我们得到了一个较为合理的结论：
* 要么，准备一座煤矿，房地产也行，来支撑高昂的训练费用；
* 要么，准备200年阳寿，来等待漫长的训练时间；
* 更为合理的是中间态，**然而当你终于训练完自己的模型时，RWKV 恐怕已经迭代到 v10 了。**

> 正因如此，如果您可以贡献您所在科研机构（还有开源训练组织等）的 GPU 时间给 RWKV 项目，我们将不胜感激！😉（积土成山，风雨兴焉，即使一点 GPU 时间也能帮助我们很多！）