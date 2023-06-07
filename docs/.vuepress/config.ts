import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from '@vuepress/cli'
import { searchPlugin } from '@vuepress/plugin-search'

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
			{ text: 'RWKV Lanugage Model', link: '/' },
			{ 
				text: 'Getting Started', 
				link: '/basic/play.html',
				children: [
					"/basic/play.md",
					"/basic/integrate.md",
					"/basic/FAQ.md"
				]
			},
			{ 
				text: 'Advanced', 
				link: '/advance/finetune.html',
				children: [
					"/advance/finetune.md"
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

	// Adding search
	plugins: [
		searchPlugin({
			// options
		}),
	]
})
