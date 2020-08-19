import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import _ from 'lodash';
import { Object } from 'core-js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: Object,
    user: null,
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
      var secondaryApp = firebase.initializeApp(
        {
          apiKey: 'AIzaSyBlZRLdDeTs76Ntzm3udLA5tPwzCyUJke0',
          authDomain: 'alertachoco.firebaseapp.com',
          databaseURL: 'https://alertachoco.firebaseio.com',
          projectId: 'alertachoco',
          storageBucket: 'alertachoco.appspot.com'
        },
        'Secondary'
      );

      secondaryApp
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          secondaryApp.auth().currentUser.updateProfile({
            photoURL: payload.role,
            displayName: payload.displayName
          });
          secondaryApp.auth().signOut();
          secondaryApp.delete();
        })
        .catch(err => {
          console.error('Error signing up' + err);
        });
    }
  }
});
