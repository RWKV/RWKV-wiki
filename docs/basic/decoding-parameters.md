# RWKV Decoding Parameters

Many RWKV deployment/experience tools support adjusting parameters such as `Temperature`, `Top_P`, `Presence Penalty`, and `Frequency Penalty`. These parameters make up the "decoding parameters" (or "sampling parameters") of the RWKV model.

**Adjusting these decoding parameters** changes how the model generates text.

Even when you use the same Prompt and RWKV model, different parameter configurations can produce completely different answers.

## Decoding Parameters of the RWKV Model

The main decoding parameters of RWKV have the following effects:

| Parameter                | Effect                                                                                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Top_P` | Select the top $N$ tokens whose cumulative probability reaches the value of $P$ as the candidate set. For example, if set to 0.1, only the top 10% of tokens will be considered. TLower values produce higher quality but more conservative content. Setting it to 1 decreases content quality but increases diversity. |
| `Temperature` | Adjusts the randomness of the generated result by modifying the scaling ratio of the logits. A lower temperature makes the model choose highly probable tokens, creating more predictable output while a higher temperature flattens the probability distribution, generating more creative but potentially lses coherent text. |
| `Presence penalty`  | Applies a fixed penalty to any token that has already appeared, encouraging the model to use new vocabulary rather than repeating words. |
| `Frequency Penalty` | Penalizes tokens based on how many times they've appeared, with the penalty increasing with each occurrence. Helps prevent repetitive phrases and filler words. |
| `max_tokens` | Limits the maximum number of tokens generated in one response|

::: tip
Next, we will compare the RWKV model to a writer and use analogies to explain the functions of these parameters.
:::

### **`Top_P` Parameter**

::: tabs

@tab Parameter Function
`Top_P` is like a chief editor, and it determines **how many words the RWKV writer can use**. Suppose there are currently 100 available words, then:  

- `Top_P = 0.2` is a **very strict** editor, allowing RWKV to use only the most common and logical words (in the Zipf language distribution, this might only be 3 to 8 words).
- `Top_P = 1` is a **very lenient** editor, letting RWKV choose freely from all 100 words.  

@tab Parameter Suggestions
**`Top_P` Adjustment Suggestions**
| Usage Scenario | Recommended `Top_P` | Applicable Situation |
|----------|------------|---------|
| Creative Writing, Story Generation | 0.5 ~ 0.7 | Allows some creative flexibility while keeping content on-topic |
| Mechanical Q&A, Summarization, Translation | 0 ~ 0.5 (even 0 ~ 0.3) | Maintains accuracy and reduces unnecessary variation |
| Deterministic Answers (Yes/No, ABCD, 1234) | 0 | Permits only the most certain answers, eliminating randomness |

:::

### `Temperature`

::: tabs

@tab Parameter Function
Increasing the `Temperature` is like giving "alcohol" to the writer RWKV. Higher temperature increases randomness in the text, making content more diverse, but excessively high values may produce incoherent or unreasonable output.

- Low temperature (typically below 0.5):  The model writes like a rigorous academic, using common and stable vocabulary. For example, it may describe a sunny day as having "abundant sunshine." Suitable for formal writing or precise answers.
- High tempeature (typically above 1.5):  The model writes like an intoxicated poet, using unusual vocabulary. For example, it may describe a rainbow as "the colorful wound of the universe." More creative but potentially less coherent.

@tab Parameter Suggestions
**We recommend adjusting the `Temperature` parameter together with `Top_P`**:

| `Top_P` | Recommended `Temperature` | Applicable Situation |
|---------|------------------|---------|
| ≥ 0.7   | 1 | Suitable for creative writing |
| 0.3 ~ 0.7 | 1 ~ 1.3 | Moderately increases randomness to prevent rigid content |
| 0.3 | 1 ~ 1.5 | When sampling range is limited, increasing the randomness helps |
| ≤ 0.2 | 1 ~ 2   | When the `Top_P` is low, higher `Temperature` prevents repetition |

:::
::: warning
When the **`Top_P` is extremely low**, you should increase `Temperature` (to 1 or higher) to prevent infinite loops or repetition.

:::

### `Presence penalty` Parameter

::: tabs

@tab Parameter Function
`Presence penalty` prevents the LLM from repeating words but doesn't increase the penalty for multiple occurrences. It functions like a dynamic "blacklist of prohibited words":

- Whenever the model generates a new word, that word is immediately added to the "blacklist".
- In subsequent generation, the **probability of that word is reduced by a fixed value** (ex. 0.5)

For example, if Presence Penalty is 0.5, and the word "beautiful" has a 10% probability of being generated:

- If the word "beautiful" has appeared before, its generation probability will be reduced by a fixed value; the corresponding logits will decrease, and the final probability will be reduced
- Other words that haven't appeared are unaffected; their logits remain unchanged, and the final probability may be slightly adjusted due to normalization

@tab Parameter Suggestions
**Recommended values for the `Presence penalty` parameter**:

| `Top_P`  | Recommended `Presence Penalty` | Recommended Reason |
|----------|----------------------|---------|
| 0.7      | 0.2 ~ 0.4 | Allows more word diversity. Increasing the `Presence Penalty` can prevent excessive repetition of the same theme or phrase in long texts. |
| 0.5      | 0.3 ~ 0.6 | Balanced approach that maintains coherence while reducing repetition. Suitable for most tasks. |
| 0.3      | 0.5 ~ 0.7 | Low `Top_P` limits the sampling range. Higher values of `Presence Penalty` help avoid the repeated appearance of the same word or phrase. |
| ≤ 0.2    | 0 ~ 0.1, with `Temperature` at 1 ~ 2 | When the `Top_P` is very low, **extremely few words are available**. Avoid penalizing already-used words to prevent abnormal expressions. Increase `Temperature` instead. |

:::
::: warning
Excessive `Presence Penalty` values may cause the model to unnaturally avoid repeating words, making text awkward or incoherent. In extreme cases with very low `Top_P`, it may affect punctuation usage or generate unintelligible text.
:::

### `Frequency Penalty` Parameter

::: tabs

@tab Parameter Function
`Frequency Penalty`  suppresses frequently repeated words by reducing the probability of a word appearing based on how many times it has already appeared in the generated text. More appearances result in stronger penalties.

Increasing the `Frequency Penalty` parameter reduces repetitive filler words (like "then", "um").

Suppose the current `Frequency Penalty` is `0.3` and the original generation probability of a certain word "beautiful" is `10%`, but has already appeared three times:

- With the penalty, the new probability of the word "beautiful" = `10% - (3 × 0.3)` = `9.1%`
- If it appears again (fourth time), the new penalty is `4 × 0.3 = 1.2%`

@tab Parameter Suggestions
| `Top_P`  | Recommended `Frequency Penalty` | Applicable Situation |
|----------|----------------------|---------|
| 0.7      | 0.2 ~ 0.5 | When the `Top_P` is very high (such as `0.7`), the model has more available words. Increasing the `Frequency Penalty` can reduce the number of redundant words. |
| 0.5      | 0.3 ~ 0.6 | Works in most scenarios, reducing repetition without affecting expression quality. |
| 0.3      | 0.4 ~ 0.7 | When the `Top_P` is low, a higher `Frequency Penalty` helps prevent repetition. |
| ≤ 0.2    | 0 ~ 0.1, with `Temperature` at 1 ~ 2 | When the **`Top_P` is extremely low** (≤ `0.2`), reduce the `Frequency Penalty` and increase the `Temperature` instead to prevent awkward text. |

:::
::: warning
The examples illustrate the `Frequency Penalty` function conceptually. In actual calculations, it is usually involves a multiplicative adjustment of the logits, rather than simple substraction.
:::

## Parameter Combinations for Different Tasks

Here are recommended parameter combinations for various tasks:

::: tabs

@tab Creative Content Creation
Creative content need more randomness and openness to let the model generate more imaginative expressions. Therefore, use higher `Top_P` and `Temperature` with moderate `Presence Penalty` and `Frequency Penalty` values to avoid excessive repetition.

| Task Type | `Top_P` | `Temperature` | `Presence Penalty` | `Frequency Penalty` |
|---------|--------|--------------|------------------|------------------|
| Story Creation | 0.8 | 1.3 | 0.4 | 0.5 |
| Poetry / Literature | 0.9 | 1.8 | 0.3 | 0.4 |
| Advertising Copy / Marketing | 0.7 | 1.2 | 0.5 | 0.6 |
| Free Writing | 0.85 | 1.5 | 0.4 | 0.5 |

@tab Structured Writing

Structured writing requires some creativity but also logic and coherence. Use moderate `Top_P` and `Temperature` with appropriate `Presence Penalty` and `Frequency Penalty` to reduce repetition.

| Task Type | `Top_P` | `Temperature` | `Presence Penalty` | `Frequency Penalty` |
|---------|--------|--------------|------------------|------------------|
| News / Articles | 0.6 | 1.1 | 0.3 | 0.4 |
| Papers / Research Reports | 0.4 | 0.9 | 0.4 | 0.5 |
| Scripts / Dialogues | 0.7 | 1.3 | 0.5 | 0.6 |
| Product Descriptions | 0.5 | 1.0 | 0.3 | 0.4 |

@tab Mechanical Tasks

Mechanical tasks require precision and consistency, often following specific format. Use lower `Temperature` and `Top_P` with reduced `Presence Penalty` and `Frequency Penalty` to avoid affecting the use of common words.

| Task Type | `Top_P` | `Temperature` | `Presence Penalty` | `Frequency Penalty` |
|---------|--------|--------------|------------------|------------------|
| Q&A / Factual Answers | 0.2 | 0.8 | 0.1 | 0.2 |
| Summarization / Paraphrasing | 0.3 | 1.0 | 0.2 | 0.3 |
| Translation | 0.3 | 0.9 | 0.2 | 0.3 |
| Formula / Code Generation | 0.1 | 0.7 | 0.1 | 0.2 |
| Multiple-choice Questions, True or False Questions | 0 | 0.7 | 0.1 | 0.2 |

:::

Parameters can be optimized for specific tasks based on these principles:

- **`Top_P` controls the word selection range**: A higher value means more diversity, and a lower value means more precision.  
- **`Temperature` controls the randomness**: A higher value increases creativity, and a lower value improves stability and predictability.  
- **`Presence Penalty` controls global repetition**: A higher value reduces overall repetition and is useful for writing tasks.  
- **`Frequency Penalty` controls frequent repetition**: A higher value reduces the repetition of pet phrases and short sentences, ideal for dialogues and formal writing.
