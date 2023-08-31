# 微调

## 使用 LoRA 微调

::: tip
在进行本章操作前，你应该知道自己在做什么。否则，请参阅 [开始使用](/zh/basic/play.md)。

对于绝大多数普通需求，Prompt 工程足矣，无需进行微调。
:::

以下是详细的 [LoRA](https://arxiv.org/abs/2106.09685) 微调指南：
- [https://zhuanlan.zhihu.com/p/638326262](https://zhuanlan.zhihu.com/p/638326262)
- [https://mysymphony.jp.net/a/rwkv-character/（英文版）](https://mysymphony.jp.net/a/rwkv-character/)

下面是一些常用的 LoRA 训练程序实现：

- [https://github.com/m8than/RWKV-LM-LoRA](https://github.com/m8than/RWKV-LM-LoRA)
- [https://github.com/Blealtan/RWKV-LM-LoRA](https://github.com/Blealtan/RWKV-LM-LoRA)

强烈建议在训练前将训练集转换为二进制格式，下面是转换工具的项目链接。

- [https://github.com/Abel2076/json2binidx_tool](https://github.com/Abel2076/json2binidx_tool)

> 大多数微调脚本都可以支持 World 模型，但训练前需要调整为使用 World tokenizer 和 json2binidx。

## 全量微调

使用官方提供的训练程序即可进行微调，也可以使用上面的 LoRA 版本，只需关闭 LoRA 即可：

- [https://github.com/BlinkDL/RWKV-LM/tree/main/RWKV-v4neo](https://github.com/BlinkDL/RWKV-LM/tree/main/RWKV-v4neo)

## 预训练

:::tip
吃力不讨好，[没有 A100 显卡的用户慎选](/zh/basic/FAQ.md#我自己从头训练-20b-rwkv-模型-也包含其它大语言模型-需要准备什么)。
:::

直接使用官方模型代码即可。

- [https://github.com/BlinkDL/RWKV-LM/](https://github.com/BlinkDL/RWKV-LM/)

## 显存消耗估计

要微调 RWKV 模型，您大概需要下列显存容量：

- **1.5b** : 15gb
- **3b** : 24gb
- **7b** : 48gb
- **14b** : 80gb

请记住这只是简单估计，如果你想要多快好省地微调，那么你需要更大显存。

在使用 LoRA 的同时结合 DeepSpeed 技术，可以得到小于上述一半估计的显存占用。

## 依赖问题

下面是在 Ubuntu 20.04 上的一个环境安装示例，可供参考。

```bash
# Make sure haveged, ninja and python itself is installed
sudo apt-get install -y haveged ninja-build python3-pip python-is-python3

# Check if you have nvidia-smi working
nvidia-smi

# If nvidia SMI is not working: you will need the following steps to install nvidia drivers
# sudo apt install -y  nvidia-driver-515 nvidia-dkms-515

# If conda is not installed, see its instructions online to install it
# https://www.anaconda.com/download#downloads

# Update conda
conda update conda

# You might need to reinit for your shell
conda init bash

# Create and activate the conda env
conda create -y --name rwkv_4neo python=3.10
conda activate rwkv_4neo

# Install cuda toolkits
conda install -y -c conda-forge cudatoolkit=11.7 cudatoolkit-dev=11.7 

# Setting up pytorch 1.13.1 with cuda 1.17 specifically
python -m pip install torch==1.13.1+cu117 torchvision==0.14.1+cu117 torchaudio==0.13.1 --extra-index-url https://download.pytorch.org/whl/cu117
python -m pip install deepspeed==0.7.0 pytorch-lightning==1.9
python -m pip install ninja wandb transformers
```
