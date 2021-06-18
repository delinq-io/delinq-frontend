<template>
  <div>
    <div class="flex flex-wrap">
      <!-- total clicks -->
      <div class="w-1/2 px-8 my-4 border-r lg:w-auto lg:border-r-0">
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
      <div class="w-1/2 px-8 my-4 border-gray-300 lg:w-auto lg:border-l">
        <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap">
          Links created
        </div>
        <div class="flex items-center justify-between my-1 whitespace-nowrap">
          <b class="mr-4 text-xl md:text-2xl dark:text-gray-100"> ? </b>
          <span class="text-xs text-gray-700 dark:text-gray-300"> 〰 N/A </span>
        </div>
      </div>
    </div>

    <div class="relative pb-2 mx-3">
      <ClicksGraph :chart-data="chartData" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    timePeriod: {
      type: String,
      default: 'Today'
    }
  },
  data () {
    return {
      today: this.$dateFns.format(new Date(), 'yyyy-MM-dd'),
      clicks: [],
      chartData: null
    }
  },
  computed: {
    ...mapState('workspaces', [
      'workspace'
    ])
  },
  async mounted () {
    this.clicks = await this.$axios.$get(`/clicks/${this.$route.params.name}/date/${this.today}`)
    setTimeout(() => {
      this.fillData()
    }, 100)
  },
  methods: {
    fillData () {
      if (this.clicks.length <= 0) { return }

      const data = []
      const hours = []
      for (let i = 0; i < 24; i++) { hours.push(`${this.today} ${i.toString().padStart(2, '0')}:00:00`) }
      hours.forEach(hour => data.push({ x: hour, y: 0 }))

      this.clicks.forEach((click) => {
        const date = this.$luxon(click.created_at, { output: { format: 'yyyy-MM-dd HH:00:00', zone: this.workspace.timezone } })
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
