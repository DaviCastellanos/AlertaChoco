import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import _ from 'lodash';
import { Object } from 'core-js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: Object,
    user: null,
    newUser: null,
    arcgisToken: String,
    currentView: 'map',
    appError: String
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
    appError(state) {
      return state.appError;
    },
    alertById: state => id => {
      return _.find(state.alerts, { attributes: { idAlerta: id } });
    }
  },
  mutations: {
    SET_USER(state, newUser) {
      this.state.user = newUser;
      if (this.state.user && this.state.newUser) {
        firebase.auth().currentUser.updateProfile({
          photoURL: this.state.newUser.role,
          displayName: this.state.newUser.displayName
        });

        this.state.user.role = this.state.newUser.role;
        this.state.user.displayName = this.state.newUser.displayName;
        this.state.newUser = null;
      }
    },
    SET_ALERTS(state, alerts) {
      //console.log(alerts);
      this.state.alerts = alerts;
    },
    SET_ARCGIS_TOKEN(state, token) {
      this.state.arcgisToken = token;
    },
    SET_CURRENT_VIEW(state, view) {
      this.state.currentView = view;
    },
    SET_APP_ERROR(state, err) {
      console.error('App Error', err);
      this.state.appError = err;
      return new Promise(() => {
        setTimeout(() => {
          this.state.appError = null;
        }, 5000);
      });
    }
  },
  actions: {
    signUserOut() {
      firebase
        .auth()
        .signOut()
        .catch(err => {
          console.error('Error signing out' + err);
        });
    },
    signUserIn(obj, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch(err => {
          console.error('Error signing in', err);
          this.state.appError = err;
          return new Promise(() => {
            setTimeout(() => {
              this.state.appError = null;
            }, 5000);
          });
        });
    },
    signUserUp(obj, payload) {
      const newUser = {
        displayName: payload.displayName,
        role: payload.role
      };
      this.state.newUser = newUser;
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .catch(err => {
          console.error('Error signing up' + err);
        });
    }
  }
});
