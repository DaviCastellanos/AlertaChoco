import Vue from 'vue';
import App from './App.vue';
import * as firebase from 'firebase';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import darkUnica from 'highcharts/themes/high-contrast-light';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './style/custom.scss';
import router from './router';
import frozen from './mixins/frozen.js';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
darkUnica(Highcharts);
Vue.use(IconsPlugin);
Vue.use(HighchartsVue);
Vue.use(BootstrapVue);

Vue.mixin({
  methods: {
    FormatForm(str) {
      //let upper = str.charAt(0).toUpperCase() + str.slice(1);
      let upper = str.replace('_', ' ');
      //console.log(upper);
      return upper;
    },
    FormatAsDate(miliseconds) {
      miliseconds = parseInt(miliseconds);
      if (!miliseconds) return 'N/A';
      const dt = new Date(miliseconds);
      return dt.getUTCDate() + '/' + (dt.getUTCMonth() + 1) + '/' + dt.getUTCFullYear();
    },
    FormatDateForDB(str) {
      if (str.includes('-')) {
        const date = str.split('-');

        if (date[1] && date[1][0] == '0') date[1] = date[1][1];

        if (date[2] && date[2][0] == '0') date[2] = date[2][1];
        const newDate = date[1] + '/' + date[2] + '/' + date[0];
        //console.log('1 returning' + newDate);
        return newDate;
      } else {
        const dt = new Date(parseInt(str));
        const formated = dt.getUTCMonth() + 1 + '/' + dt.getUTCDate() + '/' + dt.getUTCFullYear();
        //console.log('2 returning' + formated);
        return formated;
      }
    },
    FormatForDB(str) {
      const lower = str.toString().toLowerCase();
      return lower.replace(/ /g, '_');
    },
    FormatForHuman(str) {
      if (!str || typeof str !== 'string') return 'N/A';

      if (str === 'True') return 'Si';

      if (str === 'False') return 'No';

      if (str.includes('firebase')) return `<a href="${str}" target="_blank">Multimedia</a>`;

      return str.replace(/_/g, ' ');
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  mixins: [frozen],
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBlZRLdDeTs76Ntzm3udLA5tPwzCyUJke0',
      authDomain: 'alertachoco.firebaseapp.com',
      databaseURL: 'https://alertachoco.firebaseio.com',
      projectId: 'alertachoco',
      storageBucket: 'alertachoco.appspot.com'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const newUser = {
          email: user.email,
          id: user.uid,
          role: user.photoURL
        };
        this.$store.commit('SET_USER', newUser);
      } else {
        this.$store.commit('SET_USER', null);
        this.$store.commit('SET_CURRENT_VIEW', 'map');
      }
    });
  }
}).$mount('#app');
