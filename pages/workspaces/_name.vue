<template>
  <div class="flex-1 w-full">
    <div class="container pt-6 px-4 sm:px-6 lg:px-56">
      <div class="sm:py-3 py-1">
        <div class="items-center w-full sm:flex">
          <div class="flex space-x-6 items-center mb-2 sm:mb-0">
            <WorkspacesDropdown />

            <p class="block mr-auto text-sm font-medium text-gray-500 dark:text-gray-300">
              <svg class="inline w-2 mr-2 text-green-500 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" /></svg>
              0 clicks in last 24h
            </p>
          </div>

          <div class="flex justify-end ml-auto pl-2">
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
            <div class="px-8 w-1/2 my-4 lg:w-auto  border-r lg:border-r-0">
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
      datacollection: null,
      chartOptions: {
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              maxTicksLimit: 8,
              fontColor: 'rgb(243, 244, 246)'
            },
            gridLines: {
              zeroLineColor: 'transparent',
              drawBorder: false
            }
          }],
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            time: { unit: 'day' },
            gridLines: { display: false },
            ticks: {
              autoSkip: true,
              fontColor: 'rgb(243, 244, 246)'
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        // labels: ['May'],
        datasets: [
          {
            label: 'Clicks',
            borderWidth: 3,
            borderColor: 'rgba(101,116,205)',
            pointBackgroundColor: 'rgba(101,116,205)',
            data: [
              {
                x: new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)),
                y: this.getRandomInt()
              },
              {
                x: new Date(new Date().getTime() - (4 * 24 * 60 * 60 * 1000)),
                y: this.getRandomInt()
              },
              {
                x: new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)),
                y: this.getRandomInt()
              },
              {
                x: new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000)),
                y: this.getRandomInt()
              },
              {
                x: new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000)),
                y: this.getRandomInt()
              },
              {
                x: new Date(),
                y: this.getRandomInt()
              }
            ]
          }

        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>
