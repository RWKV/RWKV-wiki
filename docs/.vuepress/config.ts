import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from '@vuepress/cli'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
	base: '/',
	// Adding internationalization languages
    locales: {
      '/': {
        lang: 'en-US',
      },
      '/zh/': {
        lang: 'zh-CN',
      },
    },
	theme: defaultTheme({
		// Adapting internationalization languages

		locales: {
		  '/': {
			selectLanguageName: 'English',
			selectLanguageText: 'Languages',
        	selectLanguageAriaLabel: 'Languages',

			// Site navbar
			navbar: [
				{ text: 'Main Github', link: 'https://github.com/BlinkDL/RWKV-LM' },
				{ text: 'Hugging Face Integration', link: 'https://huggingface.co/docs/transformers/model_doc/rwkv' },
				{ text: 'Community Discord', link: 'https://discord.gg/bDSBUMeFpc' }
			],

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
						"/advance/finetune.md",
						"/advance/architecture.md"
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
		  },
		  '/zh/': {
			selectLanguageName: '简体中文',
			selectLanguageText: '选择语言',
        	selectLanguageAriaLabel: '选择语言',

			// Site navbar
			navbar: [
				{ text: '项目 Github', link: 'https://github.com/BlinkDL/RWKV-LM' },
				{ text: 'Hugging Face 整合', link: 'https://huggingface.co/docs/transformers/model_doc/rwkv' },
				{ text: '社区 Discord', link: 'https://discord.gg/bDSBUMeFpc' }
			],

			// Sidebar menu
			sidebar: [
				{ text: 'RWKV 语言模型', link: '/zh/' },
				{
					text: '开始使用',
					link: '/zh/basic/play.html',
					children: [
						"/zh/basic/play.md",
						"/zh/basic/integrate.md",
						"/zh/basic/FAQ.md"
					]
				},
				{
					text: '进阶说明',
					link: '/zh/advance/finetune.html',
					children: [
						"/zh/advance/finetune.md",
						"/zh/advance/architecture.md"
					]
				},
				{
					text: '社区',
					link: '/zh/community/code-of-conduct.html',
					children: [
						"/zh/community/code-of-conduct.md",
						"/zh/community/contribute.md",
						"/zh/community/links.md"
					]
				}
			]
		  }
		},

		// Adding docs edit link
		docsRepo: 'https://github.com/RWKV/RWKV-wiki',
		docsBranch: 'main',
		docsDir: 'docs',
		editLinkPattern: ':repo/blob/:branch/:path',

		// Site logo
		logo: "/img/rwkv-avartar-256p.png",

		
	}),

	// Adding search
	plugins: [
		searchPlugin({
			// options
		}),
	]
})
