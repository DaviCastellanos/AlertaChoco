<template>
  <b-container fluid>
    <web-map v-show="mapSelected" />
    <feed-chart v-show="statsSelected" />
    <reports v-show="tableSelected" />
    <users-table v-show="usersSelected" />
  </b-container>
</template>

<script>
import WebMap from '@/components/WebMap.vue';
import Reports from '@/components/Reports.vue';
import FeedChart from '@/components/FeedChart.vue';
import UsersTable from '@/components/UsersTable.vue';
import AlertsService from '@/services/alerts-service.js';
import UsersService from '@/services/users-service.js';
import FollowUpsService from '@/services/follow-ups-service.js';

export default {
  name: 'App',
  components: {
    WebMap,
    Reports,
    FeedChart,
    UsersTable
  },
  watch: {
    userAccess(val) {
      if (val) {
        this.alertsRequest();
      }
    },
    userRole(val) {
      if (val === 'admin') this.usersRequest();
    }
  },
  computed: {
    mapSelected() {
      return this.$store.getters.currentView === 'map';
    },
    statsSelected() {
      return this.$store.getters.currentView === 'statistics';
    },
    tableSelected() {
      return this.$store.getters.currentView === 'table';
    },
    usersSelected() {
      return this.$store.getters.currentView === 'users';
    },
    userAccess() {
      if (!this.$store.getters.user || !this.$store.getters.user.role) return 'public';
      const role = this.$store.getters.user.role;
      if (role === 'admin' || role === 'analista') return 'private';
      if (role === 'defensor') return 'sensitive';
      return null;
    },
    userRole() {
      if (!this.$store.getters.user) return null;

      return this.$store.getters.user.role;
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
