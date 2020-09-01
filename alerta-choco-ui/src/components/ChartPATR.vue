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
      const until = date.getDate() + '-' + (date.getMonth() + 1);
      date = new Date(date.setDate(date.getDate() - 7));
      const from = date.getDate() + '-' + (date.getMonth() + 1);
      return from + ' - ' + until;
    },
    drawChart(policies) {
      if (!policies) return;

      let partialSeries = [
        {
          name: 'Acción de incidencia',
          color: '#FF9914',
          data: [
            {
              name: 'Pilar 1',
              y: 0
            },
            {
              name: 'Pilar 2',
              y: 0
            },
            {
              name: 'Pilar 3',
              y: 0
            },
            {
              name: 'Pilar 4',
              y: 0
            },
            {
              name: 'Pilar 5',
              y: 0
            },
            {
              name: 'Pilar 6',
              y: 0
            },
            {
              name: 'Pilar 7',
              y: 0
            },
            {
              name: 'Pilar 8',
              y: 0
            }
          ]
        },
        {
          name: 'Impl. Autónoma',
          color: '#1C6194',
          data: [
            {
              name: 'Pilar 1',
              y: 0
            },
            {
              name: 'Pilar 2',
              y: 0
            },
            {
              name: 'Pilar 3',
              y: 0
            },
            {
              name: 'Pilar 4',
              y: 0
            },
            {
              name: 'Pilar 5',
              y: 0
            },
            {
              name: 'Pilar 6',
              y: 0
            },
            {
              name: 'Pilar 7',
              y: 0
            },
            {
              name: 'Pilar 8',
              y: 0
            }
          ]
        },
        {
          name: 'Impl. Política Pública',
          color: '#008001',
          data: [
            {
              name: 'Pilar 1',
              y: 0
            },
            {
              name: 'Pilar 2',
              y: 0
            },
            {
              name: 'Pilar 3',
              y: 0
            },
            {
              name: 'Pilar 4',
              y: 0
            },
            {
              name: 'Pilar 5',
              y: 0
            },
            {
              name: 'Pilar 6',
              y: 0
            },
            {
              name: 'Pilar 7',
              y: 0
            },
            {
              name: 'Pilar 8',
              y: 0
            }
          ]
        },
        {
          name: 'Bloqueo Institucional',
          color: '#EEEEEE',
          data: [
            {
              name: 'Pilar 1',
              y: 0
            },
            {
              name: 'Pilar 2',
              y: 0
            },
            {
              name: 'Pilar 3',
              y: 0
            },
            {
              name: 'Pilar 4',
              y: 0
            },
            {
              name: 'Pilar 5',
              y: 0
            },
            {
              name: 'Pilar 6',
              y: 0
            },
            {
              name: 'Pilar 7',
              y: 0
            },
            {
              name: 'Pilar 8',
              y: 0
            }
          ]
        }
      ];

      for (var i = 0; i < policies.length; i++) {
        if (policies[i].attributes.tipoReporte === 'acción_de_incidencia') {
          //console.log(policies[i].attributes.pilar[0]);
          if (policies[i].attributes.pilar[0] === '1') partialSeries[0].data[0].y++;
          if (policies[i].attributes.pilar[0] === '2') partialSeries[0].data[1].y++;
          if (policies[i].attributes.pilar[0] === '3') partialSeries[0].data[2].y++;
          if (policies[i].attributes.pilar[0] === '4') partialSeries[0].data[3].y++;
          if (policies[i].attributes.pilar[0] === '5') partialSeries[0].data[4].y++;
          if (policies[i].attributes.pilar[0] === '6') partialSeries[0].data[5].y++;
          if (policies[i].attributes.pilar[0] === '7') partialSeries[0].data[6].y++;
          if (policies[i].attributes.pilar[0] === '8') partialSeries[0].data[7].y++;
        }
        if (policies[i].attributes.tipoReporte === 'implementación_autónoma,_comunitaria_o_de_cooperación') {
          if (policies[i].attributes.pilar[0] === '1') partialSeries[1].data[0].y++;
          if (policies[i].attributes.pilar[0] === '2') partialSeries[1].data[1].y++;
          if (policies[i].attributes.pilar[0] === '3') partialSeries[1].data[2].y++;
          if (policies[i].attributes.pilar[0] === '4') partialSeries[1].data[3].y++;
          if (policies[i].attributes.pilar[0] === '5') partialSeries[1].data[4].y++;
          if (policies[i].attributes.pilar[0] === '6') partialSeries[1].data[5].y++;
          if (policies[i].attributes.pilar[0] === '7') partialSeries[1].data[6].y++;
          if (policies[i].attributes.pilar[0] === '8') partialSeries[1].data[7].y++;
        }
        if (policies[i].attributes.tipoReporte === 'implementación_de_política_pública') {
          if (policies[i].attributes.pilar[0] === '1') partialSeries[2].data[0].y++;
          if (policies[i].attributes.pilar[0] === '2') partialSeries[2].data[1].y++;
          if (policies[i].attributes.pilar[0] === '3') partialSeries[2].data[2].y++;
          if (policies[i].attributes.pilar[0] === '4') partialSeries[2].data[3].y++;
          if (policies[i].attributes.pilar[0] === '5') partialSeries[2].data[4].y++;
          if (policies[i].attributes.pilar[0] === '6') partialSeries[2].data[5].y++;
          if (policies[i].attributes.pilar[0] === '7') partialSeries[2].data[6].y++;
          if (policies[i].attributes.pilar[0] === '8') partialSeries[2].data[7].y++;
        }
        if (policies[i].attributes.tipoReporte === 'bloqueo_institucional') {
          if (policies[i].attributes.pilar[0] === '1') partialSeries[3].data[0].y++;
          if (policies[i].attributes.pilar[0] === '2') partialSeries[3].data[1].y++;
          if (policies[i].attributes.pilar[0] === '3') partialSeries[3].data[2].y++;
          if (policies[i].attributes.pilar[0] === '4') partialSeries[3].data[3].y++;
          if (policies[i].attributes.pilar[0] === '5') partialSeries[3].data[4].y++;
          if (policies[i].attributes.pilar[0] === '6') partialSeries[3].data[5].y++;
          if (policies[i].attributes.pilar[0] === '7') partialSeries[3].data[6].y++;
          if (policies[i].attributes.pilar[0] === '8') partialSeries[3].data[7].y++;
        }
      }
      //console.log('partial ', partialSeries);
      this.customSeries = partialSeries;
    }
  },
  watch: {
    policies(newPolicies) {
      //console.log('policies is ', newPolicies);
      if (newPolicies) this.drawChart(newPolicies);
    }
  },
  computed: {
    policies() {
      return this.$store.getters.policies;
    },
    chartOptions() {
      return {
        chart: {
          type: 'bar'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        title: {
          text: 'Acción monitoreada',
          fontWeight: 'bold'
        },
        xAxis: {
          categories: ['Pilar 1', 'Pilar 2', 'Pilar 3', 'Pilar 4', 'Pilar 5', 'Pilar 6', 'Pilar 7', 'Pilar 8']
        },
        yAxis: [
          {
            allowDecimals: false,
            min: 0,
            title: {
              text: 'Número de reportes'
            }
          }
        ],
        series: this.customSeries
      };
    }
  },
  mounted() {
    if (this.policies) this.drawChart(this.policies);
  }
};
</script>
