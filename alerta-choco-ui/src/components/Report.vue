<template>
  <div id="report">
    <b-row>
      <div class="mt-5" v-for="value in followUps" v-bind:key="value.OBJECTID">
        {{ value.evolucionSituacion }}
      </div>
    </b-row>
  </div>
</template>

<script>
import FollowUpsService from '@/services/follow-ups-service.js';

export default {
  data() {
    return {
      alert: Number,
      followUps: null
    };
  },
  methods: {
    async getFollowUps() {
      if (!this.alert) return;
      const followUpIds = this.$store.getters.followUpIds.filter(el => {
        if (el.attributes.idAlerta === this.alert.attributes.idAlerta) return true;
        else return false;
      });
      //console.log('ids', followUpIds);

      if (!followUpIds) return;

      let followUps = [];
      for (var i = 0; i < followUpIds.length; i++) {
        const followUp = await FollowUpsService.getFollowUpInfo(
          this.$store.getters.arcgisToken,
          followUpIds[i].attributes.OBJECTID
        );
        console.log('followUp is ', followUp);
        followUps.push(followUp);
      }

      this.followUps = followUps;
    }
  },
  watch: {
    reportAlert(value) {
      //console.log('Report alert is ', value);
      this.alert = value;
      if (value) this.getFollowUps();
    }
  },
  computed: {
    reportAlert() {
      return this.$store.getters.reportAlert;
    }
  }
};
</script>

<style scoped>
#report {
  padding: 50px;
  margin: 2px;
  width: 100%;
  height: 100%;
  max-height: 650px;
  overflow: auto;
  margin-top: 50px;
}
</style>
