import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from '@vuepress/cli'

export default defineUserConfig({
	theme: defaultTheme({
		sidebar: [
			{ text: 'RWKV Lanugage Model', link: '/' },
			{ 
				text: 'Getting Started', 
				link: '/basic/play.md',
				children: [
					"/basic/play.md",
					"/basic/integrate.md",
					"/basic/api-host.md"
				]
			},
			{ 
				text: 'Advanced', 
				link: '/advance/',
				children: [
					"/advance/finetune-lora.md"
				]
			},
		]
	})
})