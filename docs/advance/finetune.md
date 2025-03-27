# Fine-tuning

::: tip
You are generally expected to know what you are doing, if you are attempting to finetune RWKV with LoRa. If you are new to RWKV, you are adviced to play with the base model first, before attempting to finetune with LoRa.

In many cases what most people want to achieve can be done with tuning their prompts, which is much easier then finetuning.
:::

## Why Fine-tune the RWKV Model?

Currently, all the publicly released RWKV models are base models (also known as pre-trained models). These base models are trained on large-scale datasets in fields such as natural language processing and possess strong generalization ability and rich knowledge reserves.

However, to maintain generalization ability and universality, the RWKV base model is not optimized for a specific type of task. Therefore, the performance of the RWKV model on certain specific tasks may not be satisfactory.

Fine-tuning the RWKV model, simply put, means retraining the RWKV model using high-quality datasets from specific domains (such as law, literature, medicine, etc.) or tasks (such as material summarization, novel continuation, etc.). The fine-tuned RWKV model will exhibit higher-quality and more stable performance on the corresponding tasks.

Compared with training a brand-new model from scratch, fine-tuning only requires adjusting the parameters of the pre-trained model to achieve satisfactory task results, which requires fewer training cycles and less computing resources.

In summary, we can optimize the performance of the RWKV model on various tasks through fine-tuning, thereby quickly building application scenarios and implementing applications based on the RWKV model.

## What Do I Need to Prepare for Fine-tuning Training?

To fine-tune the RWKV model, you need to 

- prepare **a Linux system** and basic knowledge of Linux
- prepare a **high-performance NVIDIA graphics card**
- configure a **virtual environment and software packages** for training the RWKV model in the Linux system
- prepare a **dataset** for fine-tuning training

## VRAM Requirements for Fine-tuning

The following is a reference for fine-tuning models with consumer-grade graphics cards (4090 or lower):

| Model Size | Full-parameter Fine-tuning | LoRA/Pissa | QLoRA/QPissa | State Tuning |
| --------- | ---- | ---- | ---- | ---- |
| RWKV6-1.6B | Out of VRAM | 7.4GB GPU | 5.6GB GPU | 6.4GB GPU |
| RWKV6-3B | Out of VRAM | 12.1GB GPU | 8.2GB GPU | 9.4GB GPU |
| RWKV6-7B | Out of VRAM | 23.7GB GPU (out of VRAM at batch size 8) | 14.9GB GPU (19.5GB required at batch size 8) | 18.1GB GPU |

## Recommended fine-tuning repositories

- [RWKV-PEFT](https://github.com/JL-er/RWKV-PEFT): RWKV-PEFT is the official implementation for efficient parameter fine-tuning of RWKV models, supporting various advanced fine-tuning methods across multiple hardware platforms.
- [OpenMOSE/RWKV-LM-RLHF](https://github.com/OpenMOSE/RWKV-LM-RLHF): Reinforcement Learning Toolkit for RWKV.(v6,v7,ARWKV) Distillation,SFT,RLHF(DPO,ORPO)

read the tutorials for different fine-tuning methods of RWKV-PEFT:

- [State Tuning](./State-Tuning.md)
- [Pissa Fine-Tuning](./Pissa-Fine-Tuning.md)
- [DiSHA Fine-Tuning](./DiSHA-Fine-Tuning.md)
- [LoRA Fine-Tuning](./LoRA-Fine-Tuning.md)
