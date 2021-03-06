<!-- Base component to call the API services and draw the UI's outline-->

<template>
  <b-container fluid>
    <b-row no-gutters>
      <nav-bar />
    </b-row>
    <div class="d-flex justify-content-center no-gutters">
      <router-view />
    </div>
    <Footer />
  </b-container>
</template>

<script>
//Import UI components and Axios services.
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import AlertsService from '@/services/alerts-service.js';
import PolicyService from '@/services/policy-service.js';
import UsersService from '@/services/users-service.js';
import FollowUpsService from '@/services/follow-ups-service.js';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  watch: {
    //Listener to call the services everytime user access has changed in order to protect private information.
    userAccess(val) {
      if (val) {
        this.alertsRequest();
        this.policiesRequest();
      }

      if (this.$store.getters.user && this.$store.getters.user.role == 'admin') this.usersRequest();
    }
  },
  computed: {
    //Determine user access based on the user role state.
    userAccess() {
      if (!this.$store.getters.user || !this.$store.getters.user.role) return 'public';
      const role = this.$store.getters.user.role;
      if (role === 'admin' || role === 'analista') return 'private';
      if (role === 'defensor') return 'sensitive';
      return null;
    }
  },
  methods: {
    //Called on startup to update the database token and get the initial data.
    async tokenRequest() {
      const token = await AlertsService.getArcgisToken();

      if (!token) {
        return;
      }
      this.$store.commit('SET_ARCGIS_TOKEN', token);
      this.alertsRequest();
      this.followUpIdsRequest();
      this.policiesRequest();
    },
    //Get the alerts information based on the user access.
    async alertsRequest() {
      const response = await AlertsService.getAlerts(this.$store.getters.arcgisToken, this.userAccess);
      if (!response) {
        return;
      }

      this.$store.commit('SET_ALERTS', response.features);
    },
    //Get the policies information based on the user access.
    async policiesRequest() {
      const response = await PolicyService.getPolicies(this.$store.getters.arcgisToken, this.userAccess);
      if (!response) {
        return;
      }
      //console.log('policies are ', response.features);
      this.$store.commit('SET_POLICIES', response.features);
    },
    //Get the current user information only for admin access.
    async usersRequest() {
      const response = await UsersService.getUsers();

      if (!response) {
        return;
      }

      this.$store.commit('SET_USERS', response.features);
    },
    //Get the followup ids regardless user access.
    async followUpIdsRequest() {
      const response = await FollowUpsService.getFollowUpIds(this.$store.getters.arcgisToken);

      if (!response) {
        return;
      }

      this.$store.commit('SET_FOLLOW_UP_IDS', response.features);
    }
  },
  //Hook triggered on startup
  mounted() {
    this.tokenRequest();
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#buttons {
  margin: 2px;
}
</style>
