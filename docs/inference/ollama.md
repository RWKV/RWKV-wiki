# Ollama Inference Tutorial

::: tip
[Ollama](https://github.com/ollama) is a simple and user-friendly open-source local large language model framework that supports one-click deployment and running of various open-source models on personal computers, featuring simple configuration and low resource usage.
:::

With the work of RWKV community member [@MollySophia](https://github.com/MollySophia), Ollama now supports RWKV-6 models.

This section introduces how to use RWKV-6 models for inference in Ollama.

## Download RWKV Model in GGUF Format

Ollama supports models in `.gguf` format, but RWKV officially only releases models in `.pth` format. Therefore, we need to download RWKV models in gguf format from the [RWKV - GGUF Repository](https://huggingface.com/latestissue).

::: warning
RWKV gguf models come in various quantization versions. It is recommended to use `Q5_1` and `Q8_0` quantization precision. Lower quantization precision (such as `Q4_0`, `Q3_0`, etc.) may significantly degrade the model's responses.
:::

## Create Modelfile for the Model

Create a text file named `Modelfile` (without file extension) in the folder containing the RWKV gguf model file.

![Modelfile](./imgs/ollama-Modelfile.png)

Then open this text file with "Notepad" or other text editors and write the following content:

```bash copy
FROM rwkv-6-world-1.6b-Q8_0.gguf

TEMPLATE """
{{- range .Messages }}
{{- if eq .Role "user" }}User: 
{{- else if eq .Role "assistant" }}Assistant:
{{- end }}{{ .Content }}

{{ end }}Assistant:"""

PARAMETER stop "\n\n"
PARAMETER stop "\nUser:"
```

Modify the `rwkv-6-world-1.6b-Q8_0.gguf` after `FROM` in the first line to match your downloaded RWKV model filename.

::: warning
It is recommended to directly copy the above content into `Modelfile`, ensuring there is a space after `User:`, no space after `Assistant:`, and a blank line above `{{ end }}Assistant:"""` with no extra characters after it.
:::

![Modelfile](./imgs/ollama-Modelfile-content.png)

## Download and Install Ollama

You can download the Ollama installer from the [Ollama official website](https://ollama.com/).

After downloading, double-click the exe file to install. Once installed, `Ollama` will start automatically, and you can see the `Ollama` icon in the system tray.

![ollama-icon](./imgs/ollama-icon.png)

## Running RWKV Model with Ollama

Open a terminal in the RWKV gguf model folder and execute the `ollama create` command:

``` bash copy
ollama create rwkv-6-world-1.6b-Q8_0 -f Modelfile
```
::: tip
Change the model name after `ollama create` to match your local RWKV model name, keeping it consistent with the model name in `Modelfile`.
:::

![ollama-create](./imgs/ollama-create.png)

After creation, use the `ollama run` command to run the model directly:

``` bash copy
ollama run rwkv-6-world-1.6b-Q8_0
```

Once successfully running, you can start chatting with the model:

![ollama-chat](./imgs/ollama-chat.png)

## Ollama GUI and Desktop Applications

Ollama itself doesn't provide GUI or WebUI services, but its community offers third-party GUI and desktop applications.

You can view all third-party Ollama tools in the [Ollama GitHub documentation](https://github.com/ollama/ollama?tab=readme-ov-file#web--desktop).

## References

- [Ollama Official Website](https://ollama.com/)
- [RWKV gguf Model Repository](https://huggingface.co/latestissue)