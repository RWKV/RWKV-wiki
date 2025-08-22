# DiSHA Fine-Tuning Tutorial

::: info What is DiSHA Fine-Tuning?

[DiSHA Fine-Tuning](https://arxiv.org/abs/2409.15371v8) (Dimension-Sharding Adaptation) is a novel parameter-efficient fine-tuning method (PEFT, Parameter-Efficient Fine-Tuning), aiming to further reduce the number of trainable parameters while accelerating convergence.

The DiSHA fine-tuning framework expands the design space of PEFT by introducing two core computational structures: Block Affine Efficient Computation (Bone) and Block Affine Transformation (Bat). The Bone structure significantly improves computational efficiency while maintaining high performance, and Bat overcomes the possible collinearity problems in some DiSHA variants through non-linear transformation, thus enhancing the model's capabilities.

Experimental results show that DiSHA and its Bone structure outperform LoRA and its variants in terms of evaluation metrics, computational efficiency, and resource usage.

![different-between-lora-disha-and-bone.png](./imgs/different-between-lora-disha-and-bone.png)

:::
---

The DiSHA fine-tuning method in this article comes from the RWKV community fine-tuning project [RWKV-PEFT](https://github.com/JL-er/RWKV-PEFT).

Before starting the DiSHA fine-tuning, make sure you have a Linux workspace and an NVIDIA graphics card that supports CUDA.

## DiSHA Fine-Tuning VRAM Reference

The GPU VRAM requirements for RWKV DiSHA fine-tuning can be referred to in the following table:
::: tabs
@tab RWKV-7

| Model Parameters | bf16  | int8 | nf4 |
| --------- | ---- | ---- | ---- |
| RWKV7-0.1B | 2.7GB GPU  | 2.5GB GPU  | 2.4GB GPU  |
| RWKV7-0.4B | 3.1GB GPU  | 2.9GB GPU  | 2.7GB GPU  |
| RWKV7-1.5B | 5.6GB GPU  | 4.5GB GPU  | 3.9GB GPU  |
| RWKV7-2.9B | 8.8GB GPU  | 6.7GB GPU  | 5.7GB GPU  |

@tab RWKV-6

| Model Parameters | bf16  | int8 | nf4 |
| --------- | ---- | ---- | ---- |
| RWKV-6-1.6B | 7.3GB  | 5.9GB  | 5.4GB  |
| RWKV-6-3B  | 11.8GB  | 9.4GB  | 8.1GB  |
| RWKV-6-7B | 23.7GB| 17.3GB | 14.9GB  |

:::
The data in the above table is based on the following training parameters:

- ctxlen=1024
- micro_bsz=1
- strategy=deepspeed_stage_1
- disha_config='\{"mode":"bone","load":"","r":64\}'

As the training parameters change, the VRAM required for RWKV DiSHA fine-tuning will also change.

## Collect Training Data

You need to collect binidx data that is more suitable for training RWKV. For specific methods, you can refer to [Preparing the Training Dataset](../advance/training-datasets.md).

## Configure the Training Environment

To train the RWKV model, you first need to configure the training environment such as conda. For the specific process, please refer to the [RWKV Training Environment Configuration](../advance/training-enviroment.md) section.

## Clone the Repository and Install Dependencies

In Linux or WSL, use the git command to clone the RWKV-PEFT repository:

```  bash copy
git clone https://github.com/JL-er/RWKV-PEFT.git
```

After the cloning is completed, use the `cd RWKV-PEFT` command to enter the RWKV-PEFT directory. And run the following command to install the dependencies required by the project:

```  bash copy
pip install -r requirements.txt
```

## Modify the Training Parameters

Open the `run_disha.sh` file in the `RWKV-PEFT/scripts` directory using any text editor (such as vscode), and you can modify the training parameters to control the fine-tuning training process and training effect:

![disha-sh-config](./imgs/disha-sh-config.png)

The following is a parameter adjustment process for DiSHA fine-tuning:

### Adjust the Path Parameters

The first three lines of the `run_disha.sh` file are file path parameters:

- load_model: The path of the base RWKV model
- proj_dir: The output path of the training log and the DiSHA file obtained from training
- data_file: The path of the training dataset. Note that there is no need to include the bin and idx suffixes in the path, only the file name is required.

### Adjust the n_layer and n_embd Parameters

::: warning
For RWKV models with different parameters, the values of n_layer and n_embd used during training are different.
:::

The following are the corresponding n_layer/n_embd values for RWKV model parameters:

| Model Parameters | n_layer | n_embd |
|------------|---------|--------|
| 0.1B       | 12      | 768    |
| 0.4B       | 24      | 1024   |
| 1.5B       | 24      | 2048   |
| 2.9B       | 32      | 2560   |
| 7B         | 32      | 4096   |
| 14B        | 61      | 4096   |

### Adjust the Important Training Parameters

::: tip
The following parameters are recommended to be adjusted according to your fine-tuning data and device performance.
:::

| Parameter | Description |
| --- | --- |
| `micro_bsz=1` | Micro-batch size. Adjust according to the size of the VRAM. Gradually increase it starting from 1 during fine-tuning |
| `epoch_save=5` | Save the DiSHA file every few training epochs. Pay attention to whether the storage space is sufficient |
| `epoch_steps=1200` | The number of steps in each training epoch. Increasing this value will prolong the training time of a single epoch |
| `ctx_len=512` | The context length of the fine-tuned model. It is recommended to modify it according to the length of the corpus |

### Adjust the DiSHA Fine-Tuning Related Parameters

::: tip
`disha_config` contains the parameters for DiSHA fine-tuning. Refer to the following table for the effects:
:::

| Parameter | Description |
| --- | --- |
| "mode":"bone" | Training mode, optional `bone` or `bat` fine-tuning. Bone is faster and has lower VRAM usage, while Bat is slower but has slightly better performance |
| "load":"" | File path, indicating from which Disha checkpoint to start fine-tuning. If fine-tuning from scratch, this can be left blank |
| "r":32 | The rank parameter for DiSHA fine-tuning. The larger the value, the better the effect, but the slower the training speed and the higher the VRAM requirement. Generally, 32 or 64 is sufficient for training |

### Adjust Other Training Parameters

The following lists other modifiable training parameters in the script and the effects of their modification.

| Parameter | Description |
| --- | --- |
| `--data_type binidx` | The file format of the training corpus, supporting: "utf-8", "utf-16le", "numpy", "binidx", "dummy", "wds_img", "uint16" |
| `--vocab_size 65536` | The size of the vocabulary. The default is 65536. Setting it to 0 means the model automatically determines the size of the vocabulary |
| `--epoch_count 5` | The total number of training epochs |
| `--epoch_begin 0` | The initial training epoch, that is, start loading from the Nth training epoch |
| `--lr_init 2e-5` | The initial learning rate. It is recommended to be 2e-5 for DiSHA, and the maximum should not exceed 1e-4 |
| `--lr_final 2e-5` | The final learning rate. It is recommended to keep it the same as the initial learning rate |
| `--warmup_steps 0` | The number of warm-up steps. The default is 0. When fine-tuning the loaded model, you can try changing it to 50 |
| `--beta1 0.9` | The beta1 parameter of the Adam optimizer. Keep the default value |
| `--beta2 0.99` | The beta2 parameter of the Adam optimizer. Keep the default value |
| `--adam_eps 1e-8` | The epsilon parameter of the Adam optimizer. Keep the default value |
| `--accelerator gpu` | The type of accelerator used. Currently, it mainly supports gpu, and cpu basically does not support training |
| `--devices 1` | The number of graphics cards. Fill in 1 for a single graphics card, and fill in the actual number for multiple cards |
| `--precision bf16` | The training precision. It is recommended to keep the default value of bf16, and it supports: "fp32", "tf32", "fp16", "bf16" |
| `--strategy deepspeed_stage_1` | The lightning training strategy parameter. deepspeed_stage_1 is recommended for fine-tuning. If the device VRAM is too small, you can change 1 to 2 |
| `--grad_cp 1` | The number of gradient accumulation steps. 0 makes the training faster but requires more VRAM, and 1 makes the training slower but saves VRAM |
| `--my_testing "x070"` | The version of the RWKV model being trained. Select `x052` for v5, `x060` for v6, and `x070` for v7 |
| `--dataload pad` | The data loading option. "pad" supports `bsz>1`, and "only" limits `bsz=1` |
| `--loss_mask pad` | Perform padding at the end of the data. You can change it to "qa" to mask the question part in the QA task to prevent the model from memorizing the answer based on the question, thereby enhancing the model's generalization ability. |
| `--peft disha` | The fine-tuning training type. Just fill in `disha` for DiSHA fine-tuning |
| `--op` | Select the operator, supporting: "cuda", "fla", "triton", with the default setting being "cuda" |
| `--quant int8/nf4` | **Optional**. RWKV uses the `bf16` training precision by default, but it also supports two quantization trainings of `int8` and `nf4`. `int8` with less precision loss is recommended |
| `--wandb RWKV-PEFT-Disha` | **Optional**. Whether to use wandb to visually record the training log. You need to configure a [wandb](https://wandb.ai/) account in advance |

### Appendix: Configuration Reference for run_disha.sh

``` bash copy filename="run_disha.sh"
load_model='/home/rwkv/RWKV-PEFT/model/RWKV-x070-World-0.4B-v2.9-20250107-ctx4096.pth'
proj_dir='/home/rwkv/RWKV-PEFT/output-manjuan/disha'
data_file='/home/rwkv/RWKV-PEFT/data/rzb_rwkvself'
 
n_layer=24
n_embd=1024
 
micro_bsz=4
epoch_save=1
epoch_steps=1200
ctx_len=2048
 
disha_config='{"mode":"bone","load":"","r":64}'
 
 
python train.py --load_model $load_model \
--proj_dir $proj_dir --data_file $data_file \
--vocab_size 65536 \
--n_layer $n_layer --n_embd $n_embd \
--data_type binidx --dataload pad --loss_mask pad \
--ctx_len $ctx_len --micro_bsz $micro_bsz \
--epoch_steps $epoch_steps --epoch_count 4 --epoch_begin 0 --epoch_save $epoch_save \
--lr_init 2e-5 --lr_final 2e-5 --warmup_steps 0 --beta1 0.9 --beta2 0.99 --adam_eps 1e-8 \
--accelerator gpu --devices 1 --precision bf16 --strategy deepspeed_stage_1 --grad_cp 1 \
--my_testing "x070" \
--peft disha --disha_config $disha_config \
# The following are optional
# --op cuda/fla/triton (choose different operators, default is cuda if this parameter is not added)
# --wandb RWKV-PEFT-DiSHA (whether to use wandb to monitor the training process)
# --quant int8/nf4 (whether to quantize the training)
# --lr_schedule wsd (whether to enable cosine annealing to optimize the learning rate, default lr_schedule = cos_decay) 
```

::: warning
After adjusting the parameters, remember to save the `run_disha.sh` file.
:::

## Start the Training

In the RWKV-PEFT directory, run the command `sh scripts/run_disha.sh` to start the DiSHA fine-tuning.

After the training starts normally, it should be as follows:

![disha-tuning-running](./imgs/disha-tuning-successfully.png)

After the training is completed, you should be able to find the trained DiSHA weight file (in `.pth` format) and the training log (`.txt` file) in the output folder:

![disha-tuning-get-model](./imgs/disha-finetune-output.png)

## How to Use the DiSHA Weight File

After obtaining the DiSHA weight file (such as `rwkv-0.pth`), you need to **merge it into the base RWKV model** to obtain a complete DiSHA fine-tuned model.

This process can be completed using the `merge_disha.sh` script file in the `RWKV-PEFT/scripts` directory.

### Modify the Merging Parameters

Open the `merge_disha.sh` script file in the `scripts` directory using a text editor and modify the merging parameters in the script:

| Parameter | Description |
| ---| --- |
| `base_model` | The path of the base RWKV model for fine-tuning, referring to the `load_model` parameter in `run_disha.sh` |
| `disha_checkpoint` | The path of a certain DiSHA checkpoint file obtained from training (such as `rwkv-0.pth`) |
| `output` | The output path of the merged DiSHA model (including the model naming `xxx.pth`) |
| `--quant` | Follow the quantization parameter during training, `nf4` or `int8`. If quantization was not used during training, there is no need to add this parameter |

Reference for the `merge_disha.sh` script:

``` bash copy filename="merge_disha.sh"
base_model='/home/rwkv/RWKV-PEFT/model/RWKV-x070-World-0.4B-v2.9-20250107-ctx4096.pth'
peft_checkpoint='/home/rwkv/RWKV-PEFT/output_disha/rwkv-0.pth'
output='/home/rwkv/RWKV-PEFT/output_disha/disha-test.pth'


python merge/merge_disha.py --base_model $base_model \
--peft_checkpoint $peft_checkpoint \
--output $output
# --quant int8/nf4 (Synchronize with the quantization parameter during training)
```

### Merge the DiSHA Weight File

After modifying and saving the file, run the command `sh scripts/merge_disha.sh` in the `RWKV-PEFT` main directory to merge the DiSHA model:

![DiSHA-merge.png](./imgs/disha-merge.png)

After the merging is completed, you can find the merged DiSHA model file (in `.pth` format) in the output path:

![disha-merged-model](./imgs/disha-merged-model.png)

The merged DiSHA model can be used normally in RWKV Runner or Ai00.

![disha-model-usage-of-runner](./imgs/disha-model-usage-of-runner.png)

![disha-model-usage](./imgs/disha-model-usage.png) 