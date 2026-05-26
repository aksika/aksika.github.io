import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'aksika',
  description: 'AI tools — persistent memory & autonomous bridge',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    nav: [
      { text: 'abmind', link: '/abmind/' },
      { text: 'abtars', link: '/abtars/' },
      { text: 'GitHub', link: 'https://github.com/aksika' },
    ],

    sidebar: {
      '/abmind/': [
        {
          text: 'abmind',
          items: [
            { text: 'What is abmind?', link: '/abmind/' },
            { text: 'Why abmind?', link: '/abmind/why' },
            { text: 'Installation', link: '/abmind/install' },
            { text: 'Integration Guide', link: '/abmind/integration' },
            { text: 'CLI Reference', link: '/abmind/cli' },
            { text: 'Memory System', link: '/abmind/memory' },
            { text: 'Sleep & Dreams', link: '/abmind/sleep' },
          ],
        },
      ],
      '/abtars/': [
        {
          text: 'abtars',
          items: [
            { text: 'What is abTARS?', link: '/abtars/' },
            { text: 'Important Notes', link: '/abtars/important' },
            { text: 'Quick Setup Guide', link: '/abtars/quickstart' },
            { text: 'Why abTARS?', link: '/abtars/why' },
            { text: 'Architecture', link: '/abtars/architecture' },
            { text: 'Installation', link: '/abtars/install' },
            { text: 'Commands', link: '/abtars/commands' },
            { text: 'Sessions', link: '/abtars/sessions' },
            { text: 'Transport Config', link: '/abtars/transport' },
            { text: 'Model Management', link: '/abtars/models' },
            { text: 'Platforms', link: '/abtars/platforms' },
            { text: 'Scheduled Tasks', link: '/abtars/tasks' },
            { text: 'Skills', link: '/abtars/skills' },
            { text: 'Hooks', link: '/abtars/hooks' },
            { text: 'Multi-User', link: '/abtars/users' },
            { text: 'Peer-to-Peer', link: '/abtars/peers' },
            { text: 'Browser Agent', link: '/abtars/browser' },
            { text: 'Context Window', link: '/abtars/context' },
            { text: 'Process Supervision', link: '/abtars/supervision' },
            { text: 'Secrets Vault', link: '/abtars/secrets' },
            { text: 'Token Usage', link: '/abtars/usage' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aksika' },
    ],

    search: {
      provider: 'local',
    },
  },
})
