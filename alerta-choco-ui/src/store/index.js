import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import _ from 'lodash';
import { Object } from 'core-js';
import UsersService from '@/services/users-service.js';
//import usersService from '../services/users-service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: Object,
    user: null,
    arcgisToken: String,
    currentView: 'map',
    appError: String,
    users: null
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
    users(state) {
      return state.users;
    },
    appError(state) {
      return state.appError;
    },
    alertById: state => id => {
      return _.find(state.alerts, { attributes: { idAlerta: id } });
    },
    findUserByEmail: state => email => {
      return _.find(state.users, { attributes: { email: email } });
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
    SET_USERS(state, users) {
      //console.log('SET_USERS', users);
      this.state.users = users;
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
    deleteAccount() {
      // console.log('looking for user ' + firebase.auth().currentUser.email);
      // const user = _.find(this.state.users, { attributes: { email: firebase.auth().currentUser.email } });
      // console.log('Deleting user ' + user.OBJECTID);
      firebase
        .auth()
        .currentUser.delete()
        .then(() => {
          //usersService.deleteUser(user.OBJECTID);
        })
        .catch(err => {
          console.error('Error signing out' + err);
        });
    },
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
          UsersService.saveUser(payload.email, payload.role);

          secondaryApp.auth().signOut();
          secondaryApp.delete();
        })
        .catch(err => {
          console.error('Error signing up' + err);
        });
    }
  }
});
