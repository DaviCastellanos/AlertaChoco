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
      monthRange: -6
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
        tooltip: {
          formatter: function() {
            const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

            return this.y + ' en ' + months[new Date(this.x).getMonth()];
          },
          shared: false
        },
        yAxis: {
          title: {
            text: 'Cantidad'
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value: %m/%y}',
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
            pointStart: this.TodayPlusMonths(this.monthRange),
            pointIntervalUnit: 'month',
            color: '#FF9914',
            name: 'Fecha de ocurrencia'
          },
          {
            data: this.verificationQty,
            pointStart: this.TodayPlusMonths(this.monthRange),
            pointIntervalUnit: 'month',
            color: '#008001',
            name: 'Fecha de validación'
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
        new Date(feature.attributes.fechaOcurrencia).toLocaleDateString('en-GB', {
          month: 'numeric',
          year: 'numeric'
        })
      );

      const groupedByVerificationDate = _.groupBy(alerts, feature =>
        new Date(feature.attributes.fechaValidacion).toLocaleDateString('en-GB', {
          month: 'numeric',
          year: 'numeric'
        })
      );

      //console.log('groupedByVerificationDate ', groupedByVerificationDate);
      //console.log('groupedByReportDate ', groupedByReportDate);

      var now = new Date();
      now.setDate(now.getDate() + 1);
      for (var d = new Date(this.TodayPlusMonths(this.monthRange)); d <= now; d.setMonth(d.getMonth() + 1)) {
        //console.log("d is " + d + ".  Now  " + now);
        if (
          groupedByReportDate[
            d.toLocaleDateString('en-GB', {
              month: 'numeric',
              year: 'numeric'
            })
          ] !== undefined
        ) {
          this.alertsQty.push([
            groupedByReportDate[
              d.toLocaleDateString('en-GB', {
                month: 'numeric',
                year: 'numeric'
              })
            ].length
          ]);
        } else this.alertsQty.push(0);

        if (
          groupedByVerificationDate[
            d.toLocaleDateString('en-GB', {
              month: 'numeric',
              year: 'numeric'
            })
          ] !== undefined
        ) {
          this.verificationQty.push([
            groupedByVerificationDate[
              d.toLocaleDateString('en-GB', {
                month: 'numeric',
                year: 'numeric'
              })
            ].length
          ]);
        } else this.verificationQty.push(0);
      }

      //console.log('alertsQty is ', this.alertsQty);
    },
    TodayPlusMonths(value) {
      var d = new Date();
      d.setMonth(d.getMonth() + value);
      return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    }
  },
  mounted() {
    this.drawChart(this.$store.getters.alerts);
    //console.log('Alerts', this.$store.getters.alerts);
  }
};
</script>
