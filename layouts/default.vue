<template>
  <div :class="getColorScheme()">
    <!-- page content -->
    <div class="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-850">
      <Navbar />

      <Nuxt />

      <Footer />
    </div>

    <div>
      <CreateLinkSlideover />
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
