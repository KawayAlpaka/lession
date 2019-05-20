module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  head: [
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
      {
        text: 'Languages',
        items: [
          {
            text: '亚洲', items: [
              { text: 'Chinese', link: '/language/chinese' },
              { text: 'Japanese', link: '/language/japanese' }
            ]
          },
        ]
      }
    ],
    // navbar: true,
    sidebar: [
      '/',
      '/',
      ['/zh/guide/start', 'Explicit link text']
    ],
    displayAllHeaders: true,
  },

}