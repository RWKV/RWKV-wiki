# RWKV 架构

::: tip
本条目仅供有一定深度学习基础的人士查看。
:::

## 背景介绍

循环神经网络（RNN）是一种人工神经网络的基本形式，通过一个不断更新的隐藏状态依次处理每个 Token。

![Classic RNN digram](../../img/classic-RNN.png)

当每个 Token 参与处理时，它会被反馈进 RNN 的状态中，用于之后 Token 的处理。隐藏状态可以被视为 RNN 的“记忆”。

RWKV 可以被写作一种 RNN。

## RWKV 与传统 RNN 相比有什么不同？

传统 RNN 是完全串行的，使其难以在 GPU 上并行化，导致在大训练集上不易训练。

![Digram showing the flow of the hiddenstates](../../img/rwkv-hidden-state-flow.png)

RWKV 缓解了该问题，其 RNN 部分较为轻量，且分为多层，使得在 GPU 上计算较为容易。

下面的动图显示了 3 层 RWKV 在 GPU 上对 25 个 Token 进行前向传播的运行过程。

![Digram showing the RWKV parallel cascading pattern, in transformer mode, generated via https://jsfiddle.net/buLswgem/31/ ](../../img/rwkv-cascading-pattern.gif)

可以看到该网络可以像 Transformer 一样运行，这使得它可以“像Transformer一样”进行训练，并且“像RNN一样”执行。

为达成这些，RWKV 使用了 Token shifting、Channel-mix 和 Time-mix 层。

## Token shifting、Channel-mix 和 Time-mix 层

Channel-mix 层用于将前一层各通道分量的状态混合转换为该层输出，属于全连接前馈网络。它将不同记忆通道的输出进行整合，得到一个综合的状态。

Time-mix 层在各个通道上运作，按不同的记忆衰减速率保留之前 Token 的信息，属于循环神经网络。记忆衰减速率属于训练参数，由训练过程决定，这意味着记忆有可能不会衰减（即衰减速率为0）。

Token shifting 层提供关于相邻 Token 的强归纳偏置，使 RWKV 拥有 [Induction head](https://arxiv.org/abs/2209.11895)，增强上下文学习能力。

通过不同形式的信息整合和衰减，RWKV 获得了类似自注意力机制的能力。随着 Token 输入，关键信息在多层间流动，并按照不同方面的重要性存储在不同通道的状态中。

> PS：上述仅为简单科普，详情请看下面链接

## 无内鬼，来份 RWKV 技术细节

可以直接查看 [150 行 RWKV 示例](https://github.com/BlinkDL/ChatRWKV/blob/main/RWKV_in_150_lines.py)，它详细展示了 RWKV 的主要原理。

也可以参考 [RWKV 论文](https://arxiv.org/abs/2305.13048)，可对照[这个论文解说视频](https://www.bilibili.com/video/BV1b8411Z7Df)辅助理解。

一些计算细节可以参考这篇英文博客：[RWKV Language Model Math](https://ben.bolte.cc/rwkv-model)

**辅助链接资源**
- RWKV 旧版设计思路：[https://zhuanlan.zhihu.com/p/514840332](https://zhuanlan.zhihu.com/p/514840332)
- RWKV 数学（英文）: [https://ben.bolte.cc/rwkv-model](https://ben.bolte.cc/rwkv-model)
- RWKV 解释（英文）: [https://fullstackdeeplearning.com/blog/posts/rwkv-explainer/](https://fullstackdeeplearning.com/blog/posts/rwkv-explainer/)
- RWKV 工作原理（英文）: [https://johanwind.github.io/2023/03/23/rwkv_details.html](https://johanwind.github.io/2023/03/23/rwkv_details.html)
- RWKV 训练开销（英文，已过时）: [https://johanwind.github.io/2023/03/23/rwkv_overview.html](https://johanwind.github.io/2023/03/23/rwkv_overview.html)
