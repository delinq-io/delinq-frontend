<script>
export default {
  mounted () {
    this.$auth.logout()
      .then(() => {
        this.$toast.global.success({ message: 'You have been signed-out!' })
        this.$router.push('/login')
      })
      .catch(() => {
        this.$toast.global.error({ message: 'An error has occured...' })
      })
  }
}
</script>
