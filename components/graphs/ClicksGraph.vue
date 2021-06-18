<template>
  <line-chart
    class="mt-4"
    :height="150"
    :chart-data="chartData"
    :options="options"
  />
</template>

<script>
import LineChart from '@/components/charts/LineChart.js'

export default {
  components: {
    LineChart
  },
  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      options: {
        legend: { display: false },
        elements: { line: { tension: 0 }, point: { radius: 0 } },
        tooltips: {
          mode: 'index',
          intersect: false,
          xPadding: 10,
          yPadding: 10,
          titleFontSize: 18,
          footerFontSize: 14,
          bodyFontSize: 14,
          backgroundColor: 'rgba(25, 30, 56)',
          titleMarginBottom: 8,
          bodySpacing: 6,
          footerMarginTop: 8,
          multiKeyBackground: 'none',
          callbacks: {
            title (dataPoints) {
              return new Date(dataPoints[0].xLabel).toLocaleString('en-US', { hour: 'numeric', hour12: true })
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              maxTicksLimit: 8,
              fontColor: 'rgb(156, 163, 175)'
            },
            gridLines: { zeroLineColor: 'transparent', drawBorder: false }
          }],
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            time: { unit: 'hour' },
            gridLines: { display: false },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 8,
              fontColor: 'rgb(156, 163, 175)'
            }
          }]
        }
      }
    }
  }
}
</script>
