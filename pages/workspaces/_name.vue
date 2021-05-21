<template>
  <div class="flex-1 w-full">
    <div class="container pt-6 px-4 sm:px-6 lg:px-56">
      <div class="sm:py-3 py-1">
        <div class="items-center w-full sm:flex">
          <div class="flex space-x-6 items-center mb-2 sm:mb-0">
            <WorkspacesDropdown />

            <p class="block mr-auto text-sm font-medium text-gray-500 dark:text-gray-300">
              <svg class="inline w-2 mr-2 text-green-500 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" /></svg>
              {{ clicks.length }} clicks in last 24h
            </p>
          </div>

          <div class="flex space-x-4 items-center justify-end ml-auto pl-2">
            <div v-click-outside="clickOutsideDateMenu" class="relative" style="width: 190px;">
              <div
                class="flex items-center justify-between rounded bg-white dark:bg-gray-800 shadow px-4 pr-3 py-2 leading-tight cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-200 h-full"
                @click="showDateMenu = !showDateMenu"
              >
                <span class="mr-2">Today</span>
                <font-awesome-icon icon="caret-down" class="text-gray-500 h-4 w-4" />
              </div>

              <transition name="fade" :duration="80">
                <div v-show="showDateMenu" class="absolute mt-2 rounded shadow-md z-10 enter-done" style="width: 190px;">
                  <div class="rounded bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 font-medium text-gray-800 dark:text-gray-200">
                    <div class="py-1">
                      <p class="font-bold px-4 py-2 md:text-sm leading-tight hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-between">
                        Today
                        <!-- <span class="font-normal">D</span> -->
                      </p>
                    </div>

                    <div class="border-t border-gray-200 dark:border-gray-500" />

                    <div class="py-1">
                      <p class="px-4 py-2 md:text-sm leading-tight hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer flex items-center justify-between">
                        More coming soon...
                      </p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <button
              class="text-sm bg-indigo-600 text-white py-2 px-4 rounded-md"
              @click="$store.commit('layout/TOGGLE_CREATE_LINK_SLIDEOVER', true)"
            >
              + New link
            </button>
          </div>
        </div>
      </div>

      <!-- body -->
      <div class="w-full mt-2 bg-white rounded shadow-xl dark:bg-gray-825 main-graph">
        <div class="graph-inner">
          <div class="flex flex-wrap">
            <div class="px-8 w-1/2 my-4 lg:w-auto border-r lg:border-r-0">
              <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap">
                Total clicks
              </div>
              <div class="flex items-center justify-between my-1 whitespace-nowrap">
                <b class="mr-4 text-xl md:text-2xl dark:text-gray-100">
                  0
                </b>
                <span class="text-xs dark:text-gray-100">
                  <span class="text-green-500 font-bold">
                    ↑
                  </span>
                  100%
                </span>
              </div>
            </div>
          </div>

          <div class="relative mx-3 pb-2">
            <line-chart
              class="mt-4"
              :height="150"
              :chart-data="datacollection"
              :options="chartOptions"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.js'

export default {
  components: {
    LineChart
  },
  middleware: 'auth',
  data () {
    return {
      clicks: [],
      showDateMenu: false,
      datacollection: null,
      chartOptions: {
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
              const data = dataPoints[0]
              return new Date(data.xLabel).toLocaleString('en-US', { hour: 'numeric', hour12: true })
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              maxTicksLimit: 8,
              fontColor: 'rgb(243, 244, 246)'
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
              fontColor: 'rgb(243, 244, 246)'
            }
          }]
        }
      }
    }
  },
  async mounted () {
    this.clicks = await this.$axios.$get(`/clicks/${this.$route.params.name}/today`)
    console.log(this.clicks)
    this.fillData()
  },
  methods: {
    fillData () {
      const data = []
      const hours = []
      const day = this.$dateFns.format(this.clicks[0].created_at, 'yyyy-MM-dd')
      for (let i = 0; i < 24; i++) { hours.push(`${day} ${i}:00:00`) }
      hours.forEach(hour => data.push({ x: hour, y: 0 }))

      this.clicks.forEach((click) => {
        const date = this.$dateFns.format(click.created_at, 'yyyy-MM-dd H:00:00')
        data[data.findIndex(el => el.x === date)].y += 1
      })

      const gradient = document.getElementById('line-chart').getContext('2d').createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, 'rgba(101,116,205, 0.2)')
      gradient.addColorStop(1, 'rgba(101,116,205, 0)')

      this.datacollection = {
        datasets: [{
          label: 'Clicks',
          borderWidth: 3,
          borderColor: 'rgba(101,116,205)',
          pointBackgroundColor: 'rgba(101,116,205)',
          backgroundColor: gradient,
          data
        }]
      }
    },
    clickOutsideDateMenu () {
      this.showDateMenu = false
    }
  }
}
</script>
