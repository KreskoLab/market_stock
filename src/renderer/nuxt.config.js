/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
  ssr: false,
  components: true,
  target: 'static',
  head: {
    title: 'market',
    meta: [{ charset: 'utf-8' }]
  },
  loading: false,
  css: [
    '@/assets/main.css'
  ],
  plugins: [

  ],
  buildModules: [
    'nuxt-windicss'
  ],
  modules: [

  ]
}
