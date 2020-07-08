import Vue from "vue";
import Vuex from "vuex";
import * as firebase from 'firebase'
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
     alerts: Object,
     mapCenter: [],
     user: null
 },
 getters: {
     user (state) {
        return state.user
     },
     alerts (state) {
         return state.alerts
     }
 },
 mutations: {
    CHANGE_MAP_CENTER (state, {lat, lon}) {
        this.state.mapCenter = [lat, lon]
    },
    SET_USER (state, newUser) {
        this.state.user = newUser
    },
    SET_ALERTS (state, alerts) {
        this.state.alerts = alerts
    }
 },
 actions: {
     signUserIn ({commit}, payload) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
            user => {
                const newUser = {
                    id: user.uid
                }
                commit('SET_USER', newUser)
            } 
        )
        .catch(
            error => {
                console.log(error)
            }
        )
     }
 }
});