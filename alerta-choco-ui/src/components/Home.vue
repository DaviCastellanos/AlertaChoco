<template>
  <b-container fluid>
    <web-map v-show="mapSelected" />
    <feed-chart v-show="statsSelected" />
    <alerts-table v-show="tableSelected" />
  </b-container>
</template>

<script>
import WebMap from "@/components/WebMap.vue";
import AlertsTable from "@/components/AlertsTable.vue";
import FeedChart from "@/components/FeedChart.vue";
import AlertsService from "@/services/alerts-service.js";

export default {
  name: "App",
  components: {
    WebMap,
    AlertsTable,
    FeedChart,
  },
  watch: {
    userIsAuthenticated(val) {
      if (val) {
        this.alertsRequest();
      }
    },
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    mapSelected() {
      return this.$store.getters.currentView === "map";
    },
    statsSelected() {
      return this.$store.getters.currentView === "statistics";
    },
    tableSelected() {
      return this.$store.getters.currentView === "table";
    },
  },
  methods: {
    async tokenRequest() {
      const token = await AlertsService.getArcgisToken();

      if (!token) {
        console.error("Arcgis token is null");
        return;
      }

      this.$store.commit("SET_ARCGIS_TOKEN", token);
    },
    async alertsRequest() {
      const response = await AlertsService.getAlerts(
        this.$store.getters.arcgisToken
      );

      if (!response) {
        console.error("Alerts response is null");
        return;
      }

      this.$store.commit("SET_ALERTS", response.features);
    },
  },
  mounted() {
    this.tokenRequest();
  },
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
