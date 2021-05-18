<template>
  <div class="flex-1 w-full">
    <div class="container pt-6 px-4 sm:px-6 lg:px-56">
      <div class="pb-5 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9 sm:truncate flex-shrink-0">
          My workspaces
        </h2>
        <nuxt-link to="/workspaces/new" class="text-sm bg-indigo-600 text-white py-2 px-4 rounded-md">
          + New workspace
        </nuxt-link>
      </div>

      <ul class="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(workspace, index) in workspaces"
          :key="index"
          class="relative group"
        >
          <nuxt-link :to="`/workspaces/${workspace.name}`">
            <li class="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 group-hover:shadow-lg cursor-pointer">
              <div class="w-full flex items-center justify-between space-x-4">
                <img src="https://icons.duckduckgo.com/ip3/placeholder.ico" class="w-4 h-4 flex-shrink-0 mt-px">
                <div class="flex-1 truncate -mt-px">
                  <h3 class="text-gray-900 font-medium text-lg truncate dark:text-gray-100">
                    {{ workspace.name }}
                  </h3>
                </div>
              </div>
              <div class="pl-8 mt-2 flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400 text-sm truncate">
                  <span class="text-gray-800 dark:text-gray-200">
                    <b>0</b> clicks in last 24h
                  </span>
                </span>
              </div>
            </li>
          </nuxt-link>

          <nuxt-link class="absolute top-0 right-0 p-4 mt-1" :to="`/workspaces/${workspace.name}/settings`">
            <font-awesome-icon icon="cog" class="w-5 h-5 text-gray-600 dark:text-gray-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition hover:text-gray-900 dark:hover:text-gray-100" />
          </nuxt-link>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      workspaces: []
    }
  },
  async fetch () {
    await this.$axios.get('/me/workspaces')
      .then((res) => { this.workspaces = res.data })
      .catch((err) => { this.$toast.global.error({ message: err.response.data.errors[0].message }) })
  }
}
</script>
