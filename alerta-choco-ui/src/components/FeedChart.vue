<template>
  <div id="chartHolder">
    <chart :options="chartOptions" :updateArgs="updateArgs"> </chart>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import _ from "lodash";

export default {
  components: {
    Chart,
  },
  data() {
    return {
      numbers: [],
      updateArgs: [true, true, { duration: 1000 }],
    };
  },
  watch: {
    alerts(newAlerts) {
      this.drawChart(newAlerts);
    },
  },
  computed: {
    alerts() {
      return this.$store.getters.alerts;
    },
    chartOptions() {
      return {
        chart: {
          //plotBackgroundColor: '#383939',
          type: "line",
        },
        title: {
          text: "Número de alertas reportadas durante la última semana",
        },
        yAxis: {
          title: {
            text: "# de alertas",
          },
        },
        xAxis: {
          type: "datetime",
          labels: {
            format: "{value:%m-%d}",
            rotation: 0,
            align: "center",
          },
          text: "Días",
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            data: this.numbers,
            pointStart: this.TodayPlusDays(-7),
            pointInterval: 24 * 36e5,
            color: "#FF9914",
            name: "Alertas",
          },
        ],
      };
    },
  },
  methods: {
    drawChart(alerts) {
      if (!alerts) return;

      const grouped = _.groupBy(alerts, (feature) =>
        new Date(feature.attributes.fechaReporte).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
      );
      //console.log(Object.keys(grouped))

      var now = new Date();
      now.setDate(now.getDate() + 1);
      for (
        var d = new Date(this.TodayPlusDays(-6));
        d <= now;
        d.setDate(d.getDate() + 1)
      ) {
        // console.log("d is " + d + ".  Now  " + now );

        if (
          grouped[
            d.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })
          ] !== undefined
        ) {
          this.numbers.push([
            grouped[
              d.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            ].length,
          ]);
        } else this.numbers.push(0);
      }
    },
    TodayPlusDays(value) {
      var d = new Date();
      d.setDate(d.getDate() + value);
      return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    },
  },
};
</script>

<style scoped>
#chartHolder {
  width: 100%;
  height: 100%;
}
</style>
