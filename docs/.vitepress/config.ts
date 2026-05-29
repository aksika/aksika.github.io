import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'aksika',
  description: 'AI tools — persistent memory & autonomous bridge',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    nav: [
      { text: 'abmind', link: 'https://github.com/aksika/abmind/tree/dev/docs/wiki' },
      { text: 'abtars', link: 'https://github.com/aksika/abtars/tree/dev/docs/wiki' },
      { text: 'GitHub', link: 'https://github.com/aksika' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aksika' },
    ],
  },
})
