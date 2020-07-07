<template>
    <div id="chartHolder">
    <chart :options="chartOptions" :updateArgs="updateArgs"> </chart>
    </div>
</template>


<script>
import { Chart } from 'highcharts-vue'

export default {
    components: {
        Chart
    },
    data () {
    return {
      updateArgs: [true, true, {duration: 1000}],
      chartOptions: {
        chart: {
          //plotBackgroundColor: '#383939',
          type: 'line'
        },
        title: {
          text: 'Número de alertas reportadas durante la última semana'
        },
        yAxis: {
            title: {
                    text: '# de alertas'
                }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value:%m-%d}',
                rotation: 0,
                align: 'center'
            },
            text: 'Días'
        },
        legend: {
            enabled: false
        },
        series: [{
          data: [10, 0, 8, 2, 6, 4, 5, 5],
          pointStart: this.EightDaysAgoDate(),
          pointInterval: 24 * 36e5,
          color: '#FF9914',
          name: 'Alertas'
        }]
      } 
    }
  },
  methods: {
    EightDaysAgoDate () {
      var d = new Date();
      d.setDate(d.getDate() -8); 
      return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    }
  }
}
</script>

<style scoped>
#chartHolder {
  margin-top: 2px;
  margin-left: 2px;
}
</style>