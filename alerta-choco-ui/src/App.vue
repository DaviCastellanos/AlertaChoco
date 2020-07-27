<template>
  <b-container fluid>
    <b-row no-gutters>
      <nav-bar />
    </b-row>
    <div class="d-flex justify-content-center no-gutters">
      <web-map v-show="mapSelected" />
      <feed-chart v-show="statsSelected" />
      <alerts-table v-show="tableSelected" />
    </div>
    <Footer />
  </b-container>
</template>

<script>
import WebMap from "./components/WebMap.vue";
import AlertsTable from "./components/AlertsTable.vue";
import FeedChart from "./components/FeedChart.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    WebMap,
    AlertsTable,
    FeedChart,
    NavBar,
    Footer,
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
