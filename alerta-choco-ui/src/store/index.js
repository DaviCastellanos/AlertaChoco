import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
     mapCenter: []
 },
 getters: {},
 mutations: {
    CHANGE_MAP_CENTER (state, {lat, lon}) {
        this.state.mapCenter = [lat, lon]
    }
 },
 actions: {}
});