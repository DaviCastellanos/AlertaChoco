<template>
  <div id="reports">
    <b-row>
      <b-col>
        <alerts-table />
      </b-col>
      <b-col>
        <report />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AlertsTable from '@/components/AlertsTable.vue';
import Report from '@/components/Report.vue';

export default {
  components: {
    AlertsTable,
    Report
  }
};
</script>

<style scoped>
#reports {
  padding: 0;
  margin: 2px;
  width: 100%;
  height: 100%;
}
</style>
