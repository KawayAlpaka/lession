module.exports = {
//   parser: 'sugarss',
  plugins: {
    // 'postcss-import': {},
    // 'postcss-cssnext': {},
    'autoprefixer': {
      browsers:[
        'last 10 version',
        "Explorer >= 8",
        "iOS >= 8",
        "Firefox >= 20",
        "Android > 4.4"
      ]
    },
    // 'cssnano': {}
  }
}
