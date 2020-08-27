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
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import AlertsService from '@/services/alerts-service.js';
import UsersService from '@/services/users-service.js';
import FollowUpsService from '@/services/follow-ups-service.js';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  watch: {
    userAccess(val) {
      if (val) {
        this.alertsRequest();
      }
    }
  },
  computed: {
    userAccess() {
      if (!this.$store.getters.user || !this.$store.getters.user.role) return 'public';
      const role = this.$store.getters.user.role;
      if (role === 'admin' || role === 'analista') return 'private';
      if (role === 'defensor') return 'sensitive';
      return null;
    }
  },
  methods: {
    async tokenRequest() {
      const token = await AlertsService.getArcgisToken();

      if (!token) {
        console.error('Arcgis token is null');
        return;
      }
      this.$store.commit('SET_ARCGIS_TOKEN', token);
      this.alertsRequest();
      this.followUpIdsRequest();
    },
    async alertsRequest() {
      const response = await AlertsService.getAlerts(this.$store.getters.arcgisToken, this.userAccess);

      if (!response) {
        console.error('Alerts response is null');
        return;
      }

      //console.log(response.features);

      this.$store.commit('SET_ALERTS', response.features);
    },
    async usersRequest() {
      const response = await UsersService.getUsers(this.$store.getters.arcgisToken);

      if (!response) {
        console.error('Users response is null');
        return;
      }

      this.$store.commit('SET_USERS', response.features);
    },
    async followUpIdsRequest() {
      const response = await FollowUpsService.getFollowUpIds(this.$store.getters.arcgisToken);

      if (!response) {
        console.error('Folow up ids response is null');
        return;
      }

      this.$store.commit('SET_FOLLOW_UP_IDS', response.features);
    }
  },
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
