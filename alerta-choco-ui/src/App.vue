<template>
  <b-container fluid>
    <b-row no-gutters>
        <nav-bar />
    </b-row>
    <b-row no-gutters>
        <b-col sm="12" md="6">
            <web-map />
        </b-col>
        <b-col sm="12" md="6">
            <feed-chart />
            <alerts-table />
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import WebMap from './components/WebMap.vue';
import AlertsTable from './components/AlertsTable.vue'
import FeedChart from './components/FeedChart.vue'
import NavBar from './components/NavBar.vue'

export default {
    name: 'App',
    components: { 
        WebMap, 
        AlertsTable, 
        FeedChart,
        NavBar 
        }
};
</script>

<style>
html,body {
  margin: 0;	  
  padding: 0;	  
  height: 100%;	  
  width: 100%;
}	
</style>