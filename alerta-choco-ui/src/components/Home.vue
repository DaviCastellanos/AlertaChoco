<template>
  <b-container fluid>
    <web-map v-show="mapSelected" />
    <feed-chart v-show="statsSelected" />
    <alerts-table v-show="tableSelected" />
  </b-container>
</template>

<script>
import WebMap from '@/components/WebMap.vue';
import AlertsTable from '@/components/AlertsTable.vue';
import FeedChart from '@/components/FeedChart.vue';
import AlertsService from '@/services/alerts-service.js';

export default {
  name: 'App',
  components: {
    WebMap,
    AlertsTable,
    FeedChart
  },
  watch: {
    userAccess(val) {
      if (val) {
        this.alertsRequest();
      }
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
    },
    async alertsRequest() {
      const response = await AlertsService.getAlerts(this.$store.getters.arcgisToken, this.userAccess);

      if (!response) {
        console.error('Alerts response is null');
        return;
      }

      this.$store.commit('SET_ALERTS', response.features);
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
