<template>
  <nav class="relative w-full z-10 py-8">
    <div class="container px-4 sm:px-6 lg:px-56">
      <nav class="relative flex items-center justify-between sm:h-10 md:justify-center">
        <!-- left side -->
        <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
          <div class="flex items-center justify-between">
            <nuxt-link to="/workspaces">
              <div class="flex justify-center items-center space-x-4">
                <img alt="delinq.io logo" class="rounded" src="@/assets/images/logo.svg" style="height: 3rem;">
                <p class="dark:text-white font-bold text-2xl">
                  delinq.io
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>

        <!-- right side -->
        <div class="absolute inset-y-0 right-0 flex items-center justify-end w-2/3 sm:w-auto">
          <ul class="flex w-full sm:w-auto">
            <li class="hidden mr-6 sm:block">
              <a class="font-bold rounded m-1 ml-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-900 dark:text-gray-100" href="https://github.com/delinq-io" style="line-height: 40px;" target="_blank">
                <font-awesome-icon :icon="['fab', 'github']" class="mr-1" />
                Github
              </a>
            </li>

            <li class="hidden mr-6 sm:block">
              <a class="font-bold rounded m-1 p-1 hover:bg-gray-200 dark:hover:bg-gray-900 dark:text-gray-100" href="https://delinq.io/docs" style="line-height: 40px;" target="_blank">Docs</a>
            </li>

            <li class="w-full sm:w-auto">
              <div v-click-outside="clickOutside" class="relative font-bold rounded">
                <div class="flex items-center p-1 m-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 dark:text-gray-100 select-none" @click="toggleUserMenu()">
                  <span class="pl-2 mr-2 truncate">{{ $auth.user.username }}</span>
                  <font-awesome-icon icon="caret-down" class="text-gray-600 font-light" />
                </div>

                <transition name="fade" :duration="100">
                  <div v-show="showMenu" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 focus:outline-none">
                    <div class="py-1">
                      <nuxt-link class="text-gray-700 dark:text-gray-300 hover:cursor-pointer block px-4 py-2 text-sm font-normal" to="/settings">
                        <font-awesome-icon icon="cog" class="mr-1" />
                        Settings
                      </nuxt-link>

                      <button class="text-gray-700 dark:text-gray-300 hover:cursor-pointer block w-full text-left px-4 py-2 text-sm" @click="logout()">
                        <font-awesome-icon icon="sign-out-alt" class="mr-1" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </transition>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleUserMenu () {
      this.showMenu = !this.showMenu
    },
    logout () {
      this.$auth.logout()
        .then(() => {
          this.$toast.global.success({ message: 'You have been signed-out.' })
          this.$router.push('/login')
        })
        .catch(() => {
          this.$toast.global.error({ message: 'An error has occured...' })
        })
    },
    clickOutside () {
      this.showMenu = false
    }
  }
}
</script>
