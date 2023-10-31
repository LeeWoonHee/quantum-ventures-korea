import Vue from 'vue'
import App from './App.vue'

import Vuesax from 'vuesax'
// Vuesax Component Framework
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax

Vue.use(Vuesax)
//apex chart
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)


Vue.component('apexchart', VueApexCharts)
//v scroll stop
import VueScrollStop from 'vue-scroll-stop'


Vue.use(VueScrollStop)

// Vuex Store
import store from './store/store'

// axios
import axios from './axios'

// Vue Router
import router from './router'

import VueAuth from '@/modules/else/VueAuth'

Vue.use(VueAuth)

Vue.prototype.$http = axios

// Theme Configurations
import '../themeConfig.js'

// Vue Lodash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// number animation
// import VueNumber from 'vue-number-animation'
//
// Vue.use(VueNumber)

//vue virtual scroller
import {DynamicScroller, DynamicScrollerItem, RecycleScroller} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.component('RecycleScroller', RecycleScroller)
Vue.component('DynamicScroller', DynamicScroller)
Vue.component('DynamicScrollerItem', DynamicScrollerItem)
Vue.config.productionTip = false

//vue infinite scroll


// kinesis
import VueKinesis from 'vue-kinesis'

Vue.use(VueKinesis)

Vue.use(VueLodash, {lodash})

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

// Tailwind
import '@/assets/css/main.css'
//vue select style
import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css'

Vue.component('v-select', vSelect)


Vue.prototype.$window = window

//vue easy table
import 'vue-easytable/libs/theme-default/index.css' // import style

import {VeTable, VePagination, VeIcon, VeLoading, VeLocale} from 'vue-easytable' // import library

Vue.use(VeTable)
Vue.use(VePagination)
Vue.use(VeIcon)
Vue.use(VeLoading)

// //acl
// import ACL, {ACLRule} from '@/plugins/acl'
//
// Vue.use(ACL, {
//   router,
//   rules: [
//     new ACLRule('user', () => {
//         return (store.state.auth || {
//           isUserLoggedIn: () => false
//         }).isUserLoggedIn()
//       }, {
//         redirect: '/login'
//       }
//     ),
//     new ACLRule('guest', () => {
//       return !(store.state.auth || {
//         isUserLoggedIn: () => false
//       }).isUserLoggedIn()
//     }, {
//       redirect: ''
//     })
//   ],
//   redirect: '/login'
// })

// v-touch
import VueTouch from 'vue-touch'

Vue.use(VueTouch, {name: 'v-touch'})

// moment js
import vueMoment from 'vue-moment'

Vue.use(vueMoment)

import LoadScript from './modules/VueLoadScript'

Vue.use(LoadScript)


import VeeValidate from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko'

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    ko
  }
})


// import { UniformPlugin } from '@shader-art/plugin-uniform'
// import { ShaderArt } from "shader-art"
// ShaderArt.register([() => new UniformPlugin()]);

// gsap
// import gsap from 'gsap'
// import {ScrollTrigger} from 'gsap/ScrollTrigger'
// import {MotionPathPlugin} from 'gsap/MotionPathPlugin'
// import CSSRulePlugin from 'gsap/CSSRulePlugin'
//
// Vue.prototype.$gsap = gsap
// Vue.prototype.$scrollTrigger = ScrollTrigger
// Vue.prototype.$motionPlugin = MotionPathPlugin
// Vue.prototype.$cSSRulePlugin = CSSRulePlugin
//
// // default is "resize,visibilitychange,DOMContentLoaded,load" so we can remove "resize" from the list:
// Vue.prototype.$scrollTrigger.config({
//   ignoreMobileResize: true
// })
//
// Vue.prototype.$gsap.registerPlugin(Vue.prototype.$scrollTrigger, Vue.prototype.$motionPlugin, Vue.prototype.$cSSRulePlugin)
// Vue.prototype.$gsap.core.globals('ScrollTrigger', Vue.prototype.$scrollTrigger)
// Vue.prototype.$gsap.core.globals('MotionPathPlugin', Vue.prototype.$motionPlugin)
// Vue.prototype.$gsap.core.globals('CSSRulePlugin', Vue.prototype.$cSSRulePlugin)

// i18n
import i18n from './i18n/i18n'

// Vuexy Admin Filters
import './filters/filters'

// Vuejs - Vue wrapper for hammerjs
// import {VueHammer} from 'vue2-hammer'
//
// Vue.use(VueHammer)

// Vue.config.errorHandler = (err) => alert(err)
// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import VueGsap from './else/modules/vue/VueGsap'

// Feather font icon
// require('./assets/css/iconfont.css')

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
