import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import HighchartsVue from 'highcharts-vue'
import VueLodash from 'vue-lodash'
import Highcharts from "highcharts"
import darkUnica from "highcharts/themes/high-contrast-light"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style/custom.scss'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
darkUnica(Highcharts);
Vue.use(IconsPlugin)
Vue.use(HighchartsVue)
Vue.use(BootstrapVue)
Vue.use(VueLodash)

new Vue({
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBlZRLdDeTs76Ntzm3udLA5tPwzCyUJke0',
      authDomain: 'alertachoco.firebaseapp.com',
      databaseURL: 'https://alertachoco.firebaseio.com',
      projectId: 'alertachoco',
      storageBucket: 'alertachoco.appspot.com'
    })
  }
}).$mount('#app')
