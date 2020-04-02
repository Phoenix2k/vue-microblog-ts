module.exports = {
  base: '/vue-microblog-ts/',
  locales: {
    '/': {
      description: 'Documentation',
      lang: 'en-GB',
      title: 'Vue Microblog'
    }
  },
  markdown: {
    toc: {
      includeLevel: [2, 3, 4]
    }
  },
  themeConfig: {
    activeHeaderLinks: true,
    docsDir: 'docs',
    editLinks: true,
    locales: {
      '/': {
        editLinkText: 'Edit this page on GitHub',
        label: 'English',
        lastUpdated: 'Last updated',
        nav: [{ text: 'Home', link: '/' }],
        selectText: 'Languages',
        sidebar: [
          {
            title: 'General',
            collapsable: false,
            children: [['/home/', 'Introduction']]
          },
          {
            title: 'Client',
            collapsable: false,
            children: [['/client/', 'Introduction to the client']]
          },
          {
            title: 'Server',
            collapsable: false,
            children: [['/server/', 'Introduction to the server']]
          },
          {
            title: 'Deployment',
            collapsable: false,
            children: [['/deployment/', 'Deploying to Heroku']]
          }
        ]
      }
    },
    repo: 'Phoenix2k/vue-microblog-ts',
    sidebarDepth: 6
  }
};
