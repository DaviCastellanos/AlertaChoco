<template>
  <div>
    <chart :options="chartOptions" :updateArgs="updateArgs"> </chart>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue';
import _ from 'lodash';

export default {
  components: {
    Chart
  },
  data() {
    return {
      alertsQty: [],
      verificationQty: [],
      updateArgs: [true, true, { duration: 1000 }],
      dayRange: 7
    };
  },
  watch: {
    alerts(newAlerts) {
      this.drawChart(newAlerts);
    }
  },
  computed: {
    alerts() {
      return this.$store.getters.alerts;
    },
    chartOptions() {
      return {
        chart: {
          //plotBackgroundColor: '#383939',
          type: 'line'
        },
        title: {
          text: 'Monitoreo de situaciones de derechos humanos'
        },
        yAxis: {
          title: {
            text: 'Cantidad'
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value:%d/%m}',
            rotation: 0,
            align: 'center'
          },
          text: 'Días'
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        },
        series: [
          {
            data: this.alertsQty,
            pointStart: this.TodayPlusDays(-this.dayRange),
            pointInterval: 24 * 36e5,
            color: '#FF9914',
            name: 'Alertas'
          },
          {
            data: this.verificationQty,
            pointStart: this.TodayPlusDays(-this.dayRange),
            pointInterval: 24 * 36e5,
            color: '#008001',
            name: 'Eventos DDHH'
          }
        ]
      };
    }
  },
  methods: {
    drawChart(alerts) {
      if (!alerts) return;
      this.alertsQty = [];
      this.verificationQty = [];
      const groupedByReportDate = _.groupBy(alerts, feature =>
        new Date(feature.attributes.fechaReporte).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        })
      );

      const groupedByVerificationDate = _.groupBy(alerts, feature =>
        new Date(feature.attributes.fechaValidacion).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        })
      );

      //console.log('groupedByVerificationDate ', groupedByVerificationDate);

      var now = new Date();
      now.setDate(now.getDate() + 1);
      for (var d = new Date(this.TodayPlusDays(-(this.dayRange - 1))); d <= now; d.setDate(d.getDate() + 1)) {
        //console.log("d is " + d + ".  Now  " + now);
        if (
          groupedByReportDate[
            d.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            })
          ] !== undefined
        ) {
          this.alertsQty.push([
            groupedByReportDate[
              d.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              })
            ].length
          ]);
        } else this.alertsQty.push(0);

        if (
          groupedByVerificationDate[
            d.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            })
          ] !== undefined
        ) {
          this.verificationQty.push([
            groupedByVerificationDate[
              d.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              })
            ].length
          ]);
        } else this.verificationQty.push(0);
      }

      //console.log('alertsQty is ', this.alertsQty);
    },
    TodayPlusDays(value) {
      var d = new Date();
      d.setDate(d.getDate() + value);
      return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    }
  },
  mounted() {
    this.drawChart(this.$store.getters.alerts);
    //console.log('Alerts', this.$store.getters.alerts);
  }
};
</script>
