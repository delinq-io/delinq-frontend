<template>
  <div class="flex-1 w-full">
    <div class="container pt-6 px-4 sm:px-6 lg:px-56">
      <!------------------------------------------->
      <!-- head ----------------------------------->
      <!------------------------------------------->
      <div class="sm:py-3 py-1">
        <div class="items-center w-full sm:flex">
          <!-- left -->
          <div class="flex space-x-6 items-center mb-2 sm:mb-0">
            <WorkspacesDropdown />

            <p class="block mr-auto text-sm font-medium text-gray-500 dark:text-gray-300">
              <svg class="inline w-2 mr-2 text-green-500 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" /></svg>
              0 clicks in last 24h
            </p>
          </div>

          <!-- right -->
          <div class="flex space-x-6 items-center justify-end ml-auto pl-2">
            <TimePeriodDropdown v-model="timePeriod" />

            <button
              class="text-sm bg-indigo-600 text-white py-2 px-4 rounded-md"
              @click="$store.commit('layout/TOGGLE_CREATE_LINK_SLIDEOVER', true)"
            >
              + New link
            </button>
          </div>
        </div>
      </div>

      <!------------------------------------------->
      <!-- body ----------------------------------->
      <!------------------------------------------->
      <div class="w-full mt-2 bg-white rounded shadow-xl dark:bg-gray-825 main-graph">
        <ClicksGraph :time-period="timePeriod" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      timePeriod: 'Today'
    }
  }
}
</script>
