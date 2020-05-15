<template>
    <div id="app">
    <div id="segment">
        <web-map />
    </div>
    <div id="segment">
        <feed-chart />
        <alerts-table />
    </div>
    </div>
</template>

<script>
import WebMap from './components/WebMap.vue';
import AlertsTable from './components/AlertsTable.vue'
import FeedChart from './components/FeedChart.vue'

export default {
    name: 'App',
    components: { WebMap, AlertsTable, FeedChart }
};
</script>

<style>
html,body {
  margin: 0;	  
  padding: 0;	  
  height: 100%;	  
  width: 100%;
}	

#app {
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: white;
}
#segment {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>