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
    drawChart(alerts) {
      if (alerts.length <= 1) return;

      const current = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

      const month1 = new Date(current.setMonth(current.getMonth()));
      const month2 = new Date(current.setMonth(current.getMonth() - 1));
      const month3 = new Date(current.setMonth(current.getMonth() - 1));
      const month4 = new Date(current.setMonth(current.getMonth() - 1));
      const month5 = new Date(current.setMonth(current.getMonth() - 1));
      const month6 = new Date(current.setMonth(current.getMonth() - 1));

      let partialSeries = [
        {
          name: 'Agresión Directa',
          color: '#FF9914',
          data: [
            {
              name: month6.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month5.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month4.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month3.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month2.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month1.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
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
              name: month6.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month5.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month4.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month3.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month2.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month1.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
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
              name: month6.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month5.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month4.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month3.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month2.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            },
            {
              name: month1.toLocaleDateString('en-GB', { month: 'numeric', year: '2-digit' }),
              y: 0
            }
          ]
        }
      ];

      const categoriesAndDates = alerts.map(feature => ({ category: feature.attributes.categoriaEvento, date: feature.attributes.fechaReporte, victims: feature.attributes.totalVictimas }));

      //let week0Sunday = new Date(week1Sunday);
      //week0Sunday.setDate(week0Sunday.getDate() - 7);

      //console.log('week0Sunday ', week0Sunday);
      for (var i = 0; i < categoriesAndDates.length; i++) {
        const entryDate = new Date(categoriesAndDates[i].date);
        //console.log('entry date ' + entryDate + ' category ' + categoriesAndDates[i].category + ' victims ' + categoriesAndDates[i].victims);

        if (categoriesAndDates[i].category == 'agresion_directa') {
          if (entryDate > month1) {
            partialSeries[0].data[5].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month2) {
            partialSeries[0].data[4].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month3) {
            partialSeries[0].data[3].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month4) {
            partialSeries[0].data[2].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month5) {
            partialSeries[0].data[1].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month6) {
            partialSeries[0].data[0].y += categoriesAndDates[i].victims;
            continue;
          }
        }
        if (categoriesAndDates[i].category == 'violencia_armada') {
          if (entryDate > month1) {
            partialSeries[1].data[5].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month2) {
            partialSeries[1].data[4].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month3) {
            partialSeries[1].data[3].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month4) {
            partialSeries[1].data[2].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month5) {
            partialSeries[1].data[1].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month6) {
            partialSeries[1].data[0].y += categoriesAndDates[i].victims;
            continue;
          }
        }

        if (categoriesAndDates[i].category == 'situacion_sospechosa') {
          if (entryDate > month1) {
            partialSeries[2].data[5].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month2) {
            partialSeries[2].data[4].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month3) {
            partialSeries[2].data[3].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month4) {
            partialSeries[2].data[2].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month5) {
            partialSeries[2].data[1].y += categoriesAndDates[i].victims;
            continue;
          }
          if (entryDate > month6) {
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
