# Prompting guidelines

RWKV is more sensitive to prompt format, then transformer based models. Due to its lack of ability of "looking back"

As such, instead of doing something like the following

```
{{CONTEXT}}

{{INSTRUCTION}}

{{ANSWER}}
```

As the format you should instead, do the following

```
{{INSTRUCTION}}

{{CONTEXT}}

{{ANSWER}}
```

If you want a human analogy, think of it as the instruction/input's are being read out loud to you, and you are reqiured to remember/act on it. If the model is told the context first before instruction, it does not know what to do with the context. As it has not been told what to do with it yet.

However if you tell the model the instruction first, then the context, it will understand the instruction first, and use that knowledge to process the context.

For Q&A with context task, the most optimal is to repeat the question before and after the context like the following

```
{{QUESTION}}

{{CONTEXT}}

{{QUESTION}}

{{ANSWER}}
```