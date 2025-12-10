import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from '@vuepress/cli'
import { searchPlugin } from '@vuepress/plugin-search'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
	theme: defaultTheme({
		// Site logo and navbar
		logo: "/img/rwkv-avartar-256p.png",
		navbar: [
			{ text: 'Main Github', link: 'https://github.com/BlinkDL/RWKV-LM' },
			{ text: 'Hugging Face Integration', link: 'https://huggingface.co/docs/transformers/model_doc/rwkv' },
			{ text: 'Community Discord', link: 'https://discord.gg/bDSBUMeFpc' }
		],

		// Adding docs edit link
		docsRepo: 'https://github.com/RWKV/RWKV-wiki',
		docsBranch: 'main',
		docsDir: 'docs',
		editLinkPattern: ':repo/blob/:branch/:path',

		// Sidebar menu
		sidebar: [
			{ text: 'RWKV Language Model', link: '/' },
			{ 
				text: 'Getting Started', 
				link: '/basic/how-to-play.html',
				children: [
					"/basic/architecture.md",
					"/basic/how-to-play.md",
					"/basic/RWKV-Evals.md",
					"/basic/decoding-parameters.md",
					"/basic/integrate.md",
					"/basic/rwkv-performance-data.md",
					"/basic/FAQ.md",
				]
			},
			{ 
				text: 'RWKV Prompting', 
				link: '/RWKV-Prompts/prompt-guidelines.md',
				children: [
					"/RWKV-Prompts/prompt-guidelines.md",
					"/RWKV-Prompts/Chat-Prompts.md",
					"/RWKV-Prompts/Completion-Prompts.md",
				]
			},
			{ 
				text: 'Advanced', 
				link: '/advance/finetune.html',
				children: [
					"/advance/pretrain.md",
					"/advance/RWKV-FLA.md",
					"/advance/finetune.md",
					"/advance/training-datasets.md",
					"/advance/training-enviroment.md"
				]
			},
			{ 
				text: 'Inference Tutorials', 
				link: '/inference/llamacpp.html',
				children: [
					"/inference/RWKVpip.md",
					"/inference/llamacpp.md",
					"/inference/ollama.md",
					"/inference/sillytraven.md",
					"/inference/text-generation-webui.md",
					"/inference/koboldcpp.md",
					"/inference/ai00.md"
				]
			},
			{ 
				text: 'Fine Tune Tutorials', 
				link: '/RWKV-Fine-Tuning/State-Tuning.html',
				children: [
					"/RWKV-Fine-Tuning/State-Tuning.md",
					"/RWKV-Fine-Tuning/LoRA-Fine-Tuning.md",
					"/RWKV-Fine-Tuning/MiSS-Fine-Tuning.md",
					"/RWKV-Fine-Tuning/Pissa-Fine-Tuning.md",
					"/RWKV-Fine-Tuning/FAQ.md",
				]
			},
			{
				text: 'Community',
				link: '/community/code-of-conduct.html',
				children: [
					"/community/code-of-conduct.md",
					"/community/contribute.md",
					"/community/links.md"
				]
			}
		]
	}),
	bundler: viteBundler(),
	// Adding search
	plugins: [
		searchPlugin({
			// options
		}),
		markdownMathPlugin({
			// options
		  }),
	]
})
