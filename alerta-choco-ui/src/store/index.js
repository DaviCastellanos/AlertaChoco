import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import _ from 'lodash';
import { Object } from 'core-js';
import UsersService from '@/services/users-service.js';
import usersService from '../services/users-service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: Object,
    user: null,
    arcgisToken: String,
    currentView: 'map',
    appError: String,
    users: null,
    followUpIds: null,
    followUps: null,
    updateNeeded: false,
    policies: null
  },
  getters: {
    updateNeeded(state) {
      return state.updateNeeded;
    },
    followUpIds(state) {
      return state.followUpIds;
    },
    followUps(state) {
      return state.followUps;
    },
    policies(state) {
      return state.policies;
    },
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
    policyById: state => id => {
      id = parseInt(id);
      return _.find(state.policies, { attributes: { OBJECTID: id } });
    },
    followUpById: state => id => {
      id = parseInt(id);
      return _.find(state.followUps, { OBJECTID: id });
    },
    findUserByEmail: state => email => {
      return _.find(state.users, { attributes: { email: email } });
    }
  },
  mutations: {
    SET_USER(state, newUser) {
      this.state.user = newUser;
    },
    SET_POLICIES(state, policies) {
      //console.log('policies', policies);
      this.state.policies = policies;
    },
    SET_FOLLOW_UPS(state, followUps) {
      //console.log('policies', policies);
      this.state.followUps = followUps;
    },
    SET_UPDATE_NEEDED(state, bool) {
      this.state.updateNeeded = bool;
    },
    SET_ALERTS(state, alerts) {
      //console.log('Setting alerts', alerts);
      this.state.alerts = alerts;
    },
    SET_USERS(state, users) {
      console.log('SET_USERS', users);
      this.state.users = users;
    },
    SET_FOLLOW_UP_IDS(state, ids) {
      //console.log('SET_FOLLOW_UP_IDS', ids);
      this.state.followUpIds = ids;
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
    deleteAccount({ commit }) {
      const id = this.state.user.OBJECTID;
      firebase
        .auth()
        .currentUser.delete()
        .then(() => {
          UsersService.deleteUser(id);
        })
        .catch(err => {
          console.error('Error signing out ' + err);
          commit('SET_APP_ERROR', err);
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
    async changeUserPassword(obj, payload) {
      await firebase.auth().signInWithEmailAndPassword(payload.email, payload.oldPassword);

      var user = firebase.auth().currentUser;

      if (!user) {
        console.error('Error signing in user is null');
        this.state.appError = 'User is null';
        return new Promise(() => {
          setTimeout(() => {
            this.state.appError = null;
          }, 5000);
        });
      }

      user.updatePassword(payload.password).catch(function(err) {
        console.error('Error signing in', err);
        this.state.appError = err;
        return new Promise(() => {
          setTimeout(() => {
            this.state.appError = null;
          }, 5000);
        });
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
    async signUserUp({ commit }, payload) {
      //console.log('Signing user up with', payload);
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

      const response = await secondaryApp
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .catch(err => {
          console.error('Error signing up' + err);
        });

      if (!response) {
        secondaryApp.auth().signOut();
        secondaryApp.delete();
        return;
      }

      const arcgisUser = await UsersService.saveUser(payload.email, payload.role, payload.anansiCode, payload.tel, payload.displayName);

      secondaryApp.auth().currentUser.updateProfile({
        displayName: payload.displayName + '/' + payload.role + '/' + arcgisUser.addResults[0].objectId + '/' + payload.anansiCode + '/' + payload.tel
      });

      secondaryApp.auth().signOut();
      secondaryApp.delete();

      const usersResponse = await usersService.getUsers();
      if (usersResponse) commit('SET_USERS', usersResponse.features);
    }
  }
});
