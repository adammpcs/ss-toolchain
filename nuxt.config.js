const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Environment Files
  */
 env: {
 },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [ ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/semantic-ui',
    '~/plugins/date-filter'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/apollo'
  ],

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },
  generate: {
    routes: [
      '/about-us',
      '/gallery',
      '/privacy-policy'
    ]
  }
}
