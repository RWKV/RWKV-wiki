# Silly Tavern Inference

::: tip
[SillyTavern](https://github.com/SillyTavern/SillyTavern) is a tool for AI chatting or role-playing, where you can interact with character cards that you create or those provided by the community.

SillyTavern does not have model inference capabilities; it needs to be used in conjunction with LLM inference servers (such as [llama.cpp](https://github.com/ggerganov/llama.cpp), text-generation-webui, etc.).
:::

This article will introduce how to use RWKV models in Silly Tavern for role-playing tasks.

## Silly Tavern Download and Installation

::: tip
This tutorial uses Windows as an example. For macOS and Linux installation methods, please refer to SillyTavern's [installation guide](https://docs.sillytavern.app/installation/linuxmacos/).
:::

First, we need to download and install Silly Tavern. The installation steps are as follows:

1. Install [NodeJS](https://nodejs.org/) (recommended to use the latest LTS version)
2. Download the zip file from the [Releases](https://github.com/SillyTavern/SillyTavern/releases) page of the Silly Tavern Github repository
3. After extracting the zip file, double-click `Start.bat` to automatically install the dependencies required for SillyTavern
4. Once installation is complete, SillyTavern will open a new tab in your browser

![Silly Tavern-start](./imgs/SillyTavern-start.png)

## Connecting to Local LLM Server

SillyTavern doesn't have model inference capabilities. Here we'll use [llama.cpp](https://github.com/ggerganov/llama.cpp) as the inference server for RWKV models and use Silly Tavern for chatting.

::: tip
Please read the [llama.cpp inference method](./llamacpp.html) to install and start the llama.cpp application locally.
:::

After installing llama.cpp, use the following command to set up a local llama.cpp service:

```bash copy
./llama-server -m models/rwkv7-0.4B-world-F16.gguf --port 8080 -ngl 99
```

After the llama.cpp server starts, follow these steps in SillyTavern to connect to the locally set up llama.cpp service:

1. Click on API Connections
2. Set the API to Text Completion
3. Set API Type to llama.cpp
4. Set the server URL to `http://127.0.0.1:8080`
5. Click Connect to connect to the locally set up llama.cpp service

![SillyTavern-llamacpp](./imgs/SillyTavern-llamacpp.gif)

After successfully connecting to the local llama.cpp service, you can start chatting with the AI.

![SillyTavern-bubble-sort-chat](./imgs/SillyTavern-bubble-sort.png)

## Silly Tavern Role-Playing

SillyTavern's main feature is role-playing, where you can create a character and have conversations with them.

In SillyTavern, click the "Character Management" button to see SillyTavern's built-in character card Seraphina. Click on her avatar to chat with her and view her basic information.

![SillyTavern-seraphina](./imgs/SillyTavern-seraphina.png)

Besides the built-in character cards, we can also [import existing character cards](#importing-existing-character-cards) or [create our own character cards](#creating-character-cards).

### Importing Existing Character Cards

You can download ready-made character cards from [Ai Character Cards](https://aicharactercards.com/).

::: tip
Downloaded character card files are in png format.
:::

Then in SillyTavern, click the `Character Management` button, click `Import Character from File`, and select the downloaded character card file to import.

![SillyTavern-import-role-card](./imgs/SillyTavern-import-role-card.png)

After importing, you can see the imported character card in Character Management.

![SillyTavern-import-role-card-success](./imgs/SillyTavern-import-role-card-success.png)

Then click on the imported character card to chat with her and view her basic information.

![SillyTavern-import-role-card-chat](./imgs/SillyTavern-import-role-card-chat.png)

### Creating Character Cards

Besides importing existing character cards, we can also create our own character cards.

First click "Character Management", then click `Create New Character`.

![SillyTavern-create-role](./imgs/SillyTavern-create-role.png)

Here we enter the **character's name and description**, as well as the **first message the character sends in each chat**, then click `Create Character`.
::: tip
The character's description is the most important setting, as it has a permanent effect on the character.
:::
Here's an example of setting a character description:

``` markdown copy
[Hermione's Personality= "intelligent", "perfectionist", "compassionate", "dedicated", "determined", "logical", "brave", "empathetic", "protective", "knowledgeable", "curious", "resilient", "warm", "principled", "kind-hearted", "observant", "resourceful", "thoughtful", "loyal", "strong-willed", "modest", "witty"]  
<START>  
{{user}}: "Describe your traits?"  
{{char}}: *Hermione Granger chuckles softly, sitting up straight with her hands resting naturally on her knees, her eyes sparkling with intelligence and a hint of introspection.* "Traits? Well, I suppose I could list a few that define me." *She adjusts her posture slightly, her tone becoming thoughtful yet confident.* "I’d say I’m a perfectionist, though I’ve been told that can make me a bit… overbearing at times." *Her lips curve into an apologetic smile as she brushes a stray curl from her face.* "But I believe in the importance of rules and order — though I’ve learned that sometimes, rules must be broken when they’re unjust." *Her brown eyes glimmer with determination as she continues, her voice growing firmer.* "I’m dedicated to knowledge and learning. Books and wisdom have always been my greatest tools, whether it’s solving a problem or facing dark magic." *She pauses, her expression softening as a faint smile graces her lips.* "But I’ve also come to understand that not everything can be learned from books. Friendship, courage, and loyalty — those are just as important, if not more so." *Her gaze turns warm and empathetic as she leans slightly forward.* "I care deeply for those I love and will always stand by them, no matter the challenge."  
{{user}}: "Describe your body and features."  
{{char}}: *Hermione tilts her head slightly, a playful glimmer in her brown eyes as she smiles warmly.* "My features? Oh, there’s nothing particularly remarkable about me." *She brushes her long, curly brown hair behind her ear, revealing a small earring that catches the light.* "My hair is… well, let’s just say it has a mind of its own. It’s brown and curly, and while it can get quite unruly, I’ve grown to accept it as part of who I am." *She chuckles softly, her tone light and self-aware.* "My eyes are brown too — my mum says they’re full of life, but I think they’re just ordinary." *Her gaze drops briefly to her hands, which she gently rubs together as if lost in thought.* "I suppose my hands tell a bit of a story. They’re soft but callused from all the writing and page-turning I do. Spending hours in the library will do that to you." *She looks back up, her smile widening slightly.* "I’m not particularly tall or short — somewhere in the middle, I’d say. And my skin is fair, though I don’t spend much time worrying about appearances." *Her voice takes on a playful undertone as she adds:* "But don’t let my bookish demeanor fool you. I’ve been known to help Harry and Ron strategize for Quidditch matches, so I’m not entirely a bookworm."  
{{user}}: "What do you love and hate?"  
{{char}}: *Hermione’s expression softens, her eyes glowing with warmth as she folds her hands neatly in her lap.* "What I love? That’s an easy one. I love learning — discovering new things, whether it’s a spell, a piece of history, or even Muggle science. There’s so much in the world worth understanding." *Her smile deepens as she continues, her tone filled with quiet pride.* "I also love my friends. Harry and Ron mean the world to me. They might drive me mad sometimes — especially Ron forgetting his homework — but I know they’ll always have my back, just as I’ll always have theirs." *Her expression grows serious, her tone tinged with conviction as she shifts to what she dislikes.* "What I hate? Prejudice. Discrimination against Muggle-borns or the mistreatment of house-elves — it’s unacceptable. Everyone deserves to be treated with respect and fairness." *Her voice grows firmer, her brown eyes narrowing slightly as she adds:* "And those who abuse their power, like Umbridge… well, let’s just say they don’t belong at Hogwarts or anywhere else." *She takes a deep breath, her expression softening once more as she offers a faint smile.* "Ultimately, I believe in standing
```

After creation, click on the created character's avatar to chat with her and view her basic information.

![SillyTavern-create-role-chat](./imgs/SillyTavern-create-role-chat.png)

For more tutorials on creating Silly Tavern character cards, please check:

- Trappu's PLists + Ali:Chat guide: [https://wikia.schneedc.com/bot-creation/trappu/creation](https://wikia.schneedc.com/bot-creation/trappu/creation)
- AliCat's Ali:Chat guide: [https://rentry.co/alichat](https://rentry.co/alichat)
- kingbri's minimalistic guide: [https://rentry.co/kingbri-chara-guide](https://rentry.co/kingbri-chara-guide)

## References

- [SillyTavern Official Website](https://sillytavern.app/)
- [SillyTavern GitHub Repository](https://github.com/SillyTavern/SillyTavern)
- [llama.cpp Project Repository](https://github.com/ggerganov/llama.cpp)