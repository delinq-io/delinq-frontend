<template>
  <div v-click-outside="clickOutside" class="relative inline-block text-left z-10">
    <button class="inline-flex items-center text-lg w-full rounded-md py-2 leading-5 font-bold text-gray-700 dark:text-gray-300 focus:outline-none transition ease-in-out duration-150 hover:text-gray-500 dark:hover:text-gray-200 focus:border-blue-300 focus:ring" @click="toggleWorkspacesDropdown()">
      {{ workspace.name }}
      <font-awesome-icon icon="angle-down" class="ml-2" />
    </button>

    <transition name="fade" :duration="100">
      <div v-show="show" class="origin-top-left absolute left-0 mt-2 w-64 rounded-md shadow-lg enter-done">
        <div class="rounded-md bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div class="py-1">
            <nuxt-link :to="`/workspaces/${workspace.name}/settings`" class="group flex items-center px-4 py-2 md:text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-900 dark:focus:text-gray-100">
              <font-awesome-icon icon="cog" class="mr-2 text-gray-400" />
              Workspace settings
            </nuxt-link>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-500" />

          <div class="py-1">
            <nuxt-link
              v-for="(ws, index) in workspacesList"
              :key="index"
              :to="`/workspaces/${ws.name}`"
              class="flex items-center truncate px-4 py-2 md:text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-900 dark:focus:text-gray-100"
            >
              <img src="https://icons.duckduckgo.com/ip3/test.com.ico" class="inline w-4 mr-2 align-middle">
              {{ ws.name }}
            </nuxt-link>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-500" />

          <div class="py-1">
            <nuxt-link :to="`/workspaces/new`" class="group flex items-center px-4 py-2 md:text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-900 dark:focus:text-gray-100">
              <font-awesome-icon icon="plus" class="mr-2 text-gray-400" />
              New workspace
            </nuxt-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      show: false
    }
  },
  fetch () {
    this.$store.dispatch('workspaces/fetchList')
    this.$store.dispatch('workspaces/fetch', { name: this.$route.params.name })
  },
  computed: {
    ...mapState('workspaces', [
      'workspacesList',
      'workspace'
    ])
  },
  methods: {
    toggleWorkspacesDropdown () {
      this.show = !this.show
    },
    clickOutside () {
      this.show = false
    }
  }
}
</script>
