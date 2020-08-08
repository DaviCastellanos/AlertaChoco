import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: Object,
    user: null,
    arcgisToken: String,
    currentView: "map",
  },
  getters: {
    currentView(state) {
      return state.currentView;
    },
    user(state) {
      return state.user;
    },
    arcgisToken(state) {
      return state.arcgisToken;
    },
    alerts(state) {
      return state.alerts;
    },
    alertById: (state) => (id) => {
      return _.find(state.alerts, { attributes: { idAlerta: id } });
    },
  },
  mutations: {
    SET_USER(state, newUser) {
      this.state.user = newUser;
    },
    SET_ALERTS(state, alerts) {
      this.state.alerts = alerts;
    },
    SET_ARCGIS_TOKEN(state, token) {
      this.state.arcgisToken = token;
    },
    SET_CURRENT_VIEW(state, view) {
      this.state.currentView = view;
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
