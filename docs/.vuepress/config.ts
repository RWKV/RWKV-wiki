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
				link: '/basic/play.html',
				children: [
					"/basic/play.md",
					"/basic/integrate.md",
					"/basic/FAQ.md",
				]
			},
			{ 
				text: 'Advanced', 
				link: '/advance/finetune.html',
				children: [
					"/advance/finetune.md",
					"/advance/architecture.md"
				]
			},
			{ 
				text: 'Inference', 
				link: '/inference/llamacpp.html',
				children: [
					"/inference/llamacpp.md",
					"/inference/ollama.md",
					"/inference/sillytraven.md",
					"/inference/text-generation-webui.md",
					"/inference/koboldcpp.md"
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
