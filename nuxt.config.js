module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'developerJobs',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Nuxt.js project'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.proxy.ustclug.org/css?family=Roboto:300,400,500,700|Material+Icons'
    }]
  },
  router: {
    // middleware: 'auth'
  },
  plugins: ['~plugins/vuetify.js'],
  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/yue.css',
    '~/assets/style/app.styl'
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#ff9800'
  },
  /*
   ** Add axios globally
   */
  build: {
    vendor: ['axios', 'vuetify', 'native-toast', 'timeago.js'],
    extractCSS: true,
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
