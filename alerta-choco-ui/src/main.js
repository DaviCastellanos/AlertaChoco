import Vue from "vue";
import App from "./App.vue";
import * as firebase from "firebase";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/high-contrast-light";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./style/custom.scss";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
darkUnica(Highcharts);
Vue.use(IconsPlugin);
Vue.use(HighchartsVue);
Vue.use(BootstrapVue);

Vue.mixin({
  methods: {
    FormatForDB(str) {
      const lower = str.toString().toLowerCase();
      return lower.replace(/ /g, "_");
    },
    FormatForHuman(str) {
      if (!str) return "N/A";

      if (str === "True") return "Si";

      if (str === "False") return "No";

      if (str.includes("firebase"))
        return `<a href="${str}" target="_blank">Multimedia</a>`;

      return str.replace(/_/g, " ");
    },
  },
});

new Vue({
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBlZRLdDeTs76Ntzm3udLA5tPwzCyUJke0",
      authDomain: "alertachoco.firebaseapp.com",
      databaseURL: "https://alertachoco.firebaseio.com",
      projectId: "alertachoco",
      storageBucket: "alertachoco.appspot.com",
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdTokenResult(true)
          .then((tokenResult) => {
            const newUser = {
              email: user.email,
              id: user.uid,
              role: tokenResult.claims.role,
            };

            this.$store.commit("SET_USER", newUser);
          });
      } else {
        this.$store.commit("SET_USER", null);
      }
    });
  },
}).$mount("#app");
