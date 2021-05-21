<template>
  <div>
    <div class="flex flex-wrap">
      <!-- total clicks -->
      <div class="px-8 w-1/2 my-4 lg:w-auto border-r lg:border-r-0">
        <div class="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap">
          New clicks
        </div>
        <div class="flex items-center justify-between my-1 whitespace-nowrap">
          <b class="mr-4 text-xl md:text-2xl dark:text-gray-100">
            {{ clicks.length }}
          </b>
          <span class="text-xs text-gray-700 dark:text-gray-300"> 〰 N/A </span>
        </div>
      </div>

      <!-- links created -->
      <div class="px-8 w-1/2 my-4 lg:w-auto lg:border-l border-gray-300">
        <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap">
          Links created
        </div>
        <div class="flex items-center justify-between my-1 whitespace-nowrap">
          <b class="mr-4 text-xl md:text-2xl dark:text-gray-100"> ? </b>
          <span class="text-xs text-gray-700 dark:text-gray-300"> 〰 N/A </span>
        </div>
      </div>
    </div>

    <div class="relative mx-3 pb-2">
      <line-chart
        class="mt-4"
        :height="150"
        :chart-data="chartData"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.js'

export default {
  components: {
    LineChart
  },
  props: {
    timePeriod: {
      type: String,
      default: 'Today'
    }
  },
  data () {
    return {
      clicks: [],
      chartData: null,
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
  },
  async mounted () {
    const today = this.$dateFns.format(new Date(), 'yyyy-MM-dd')
    this.clicks = await this.$axios.$get(`/clicks/${this.$route.params.name}/date/${today}`)
    this.fillData()
  },
  methods: {
    fillData () {
      const data = []
      const hours = []
      const day = this.$dateFns.format(this.clicks[0].created_at, 'yyyy-MM-dd')
      for (let i = 0; i < 24; i++) { hours.push(`${day} ${i.toString().padStart(2, '0')}:00:00`) }
      hours.forEach(hour => data.push({ x: hour, y: 0 }))

      this.clicks.forEach((click) => {
        const date = this.$dateFns.format(click.created_at, 'yyyy-MM-dd HH:00:00')
        data[data.findIndex(el => el.x === date)].y += 1
      })

      const gradient = document.getElementById('line-chart').getContext('2d').createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, 'rgba(101,116,205, 0.3)')
      gradient.addColorStop(1, 'rgba(101,116,205, 0)')

      this.chartData = {
        datasets: [{
          label: 'Clicks',
          borderWidth: 3,
          borderColor: 'rgba(101,116,205)',
          pointBackgroundColor: 'rgba(101,116,205)',
          backgroundColor: gradient,
          data
        }]
      }
    }
  }
}
</script>
