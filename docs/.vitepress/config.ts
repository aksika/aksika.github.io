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
            { text: 'Embeddings', link: '/abmind/embeddings' },
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
          text: 'Installation',
          items: [
            { text: 'Quick Start', link: '/abtars/quickstart' },
            { text: 'Installation', link: '/abtars/install' },
            { text: 'Do I Need sudo?', link: '/abtars/no-sudo' },
            { text: 'Health Check', link: '/abtars/healthcheck' },
            { text: 'Upgrading', link: '/abtars/upgrade' },
            { text: 'Backup & Restore', link: '/abtars/backup' },
            { text: 'Stop & Uninstall', link: '/abtars/stop-uninstall' },
            { text: 'Install Troubleshooting', link: '/abtars/troubleshooting' },
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
            { text: 'Security', link: '/abtars/security' },
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
            { text: 'Kanban Board', link: '/abtars/kanban' },
            { text: 'Todo', link: '/abtars/todo' },
            { text: 'Budget', link: '/abtars/budget' },
            { text: 'Voice (STT/TTS)', link: '/abtars/voice' },
            { text: 'Browser', link: '/abtars/browser' },
            { text: 'Dashboard', link: '/abtars/dashboard' },
            { text: 'Sleep (Dreamy)', link: '/abtars/sleep' },
            { text: 'MCP Integration', link: '/abtars/mcp-integration' },
            { text: 'Agent Swarm', link: '/abtars/agent-swarm' },
            { text: 'Artifacts', link: '/abtars/artifacts' },
            { text: 'Peer Communication', link: '/abtars/peers' },
            { text: 'Peer TLS Setup', link: '/abtars/peers-tls' },
            { text: 'Hooks', link: '/abtars/hooks' },
          ],
        },
        {
          text: 'Operations',
          items: [
            { text: 'Managing', link: '/abtars/managing' },
            { text: 'Logging', link: '/abtars/logging' },
            { text: 'Usage & Limits', link: '/abtars/usage' },
            { text: 'Deploy Pipeline', link: '/abtars/deploy' },
            { text: 'Architecture', link: '/abtars/architecture' },
            { text: 'Boot Phases', link: '/abtars/boot' },
            { text: 'Capabilities', link: '/abtars/capabilities' },
            { text: 'Resilience', link: '/abtars/resilience' },
            { text: 'Supervision', link: '/abtars/supervision' },
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
