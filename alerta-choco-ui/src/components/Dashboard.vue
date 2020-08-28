<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <web-map />
      </b-col>
      <b-col>
        <chart-alert-events />
        <victims-situation />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import WebMap from '@/components/WebMap.vue';
import ChartAlertEvents from '@/components/ChartAlertsEvents.vue';
import VictimsSituation from '@/components/VictimsSituation.vue';
import { AlertsService } from '@/services';
import { PolicyService } from '@/services';

export default {
  name: 'App',
  components: {
    WebMap,
    ChartAlertEvents,
    VictimsSituation
  },
  methods: {
    async alertsRequest() {
      const response = await AlertsService.getAlerts(this.$store.getters.arcgisToken, this.userAccess);

      if (!response) {
        console.error('Alerts response is null');
        return;
      }
      this.$store.commit('SET_ALERTS', response.features);
    }
  },
  async policiesRequest() {
    const response = await PolicyService.getPolicies(this.$store.getters.arcgisToken, this.userAccess);
    if (!response) {
      console.error('Policies response is null');
      return;
    }
    //console.log('policies are ', response.features);
    this.$store.commit('SET_POLICIES', response.features);
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
</style>
