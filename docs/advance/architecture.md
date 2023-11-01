# RWKV Architecture

::: tip
If you are not familiar with machine learning, I would highly recommend [Andrej Karpathy's series on neural networks](https://www.youtube.com/watch?v=VMj-3S1tku0&list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ&ab_channel=AndrejKarpathy) - that would help provide a good foundation on various neural network architecture concepts.
:::

## What is a classic RNN network? / What is the hidden state?

An RNN network, in its simplest form, is a type of AI neural network. It uses a hidden state, which is continually updated by a function as it processes each input token while predicting the next one (if needed).

![Classic RNN diagram](../img/classic-RNN.png)

As each token is processed, it is used to feed back into the RNN network to update its state and predict the next token, looping until the target completion state is reached. This hidden state can be viewed as the AI model's "state of mind."


RWKV can be viewed as a modified variant of RNN.

## How does RWKV Differ from Classic RNN?



Traditionally, RNNs, due to their sequential nature of needing to fully process one token and its hidden state before the next, are hard to parallelize and train with GPUs, making them difficult to train at scale for Large Language Models.

![Diagram showing the flow of the hiddenstates](../img/rwkv-hidden-state-flow.png)

RWKV mitigates this issue by splitting the full RNN network into multiple smaller layers, where each layer's hidden state can be used independently to compute the next token hidden state for the same layer. This allows for the next token states to be computed partially in parallel, while awaiting the complete calculation of the first hidden state, in a cascading-like pattern.

The following gif illustrates the parallel cascading nature over approximately 3 layers (height) and 25 tokens (width).

![Diagram showing the RWKV parallel cascading pattern, in transformer mode, generated via https://jsfiddle.net/buLswgem/31/ ](../img/rwkv-cascading-pattern.gif)

Effectively, this allows the RNN network to operate like a transformer network when rolled out side by side, where it can be trained "like a transformer" and "executed like an RNN" (the best of both worlds). 

This is achieved using a combination of token shifting, channel, and time mixing to replace LSTM and compute the next layer/hidden state.

> Note: The cascading diagram represents the theoretical optimal. In practice, some trainers and/or inference implementations may batch the cascade into chunks of tokens (32/64/128/256/512) to reduce VRAM lookup and latency and improve overall performance.

## What is Channel / Time Mixing? Explain it in Simple Terms?

Channel mixing is the process where the next token being generated is mixed with the previous state output of the previous layer to update this "state of mind". Since it cannot read its own channel mix layer output state from the previous iteration, information in channel mixing can only flow upwards through the layer, step by step—an analogy to this is to view it as short-term, accurate memory.

Time mixing is a similar process, but it allows the model to retain part of the previous state of mind, enabling it to choose and store state information over a longer period, as chosen by the model. This is trained by the model, which may allow it to retain data from the past indefinitely if it was trained to do so—an analogy to this is to view it as longer-term, lower accuracy memory.

Because the current token can read data from the past state via both channel and time mixing in various forms, it provides an alternative to "attention" models. Key information is stored in the hidden state (decided by the model weights) across the various layers and is read against the current token, with various effects applied as per its training. This effectively provides a form of "trained attention" of the past tokens (stored inside the hidden state) against the current token.

> PS: The above is an inaccurate oversimplification. Read the paper/links below for deeper details.

## How does WKV work? / I want the nitty-gritty, where do I find it?

A good starting point is to look into [RWKV in 150 lines of code](https://github.com/BlinkDL/ChatRWKV/blob/main/RWKV_in_150_lines.py), which provides a fundamental understanding of the core concepts of RWKV.

You can find the 150 lines explained in more details in the following two [blog posts: here](https://johanwind.github.io/2023/03/23/rwkv_details.html) [and here](https://github.com/uasi/rwkv-in-150-lines-ex)

Alternatively, you can study it up via the [RWKV paper](https://arxiv.org/abs/2305.13048)

Or watch [Yannic Kilcher break the paper down step by step on youtube](https://www.youtube.com/watch?v=x8pW19wKfXQ&pp=ygUEUldLVg%3D%3D)

If you would like a breakdown of the math involved, you can find it covered in a blog post here: [https://ben.bolte.cc/rwkv](https://ben.bolte.cc/rwkv)

Finally, once you've gotten a grasp on the fundamentals, you can start studying the training and CUDA code respectively in the [main repo](https://github.com/BlinkDL/RWKV-LM)

**Additional links/resources**
- Notes on RWKV architecture: [https://www.ivanleo.com/blog/a_guide_to_rwkv](https://www.ivanleo.com/blog/a_guide_to_rwkv)
- RWKV model math: [https://ben.bolte.cc/rwkv-model](https://ben.bolte.cc/rwkv-model)
- RWKV explained: [https://fullstackdeeplearning.com/blog/posts/rwkv-explainer/](https://fullstackdeeplearning.com/blog/posts/rwkv-explainer/)
- How RWKV works: [https://johanwind.github.io/2023/03/23/rwkv_details.html](https://johanwind.github.io/2023/03/23/rwkv_details.html)
- RWKV training cost estimate (outdated): [https://johanwind.github.io/2023/03/23/rwkv_overview.html](https://johanwind.github.io/2023/03/23/rwkv_overview.html)
