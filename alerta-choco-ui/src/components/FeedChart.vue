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
          type: 'spline'
        },
        title: {
          text: 'Alertas reportadas durante la última semana'
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
          pointStart: Date.UTC(2020, 4, 7),
          pointInterval: 24 * 36e5,
          color: '#F4D44E',
          name: 'Alertas'
        }]
      } 
    }
  },
}
</script>

<style scoped>
#chartHolder {
  margin: 1px;
}
/*
.highcharts-background {
	fill: #383939;
	stroke: #a4edba;
	stroke-width: 2px;
}*/
</style>