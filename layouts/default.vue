<template>
  <div :class="getColorScheme()">
    <Nuxt />
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
