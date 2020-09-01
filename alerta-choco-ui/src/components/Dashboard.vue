<template>
  <b-container fluid id="dashboard">
    <b-row>
      <b-col md="12" lg="6">
        <web-map />
      </b-col>
      <b-col md="12" lg="6">
        <chart-alert-events />
        <chart-victims-situation />
        <div id="chartText">
          <h6 style="text-align: center">Monitoreo al PATR</h6>
          <p>Seguimiento a la incidencia, bloqueos o implementación del Plan de Acción para la Transformación Regional.</p>
        </div>
        <chart-patr />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import WebMap from '@/components/WebMap.vue';
import ChartPatr from '@/components/ChartPATR.vue';
import ChartAlertEvents from '@/components/ChartAlertsEvents.vue';
import ChartVictimsSituation from '@/components/ChartVictimsSituation.vue';
import AlertsService from '@/services/alerts-service.js';
import PolicyService from '@/services/policy-service.js';
import helpers from '@/mixins/helpers.js';

export default {
  name: 'App',
  components: {
    WebMap,
    ChartAlertEvents,
    ChartVictimsSituation,
    ChartPatr
  },
  mixins: [helpers],
  methods: {
    async alertsRequest() {
      const response = await AlertsService.getAlerts(this.$store.getters.arcgisToken, this.userAccess);

      if (!response) {
        console.error('Alerts response is null');
        return;
      }
      this.$store.commit('SET_ALERTS', response.features);
    },
    async policiesRequest() {
      const response = await PolicyService.getPolicies(this.$store.getters.arcgisToken, this.userAccess);
      if (!response) {
        console.error('Policies response is null');
        return;
      }
      //console.log('policies are ', response.features);
      this.$store.commit('SET_POLICIES', response.features);
    }
  },
  mounted() {
    if (this.$store.getters.updateNeeded == true) {
      this.alertsRequest();
      this.policiesRequest();
      this.$store.commit('SET_UPDATE_NEEDED', false);
    }
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
#dashboard {
  margin: 0;
  padding: 2%;
  height: 100%;
  width: 100%;
}
#chartText {
  padding: 4%;
  font: 'Roboto' !important;
}
</style>
