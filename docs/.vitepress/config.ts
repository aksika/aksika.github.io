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
        { text: 'Overview', link: '/abmind/' },
        { text: 'Why abmind', link: '/abmind/why' },
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/abmind/install' },
            { text: 'Integration Guide', link: '/abmind/integration' },
          ],
        },
        {
          text: 'Core',
          items: [
            { text: 'Memory System', link: '/abmind/memory' },
            { text: 'Memory Lifecycle', link: '/abmind/lifecycle' },
            { text: 'Recall Pipeline', link: '/abmind/recall' },
            { text: 'Classification', link: '/abmind/classification' },
            { text: 'Sleep Pipeline', link: '/abmind/sleep' },
            { text: 'Session Context', link: '/abmind/session-context' },
            { text: 'Hooks', link: '/abmind/hooks' },
            { text: 'Security', link: '/abmind/security' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'Configuration', link: '/abmind/configuration' },
            { text: 'CLI Reference', link: '/abmind/cli' },
            { text: 'Backup & Restore', link: '/abmind/backup' },
            { text: 'Troubleshooting', link: '/abmind/troubleshooting' },
          ],
        },
      ],
      '/abtars/': [
        { text: 'Overview', link: '/abtars/' },
        { text: 'Why abTARS', link: '/abtars/why' },
        {
          text: 'Getting Started',
          items: [
            { text: 'Quick Start', link: '/abtars/quickstart' },
            { text: 'Install: Stable — 0.3.3', link: '/abtars/install' },
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
            { text: 'Mid-Run Steering', link: '/abtars/mid-run-steering' },
            { text: 'Skills', link: '/abtars/skills' },
            { text: 'Tasks', link: '/abtars/tasks' },
            { text: 'Todo', link: '/abtars/todo' },
            { text: 'Voice (STT/TTS)', link: '/abtars/voice' },
            { text: 'Browser', link: '/abtars/browser' },
            { text: 'Dashboard', link: '/abtars/dashboard' },
            { text: 'Sleep (Dreamy)', link: '/abtars/sleep' },
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
            { text: 'Deploy Pipeline', link: '/abtars/deploy' },
            { text: 'Architecture', link: '/abtars/architecture' },
            { text: 'Boot Phases', link: '/abtars/boot' },
            { text: 'Capabilities', link: '/abtars/capabilities' },
            { text: 'Resilience', link: '/abtars/resilience' },
            { text: 'Supervision', link: '/abtars/supervision' },
            { text: 'Logging', link: '/abtars/logging' },
            { text: 'Troubleshooting', link: '/abtars/troubleshooting' },
            { text: 'Usage & Limits', link: '/abtars/usage' },
            { text: 'Upgrading', link: '/abtars/upgrade' },
          ],
        },
        {
          text: 'Platforms',
          items: [
            { text: 'IRC', link: '/abtars/irc' },
            { text: 'Adding a Service', link: '/abtars/add-service' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aksika' },
    ],
  },
})
