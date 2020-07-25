import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: Object,
    mapCenter: [],
    user: null,
    arcgisToken: String,
  },
  getters: {
    user(state) {
      return state.user;
    },
    arcgisToken(state) {
      return state.arcgisToken;
    },
    alerts(state) {
      return state.alerts;
    },
  },
  mutations: {
    CHANGE_MAP_CENTER(state, { lat, lon }) {
      this.state.mapCenter = [lat, lon];
    },
    SET_USER(state, newUser) {
      if (newUser)
        console.log("Setting new user " + newUser.role + " " + newUser.email);
      else console.log("User is null");

      this.state.user = newUser;
    },
    SET_ALERTS(state, alerts) {
      this.state.alerts = alerts;
    },
    SET_ARCGIS_TOKEN(state, token) {
      this.state.arcgisToken = token;
    },
  },
  actions: {
    signUserOut() {
      firebase
        .auth()
        .signOut()
        .catch((err) => {
          console.error("Error signing out" + err);
        });
    },
    signUserIn(obj, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch((err) => {
          console.error("Error signing in" + err);
        });
    },
    signUserUp(obj, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .catch((err) => {
          console.error("Error signing up" + err);
        });
    },
  },
});
