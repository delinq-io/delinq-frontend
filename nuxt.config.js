export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'delinq.io',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/global.css',
    '~/assets/css/transitions.css',
    '~/assets/css/toasts.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vee-validate.js', ssr: false },
    { src: '~/plugins/directives.js', ssr: false },
    { src: '~/plugins/global-mixins.js', ssr: false },
    { src: '~/plugins/global-toasts.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{
    path: '~/components',
    extensions: ['vue'],
    pathPrefix: false
  }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/date-fns-module
    '@nuxtjs/date-fns',
    // https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth',
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    '@nuxtjs/toast',
    // https://pwa.nuxtjs.org/setup
    '@nuxtjs/pwa'
  ],

  pwa: {
    workbox: false
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true
  },

  // Auth module configuration (https://auth.nuxtjs.org/schemes/local)
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: 'user' }
        },
        tokenRequired: false,
        tokenType: false,
        autoFetchUser: true
      }
    }
  },

  // Fontawesome icons configuration
  fontawesome: {
    icons: {
      solid: ['faCaretDown', 'faAngleDown', 'faPlus', 'faTimes', 'faCog', 'faSignOutAlt',
        'faSun', 'faMoon'],
      brands: ['faGithub']
    }
  },

  // @nuxtjs/color-mode + tailwindcss
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    storageKey: 'nuxt-color-mode'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ]
  },
  env: {
    API_URL: process.env.API_URL
  }
}
