import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
darkUnica(Highcharts);
Vue.use(IconsPlugin)
Vue.use(HighchartsVue)
Vue.use(BootstrapVue)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
