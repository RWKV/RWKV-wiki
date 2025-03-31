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

To fine-tune the RWKV model, you need:

- prepare **a Linux system** and basic knowledge of Linux
- prepare a **high-performance NVIDIA graphics card**
- configure a **virtual environment and software packages** for training the RWKV model in the Linux system
- prepare a **dataset** for fine-tuning training

## VRAM Requirements for RWKV-PEFT Fine-tuning Methods

::: tip
Below are the VRAM requirements for various RWKV-PEFT fine-tuning methods with different training precisions. Our tests were conducted on an RTX 4090 GPU with 24GB of VRAM.
:::

### VRAM Requirements for RWKV-7 Fine-tuning

::: tabs

@tab State tuning
**VRAM requirements for [State tuning](./State-Tuning.mdx) of RWKV-7 models:**

| Model Size | bf16  | int8 quantization | nf4 quantization |
|------------|---------|--------|--------|
| RWKV7-0.1B | 2.6GB GPU   | 2.4GB GPU  | 2.5GB GPU  |
| RWKV7-0.4B | 3.1GB GPU   | 2.9GB GPU  | 2.8GB GPU  |
| RWKV7-1.5B | 5.3GB GPU   | 4.1GB GPU  | 3.7GB GPU  |
| RWKV7-3B   | 8.2GB GPU   | 5.7GB GPU  | 4.7GB GPU  |

@tab LoRA
**VRAM requirements for [LoRA fine-tuning](./LoRA-Fine-Tuning.mdx) of RWKV-7 models:**

| Model Size | bf16  | int8 quantization | nf4 quantization |
|------------|---------|--------|--------|
| RWKV7-0.1B | 2.7GB GPU   | 2.5GB GPU  | 2.4GB GPU  |
| RWKV7-0.4B | 3.4GB GPU   | 2.9GB GPU  | 2.7GB GPU  |
| RWKV7-1.5B | 5.6GB GPU   | 4.6GB GPU  | 3.9GB GPU  |
| RWKV7-3B   | 8.8GB GPU   | 6.7GB GPU  | 5.7GB GPU  |

@tab DiSHA
**VRAM requirements for [DiSHA fine-tuning](./DiSHA-Fine-Tuning.mdx) of RWKV-7 models:**

| Model Size | bf16  | int8 quantization | nf4 quantization |
|------------|---------|--------|--------|
| RWKV7-0.1B | 2.7GB GPU   | 2.5GB GPU  | 2.4GB GPU  |
| RWKV7-0.4B | 3.1GB GPU   | 2.9GB GPU  | 2.7GB GPU  |
| RWKV7-1.5B | 5.6GB GPU   | 4.5GB GPU  | 3.9GB GPU  |
| RWKV7-3B   | 8.8GB GPU   | 6.7GB GPU  | 5.7GB GPU  |

@tab PiSSA
**VRAM requirements for [PiSSA fine-tuning](./Pissa-Fine-Tuning.mdx) of RWKV-7 models:**

| Model Size | bf16  | int8 quantization | nf4 quantization |
|------------|---------|--------|--------|
| RWKV7-0.1B | 2.6GB GPU   | 2.5GB GPU  | 2.4GB GPU  |
| RWKV7-0.4B | 3.4GB GPU   | 3.0GB GPU  | 2.7GB GPU  |
| RWKV7-1.5B | 5.6GB GPU   | 4.6GB GPU  | 3.9GB GPU  |
| RWKV7-3B   | 8.8GB GPU   | 6.7GB GPU  | 5.7GB GPU  |

:::

### VRAM Requirements for RWKV-6 Fine-tuning

RWKV-6 models require slightly more VRAM for fine-tuning compared to RWKV-7. The following VRAM requirements are for reference:

|   Model Size   | Full Fine-tuning | DiSHA/LoRA/PISSA  | QLoRA/QPissa | State tuning |
| --------- | ---- | ---- | ---- | ---- |
| RWKV6-1.6B | OOM | 7.4GB GPU | 5.6GB GPU | 6.4GB GPU |
| RWKV6-3B | OOM  | 12.1GB GPU | 8.2GB GPU | 9.4GB GPU |
| RWKV6-7B | OOM  | 23.7GB GPU(batch size 8 causes OOM) | 14.9GB GPU(batch size 8 requires 19.5GB) | 18.1GB GPU |

## Recommended fine-tuning repositories

- [RWKV-PEFT](https://github.com/JL-er/RWKV-PEFT): RWKV-PEFT is the official implementation for efficient parameter fine-tuning of RWKV models, supporting various advanced fine-tuning methods across multiple hardware platforms.
- [OpenMOSE/RWKV-LM-RLHF](https://github.com/OpenMOSE/RWKV-LM-RLHF): Reinforcement Learning Toolkit for RWKV.(v6,v7,ARWKV) Distillation,SFT,RLHF(DPO,ORPO)

read the tutorials for different fine-tuning methods of RWKV-PEFT:

- [State Tuning](./State-Tuning.md)
- [Pissa Fine-Tuning](./Pissa-Fine-Tuning.md)
- [DiSHA Fine-Tuning](./DiSHA-Fine-Tuning.md)
- [LoRA Fine-Tuning](./LoRA-Fine-Tuning.md)
