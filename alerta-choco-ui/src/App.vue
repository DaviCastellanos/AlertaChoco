<template>
  <b-container fluid>
    <b-row no-gutters>
        <nav-bar />
    </b-row>
    <b-row no-gutters>
        <b-button-group id="buttons">
            <b-button :pressed.sync="mapSelected" variant="primary">Mapa</b-button>
            <b-button :pressed.sync="tableSelected" variant="primary">Tabla</b-button>
            <b-button :pressed.sync="statsSelected" variant="primary">Estadísticas</b-button>
        </b-button-group>
    </b-row>
    <div class="d-flex justify-content-center no-gutters row">
            <web-map v-show="mapSelected"/>
            <feed-chart v-show="statsSelected" />
            <alerts-table  v-show="tableSelected"/>
    </div>
    <Footer />
  </b-container>
</template>

<script>
import WebMap from './components/WebMap.vue';
import AlertsTable from './components/AlertsTable.vue'
import FeedChart from './components/FeedChart.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'App',
    data () {
        return {
            mapSelected: true,
            tableSelected: false,
            statsSelected: false,
        }
    },
    components: { 
        WebMap, 
        AlertsTable, 
        FeedChart,
        NavBar,
        Footer 
    },
    watch: {
        mapSelected (val) {
           this.mapSelected = val; 
           if(val){
               this.tableSelected = false;
               this.statsSelected = false;
           }
        },
        tableSelected (val) {
           this.tableSelected = val; 
           if(val){
               this.mapSelected = false;
               this.statsSelected = false;
           }
        },
        statsSelected (val) {
           this.statsSelected = val; 
           if(val){
               this.mapSelected = false;
               this.tableSelected = false;
           }
        }
    },
    computed: {
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
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
#buttons {
    margin: 2px;
}
</style>