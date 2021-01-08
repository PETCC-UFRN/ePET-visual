const changeLoaderOptions = loaders => {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === 'sass-loader') {
        Object.assign(loader.options, {
          includePaths: ['./assets']
        })
      }
    }
  }
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'ePET',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Plataforma do Programa de Educação Tutorial do curso de Ciência da Computação da Universidade Federal do Rio Grande do Norte (UFRN)' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  /*
  ** Set the link active classes
  */
  router: {
    linkActiveClass: 'active open'
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#42A5CC' },

  /**
   * Import CSS
   */
  css: [
    /* Import Font Awesome Icons Set */
    '~/node_modules/flag-icon-css/css/flag-icon.min.css',
    /* Import Font Awesome Icons Set */
    '~/node_modules/font-awesome/css/font-awesome.min.css',
    /* Import Simple Line Icons Set */
    '~/node_modules/simple-line-icons/css/simple-line-icons.css',
    /* Import Bootstrap Vue Styles */
    '~/node_modules/bootstrap-vue/dist/bootstrap-vue.css',
    /* Import Core SCSS */
    { src: '~/assets/scss/style.scss', lang: 'scss' },
    '~/static/css/index/style.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.js',
    { src: '~/plugins/vcalendar.js', ssr: false },
    {src: '@/plugins/cookie-law', mode: 'client'}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://github.com/bootstrap-vue/bootstrap-vue
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: "https://petcc.dimap.ufrn.br:8443/api/"
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'sign-in', method: 'post', propertyName: false },
          logout: false,
          user: false
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
  },

  /*
  ** Style resources configuration
  */
  styleResources: {
    scss: './assets/scss/style.scss'
  },

  /*
  ** Build configuration
  */
  build: {
    // transpile: ['vcalendar'],
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        const vueLoader = config.module.rules.find(
          ({ loader }) => loader === 'vue-loader')
        const { options: { loaders } } = vueLoader || { options: {} }

        if (loaders) {
          for (const loader of Object.values(loaders)) {
            changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
          }
        }

        config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
      }
    }
  }
}
