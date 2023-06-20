# Fine tuning

## Fine tuning with LoRa

::: tip
You are generally expected to know what you are doing, if you are attempting to finetune RWKV with LoRa. If you are new to RWKV, you are adviced to play with the base model first, before attempting to finetune with LoRa.

In many cases what most people want to achieve can be done with tuning their prompts, which is much easier then finetuning.
:::

For a complete guide on finetuning with lora, you can find it at
- [https://mysymphony.jp.net/a/rwkv-character/](https://mysymphony.jp.net/a/rwkv-character/)
- [https://zhuanlan.zhihu.com/p/638326262 (blinks guide to finetuning in chinese)](https://zhuanlan.zhihu.com/p/638326262)

For finetuning with LoRa, use either of the following LoRa implementation

- [https://github.com/m8than/RWKV-LM-LoRA](https://github.com/m8than/RWKV-LM-LoRA)
- [https://github.com/Blealtan/RWKV-LM-LoRA](https://github.com/Blealtan/RWKV-LM-LoRA)

For best performance, it is adviced to convert your dataset to a binary format first.

- [https://github.com/Abel2076/json2binidx_tool](https://github.com/Abel2076/json2binidx_tool)

## Fine tuning without LoRa

Alternatively, you can use the official repo, to finetune the project without LoRa (or the above LoRa projects, without the LoRa flags)

- [https://github.com/BlinkDL/RWKV-LM/tree/main/RWKV-v4neo](https://github.com/BlinkDL/RWKV-LM/tree/main/RWKV-v4neo)

## Training a model from scratch?

Refer to the main project

- [https://github.com/BlinkDL/RWKV-LM/](https://github.com/BlinkDL/RWKV-LM/)

## How much GPU vRAM do you need?

The following is the rough estimate on the minimum GPU vram you will need to finetune RWKV

- **1.5b** : 15gb
- **3b** : 24gb
- **7b** : 48gb
- **14b** : 80gb

Note that you probably need more, if you want the finetune to be fast and stable

With LoRa & DeepSpeed you can probably get away with 1/2 or less the vram requirements.

## Resolving Python dependency issues

If you have issues with python dependencies, you can try the following for a clean setup on Ubuntu 20.04 on an AWS instance

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
