module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  head: [
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '指南',
        items:[
          { text: '指南', link: '/zh/guide' },
          { text: '快速安装', link: '/zh/start' },
          { text: 'api', link: '/zh/api' }
        ]
      },
    ],
    // navbar: true,
    // sidebar: [
    //   '/',
    //   '/',
    //   ['/zh/start', 'Explicit link text']
    // ],
    // displayAllHeaders: true,
  },

}