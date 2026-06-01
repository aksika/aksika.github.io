import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'aksika',
  description: 'AI tools — persistent memory & autonomous bridge',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    search: { provider: 'local' },

    nav: [
      { text: 'abmind', link: '/abmind/' },
      { text: 'abTARS', link: '/abtars/' },
      { text: 'GitHub', link: 'https://github.com/aksika' },
    ],

    sidebar: {
      '/abmind/': [
        {
          text: 'abmind',
          items: [
            { text: 'Overview', link: '/abmind/' },
            { text: 'Why abmind', link: '/abmind/why' },
            { text: 'Installation', link: '/abmind/install' },
            { text: 'Integration Guide', link: '/abmind/integration' },
            { text: 'Memory System', link: '/abmind/memory' },
            { text: 'Sleep Pipeline', link: '/abmind/sleep' },
            { text: 'Session Context', link: '/abmind/session-context' },
            { text: 'Security', link: '/abmind/security' },
            { text: 'CLI Reference', link: '/abmind/cli' },
          ],
        },
      ],
      '/abtars/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/abtars/' },
            { text: 'Why abTARS', link: '/abtars/why' },
            { text: 'Quick Start', link: '/abtars/quickstart' },
            { text: 'Installation', link: '/abtars/install' },
            { text: 'Health Check', link: '/abtars/healthcheck' },
          ],
        },
        {
          text: 'Configuration',
          items: [
            { text: 'Transport', link: '/abtars/transport' },
            { text: 'Models', link: '/abtars/models' },
            { text: 'Users', link: '/abtars/users' },
            { text: 'Platforms', link: '/abtars/platforms' },
            { text: 'Secrets', link: '/abtars/secrets' },
          ],
        },
        {
          text: 'Features',
          items: [
            { text: 'Commands', link: '/abtars/commands' },
            { text: 'Sessions', link: '/abtars/sessions' },
            { text: 'Context Window', link: '/abtars/context' },
            { text: 'Skills', link: '/abtars/skills' },
            { text: 'Tasks', link: '/abtars/tasks' },
            { text: 'Browser', link: '/abtars/browser' },
            { text: 'MCP Integration', link: '/abtars/mcp-integration' },
            { text: 'Agent Swarm', link: '/abtars/agent-swarm' },
            { text: 'Peer Communication', link: '/abtars/peers' },
            { text: 'Peer TLS Setup', link: '/abtars/peers-tls' },
            { text: 'Hooks', link: '/abtars/hooks' },
          ],
        },
        {
          text: 'Operations',
          items: [
            { text: 'Managing', link: '/abtars/managing' },
            { text: 'Architecture', link: '/abtars/architecture' },
            { text: 'Resilience', link: '/abtars/resilience' },
            { text: 'Supervision', link: '/abtars/supervision' },
            { text: 'Logging', link: '/abtars/logging' },
            { text: 'Troubleshooting', link: '/abtars/troubleshooting' },
            { text: 'Usage & Limits', link: '/abtars/usage' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aksika' },
    ],
  },
})
