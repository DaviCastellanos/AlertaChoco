<template>
  <div>
    <highcharts class="chart" :constructor-type="'chart'" :options="chartOptions"></highcharts>
  </div>
</template>
<script>
import Highcharts from 'highcharts';
import dataModule from 'highcharts/modules/data';
import drilldown from 'highcharts/modules/drilldown';

drilldown(Highcharts);
dataModule(Highcharts);

export default {
  data() {
    return {
      customSeries: []
    };
  },
  methods: {
    weekDateName(date) {
      //console.log(date);
      const until = date.getDate() + '/' + (date.getMonth() + 1);
      date = new Date(date.setDate(date.getDate() - 7));
      const from = date.getDate() + '/' + (date.getMonth() + 1);
      return from + ' - ' + until;
    },
    drawChart(alerts) {
      if (alerts.length <= 1) return;

      const curr = new Date();
      const first = curr.getDate() - curr.getDay();
      const lastSunday = new Date(curr.setDate(first));

      let week4Sunday = new Date(lastSunday);
      const week4 = this.weekDateName(new Date(week4Sunday.setDate(week4Sunday.getDate() + 7)));
      //console.log('week4Sunday ' + week4Sunday);
      let week3Sunday = new Date(lastSunday);
      const week3 = this.weekDateName(new Date(week3Sunday.setDate(week3Sunday.getDate())));
      //console.log('week3Sunday ' + week3Sunday);
      let week2Sunday = new Date(lastSunday);
      const week2 = this.weekDateName(new Date(week2Sunday.setDate(week2Sunday.getDate() - 7)));
      //console.log('week2Sunday ' + week2Sunday);
      let week1Sunday = new Date(lastSunday);
      const week1 = this.weekDateName(new Date(week1Sunday.setDate(week1Sunday.getDate() - 14)));
      //console.log('week1Sunday ' + week1Sunday);

      let partialSeries = [
        {
          name: 'Agresión Directa',
          color: '#FF9914',
          data: [
            {
              name: week1,
              y: 0
            },
            {
              name: week2,
              y: 0
            },
            {
              name: week3,
              y: 0
            },
            {
              name: week4,
              y: 0
            }
          ]
        },
        {
          type: 'column',
          name: 'Violencia Armada',
          color: '#1C6194',
          data: [
            {
              name: week1,
              y: 0
            },
            {
              name: week2,
              y: 0
            },
            {
              name: week3,
              y: 0
            },
            {
              name: week4,
              y: 0
            }
          ]
        },
        {
          type: 'column',
          name: 'Situación Sospechosa',
          color: '#008001',
          data: [
            {
              name: week1,
              y: 0
            },
            {
              name: week2,
              y: 0
            },
            {
              name: week3,
              y: 0
            },
            {
              name: week4,
              y: 0
            }
          ]
        }
      ];

      const categoriesAndDates = alerts.map(feature => ({ category: feature.attributes.categoriaEvento, date: feature.attributes.fechaReporte, victims: feature.attributes.totalVictimas }));

      let week0Sunday = new Date(week1Sunday);
      week0Sunday.setDate(week0Sunday.getDate() - 7);

      //console.log('week0Sunday ', week0Sunday);
      for (var i = 0; i < categoriesAndDates.length; i++) {
        const entryDate = new Date(categoriesAndDates[i].date);
        //console.log('entry date ' + entryDate + ' category ' + categoriesAndDates[i].category + ' victims ' + categoriesAndDates[i].victims);

        if (categoriesAndDates[i].category == 'agresion_directa') {
          if (entryDate > week3Sunday) {
            partialSeries[0].data[3].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > week2Sunday) {
            partialSeries[0].data[2].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > week1Sunday) {
            partialSeries[0].data[1].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > week0Sunday) {
            partialSeries[0].data[0].y += categoriesAndDates[i].victims;
            continue;
          }
        }

        if (categoriesAndDates[i].category == 'violencia_armada') {
          if (entryDate > week3Sunday) {
            partialSeries[1].data[3].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > week2Sunday) {
            partialSeries[1].data[2].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > week1Sunday) {
            partialSeries[1].data[1].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > week0Sunday) {
            partialSeries[1].data[0].y += categoriesAndDates[i].victims;
            continue;
          }
        }

        if (categoriesAndDates[i].category == 'situacion_sospechosa') {
          if (entryDate > week3Sunday) {
            partialSeries[2].data[3].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > week2Sunday) {
            partialSeries[2].data[2].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > week1Sunday) {
            partialSeries[2].data[1].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > week0Sunday) {
            partialSeries[2].data[0].y += categoriesAndDates[i].victims;
            continue;
          }
        }
      }
      //console.log('partial ', partialSeries);
      this.customSeries = partialSeries;
    }
  },
  watch: {
    alerts(newAlerts) {
      //console.log('alerts length is ' + newAlerts.length);
      if (newAlerts) this.drawChart(newAlerts);
    }
  },
  computed: {
    alerts() {
      return this.$store.getters.alerts;
    },
    chartOptions() {
      return {
        chart: {
          type: 'column'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          column: {
            stacking: 'normal'
          }
        },
        title: {
          text: 'Víctimas verificadas en situación de Derechos Humanos',
          fontWeight: 'bold'
        },
        xAxis: {
          title: {},
          type: 'category'
        },
        yAxis: [
          {
            title: {
              text: 'Número de Víctimas'
            },
            min: 0,
            allowDecimals: false
          }
        ],
        series: this.customSeries
      };
    }
  },
  mounted() {
    if (this.alerts.length > 1) this.drawChart(this.alerts);
  }
};
</script>
