<template>
  <div :class="getColorScheme()">
    <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 vsc-initialized">
      <div class="w-full my-8 text-center">
        <div class="flex justify-center items-center space-x-4">
          <img alt="delinq.io logo" class="rounded" src="@/assets/images/logo.svg" style="height: 3rem;">
          <p class="dark:text-white font-bold text-2xl">
            delinq.io
          </p>
        </div>
      </div>

      <nuxt />

      <p class="text-center text-gray-500 text-xs py-8">
        ©{{ year }} delinq.io - All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      year: new Date().getFullYear()
    }
  },
  methods: {
    getColorScheme () {
      return this.$colorMode.preference
    }
  }
}
</script>
