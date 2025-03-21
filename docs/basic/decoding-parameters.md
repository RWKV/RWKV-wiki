# RWKV Decoding Parameters

You may have noticed that many RWKV deployment/experience tools support adjusting parameters such as `Temperature`, `Top_P`, `Presence Penalty`, and `Frequency Penalty`. These parameters are the "decoding parameters" (also known as "sampling parameters") of the RWKV model.

By **adjusting the decoding parameters**, the generation effect of the model can be changed.

Even with the same Prompt and the same RWKV model, different parameter configurations may yield completely different answers.

## Decoding Parameters of the RWKV Model

The effects corresponding to the main decoding parameters of RWKV are as follows:

| Parameter                | Effect                                                                                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Top_P`             | Select the top $N$ tokens whose cumulative probability reaches the value of $P$ as the candidate set. For example, if set to 0.1, the top 10% will be considered. The generated content has higher quality but is more conservative. If set to 1, the content quality will decrease but be more diverse. |
| `Temperature`       | The temperature parameter $T$ controls the randomness of the generated result by modifying the scaling ratio of the logits. A higher temperature makes the probability distribution more uniform and increases the randomness of the generated content; a lower temperature makes the model more inclined to select the token with the highest probability.                                                                              |
| `Presence penalty`  | Presence penalty imposes a **fixed penalty** on **all tokens that have already appeared**, thus increasing the possibility of the model generating new tokens.                                                                 |
| `Frequency Penalty` | Frequency penalty imposes an **accumulative penalty** according to **the number of times a token appears**, thus reducing the possibility of the model repeatedly generating the same content frequently. |
| `max_tokens`        | The maximum number of tokens when the model generates text, which can be understood as "how many words the model can generate at most at one time".                                                                 |

::: tip
Next, we will compare the RWKV model to a writer and use **more understandable expressions** to explain the functions of these parameters.
:::

### **`Top_P` Parameter**

::: tabs

@tab Parameter Function
`Top_P` is like a chief editor, and it determines **how many words the writer RWKV can use**. Suppose there are currently 100 available words, then:  

- `Top_P = 0.2` is a **very strict** chief editor, only allowing RWKV to use the most common and logical words (according to the Zipf language distribution, the actual available words may only be 3 to 8).  
- `Top_P = 1` is a **very lenient** chief editor, and RWKV can freely choose all 100 words to generate more diverse text.  

@tab Parameter Suggestions
**`Top_P` Adjustment Suggestions**
| Usage Scenario | Recommended `Top_P` | Applicable Situation |
|----------|------------|---------|
| Creative Writing, Story Generation | 0.5 ~ 0.7 | Allow a certain degree of divergence, avoid the content being too rigid, and at the same time not deviate from the topic |
| Mechanical Q&A, Summarization, Translation | 0 ~ 0.5 (even 0 ~ 0.3) | Focus on maintaining accuracy and reducing unnecessary divergence |
| Deterministic Answers (Yes/No, ABCD, 1234) | 0 | Only allow the most certain answers and completely avoid randomness |

:::

### `Temperature`

::: tabs

@tab Parameter Function
Increasing the `Temperature` parameter is like giving "alcohol" to the writer RWKV. Increasing the temperature parameter will increase the **randomness** of the text, making the content more diverse, but too high a value **may make the generated content incoherent or unreasonable**.

- If the temperature is low (such as below 0.5), the model will be like a rigorous academic writer, only using the most common and stable words. For example, "sunny" will be described as "abundant sunshine". It is more rigorous and suitable for formal writing or accurate answers.
- If the temperature is high (such as above 1.5), the model will be like a drunk poet, using more uncommon words. For example, the rainbow will be described as "the colorful wound of the universe". It is more creative but may have incoherent expressions.

@tab Parameter Suggestions
**The `Temperature` parameter is recommended to be adjusted together with `Top_P`**:

| `Top_P` | Recommended `Temperature` | Applicable Situation |
|---------|------------------|---------|
| ≥ 0.7   | 1                | Suitable for creative writing, maintaining stable diversity |
| 0.3 ~ 0.7 | 1 ~ 1.3 | Moderately increase randomness and avoid the content being too rigid |
| 0.3 | 1 ~ 1.5 | The sampling range is limited, and it is necessary to appropriately increase the randomness |
| ≤ 0.2 | 1 ~ 2   | When the `Top_P` is low, it is easy to generate repetitive content. Increasing the `Temperature` can increase the variability |

:::
::: warning
When the **`Top_P` is extremely low**, it is necessary to appropriately increase the `Temperature` (1 or above) to avoid the text falling into an infinite loop or repetition.  

:::

### `Presence penalty` Parameter

::: tabs

@tab Parameter Function
`Presence penalty` can prevent the same word from being used repeatedly, but it will not increase the penalty strength due to multiple occurrences. Its essence is similar to a dynamically updated "blacklist of prohibited words":

- Whenever the model generates a new word, that word will be immediately added to the "blacklist of prohibited words"
- During the subsequent generation process, the **probability of that word appearing will be fixed and reduced by a certain value** (for example, 0.5)

Suppose the current `Presence penalty` parameter value is 0.5, and the generation probability of the word "beautiful" in the original situation is 10%. Then

- If the word "beautiful" has appeared before, its generation probability will be deducted by a fixed value, the corresponding logits will decrease, and the final probability will be reduced
- But other words that have not appeared are not affected, their logits remain unchanged, and the final probability may be slightly adjusted due to normalization

@tab Parameter Suggestions
**Recommended values for the `Presence penalty` parameter**:

| `Top_P`  | Recommended `Presence Penalty` | Recommended Reason |
|----------|----------------------|---------|
| 0.7      | 0.2 ~ 0.4        | Allow more word diversity. Appropriately increasing the `Presence Penalty` can prevent excessive repetition of the same theme or phrase in long texts. |
| 0.5      | 0.3 ~ 0.6        | Moderate combination, maintaining coherence while reducing repetition, suitable for most tasks. |
| 0.3      | 0.5 ~ 0.7        | When the `Top_P` is low, the sampling range is limited. Increasing the `Presence Penalty` can avoid the repeated appearance of the same word or phrase. |
| ≤ 0.2    | 0 ~ 0.1, and it is recommended that `Temperature` be 1 ~ 2 | When the `Top_P` is too low, **there are very few available words**, and we should not forcibly punish the words that have already appeared. Otherwise, it will cause abnormal expressions. It is recommended to enhance the variability by increasing the `Temperature`. |

:::
::: warning
If the value of `Presence penalty` is too high, it may cause the model to **excessively avoid repeating words**, making the text unnatural or incoherent. In extreme cases such as when the `Top_P` is extremely low, it may affect the use of punctuation marks and even generate abnormal characters or incomprehensible text.
:::

### `Frequency Penalty` Parameter

::: tabs

@tab Parameter Function
`Frequency Penalty` is used to **suppress high-frequency repeated words**, and it will reduce the probability of a certain word appearing subsequently according to **the number of times that word appears in the generated text**. The more times it appears, the stronger the penalty.

By increasing the `Frequency Penalty` parameter, we can **reduce the repetition of catchphrase-like words (such as "then", "um")**, thus making the generated text more natural and fluent. 

Suppose the current `Frequency Penalty` is set to `0.3`, and the original generation probability of a certain word "beautiful" is `10%`, but it has already been generated three times before:

- After calculating the penalty, the new probability of "beautiful" = `10% - (3 × 0.3)` = `9.1%`
- If it is generated one more time (a total of four appearances), then the penalty deducted in the new round is `4 × 0.3 = 1.2%`

@tab Parameter Suggestions
| `Top_P`  | Recommended `Frequency Penalty` | Applicable Situation |
|----------|----------------------|---------|
| 0.7      | 0.2 ~ 0.5              | When the `Top_P` is very high (such as `0.7`), the model has more available words. Increasing the `Frequency Penalty` can reduce the repetition of redundant words.   |
| 0.5      | 0.3 ~ 0.6              | Suitable for most scenarios, reducing repetition without affecting the expression |
| 0.3      | 0.4 ~ 0.7              | When the `Top_P` is low, a higher `Frequency Penalty` is required to prevent repetition |
| ≤ 0.2    | 0 ~ 0.1, and it is recommended that `Temperature` be 1 ~ 2 | When the **`Top_P` is extremely low** (≤ `0.2`), it is recommended to reduce the `Frequency Penalty` and instead increase the `Temperature`. Otherwise, it may cause the text to be abnormal and not smooth.  |

:::
::: warning
The above examples are only used to illustrate the function of `Frequency Penalty`. In actual calculations, it is usually a multiplicative adjustment of the logits, rather than a simple subtraction operation.
:::

## Parameter Combinations for Different Tasks

We have provided some recommended parameters for different tasks:

::: tabs

@tab Creative Content Creation
Creative content requires more **randomness** and **openness**, allowing the model to generate more imaginative expressions. Therefore, `Top_P` and `Temperature` are set higher, while `Presence Penalty` and `Frequency Penalty` are moderate to avoid excessive repetition.

| Task Type | `Top_P` | `Temperature` | `Presence Penalty` | `Frequency Penalty` |
|---------|--------|--------------|------------------|------------------|
| Story Creation | 0.8 | 1.3 | 0.4 | 0.5 |
| Poetry / Literature | 0.9 | 1.8 | 0.3 | 0.4 |
| Advertising Copy / Marketing | 0.7 | 1.2 | 0.5 | 0.6 |
| Free Writing | 0.85 | 1.5 | 0.4 | 0.5 |

@tab Structured Writing

Structured writing requires a certain degree of creativity, but it also needs to ensure logic and coherence. Therefore, `Top_P` and `Temperature` are moderate, and at the same time, appropriately increase `Presence Penalty` and `Frequency Penalty` to reduce repetitive expressions.

| Task Type | `Top_P` | `Temperature` | `Presence Penalty` | `Frequency Penalty` |
|---------|--------|--------------|------------------|------------------|
| News / Articles | 0.6 | 1.1 | 0.3 | 0.4 |
| Papers / Research Reports | 0.4 | 0.9 | 0.4 | 0.5 |
| Scripts / Dialogues | 0.7 | 1.3 | 0.5 | 0.6 |
| Product Descriptions | 0.5 | 1.0 | 0.3 | 0.4 |

@tab Mechanical Tasks

Mechanical tasks require precision and consistency, or need to strictly follow a specific format. Therefore, `Temperature` and `Top_P` are lower, and at the same time, try to reduce `Presence Penalty` and `Frequency Penalty` to avoid affecting the use of common words.

| Task Type | `Top_P` | `Temperature` | `Presence Penalty` | `Frequency Penalty` |
|---------|--------|--------------|------------------|------------------|
| Q&A / Factual Answers | 0.2 | 0.8 | 0.1 | 0.2 |
| Summarization / Paraphrasing | 0.3 | 1.0 | 0.2 | 0.3 |
| Translation | 0.3 | 0.9 | 0.2 | 0.3 |
| Formula / Code Generation | 0.1 | 0.7 | 0.1 | 0.2 |
| Multiple-choice Questions, True or False Questions | 0 | 0.7 | 0.1 | 0.2 |

:::

Parameters can be optimized based on specific tasks, with the optimization principles being:

- **`Top_P` controls the word selection range**: A higher value means more diversity, and a lower value means more precision.  
- **`Temperature` controls the randomness**: A higher value means more creativity, and a lower value means more stability.  
- **`Presence Penalty` controls global repetition**: A higher value reduces overall repetition and is suitable for writing.  
- **`Frequency Penalty` controls frequent repetition**: A higher value reduces the repetition of pet phrases and short sentences and is suitable for dialogues as well as formal writing.
