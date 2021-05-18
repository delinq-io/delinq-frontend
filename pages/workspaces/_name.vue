<template>
  <div>
    <p class="text-white">
      {{ workspace.name }}
    </p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      workspace: {}
    }
  },
  async fetch () {
    await this.$axios.get(`/workspaces/${this.$route.params.name}`)
      .then((res) => { this.workspace = res.data })
      .catch((err) => { this.$toast.global.error({ message: err.response.data.errors[0].message }) })
  }
}
</script>
