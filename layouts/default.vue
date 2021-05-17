<template>
  <div :class="getColorScheme()">
    <div class="flex flex-col items-center bg-gray-50 dark:bg-gray-850">
      <Navbar />

      <Nuxt />

      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getColorScheme () {
      return this.$colorMode.preference
    }
  }
}
</script>
