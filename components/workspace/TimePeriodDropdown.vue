<template>
  <div v-click-outside="clickOutsideDateMenu" class="relative" style="width: 190px;">
    <div
      class="flex items-center justify-between rounded bg-white dark:bg-gray-800 shadow px-4 pr-3 py-2 leading-tight cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-200 h-full"
      @click="showDateMenu = !showDateMenu"
    >
      <span class="mr-2 my-px">{{ value }}</span>
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
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'Today'
    }
  },
  data () {
    return {
      showDateMenu: false
    }
  },
  methods: {
    clickOutsideDateMenu () {
      this.showDateMenu = false
    }
  }
}
</script>
