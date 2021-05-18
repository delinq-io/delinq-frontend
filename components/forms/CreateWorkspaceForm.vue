<template>
  <form
    class="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 mt-8"
    @submit.prevent="submitForm()"
  >
    <h1 class="text-xl font-black dark:text-gray-100">
      Create new workspace
    </h1>

    <!--------------------------->
    <!-- name -->
    <div class="my-4 mt-8">
      <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="email">Workspace name</label>
      <input
        v-model="form.name"
        name="name"
        type="text"
        class="bg-gray-100 dark:bg-gray-900 outline-none appearance-none border border-transparent rounded w-full p-2 text-gray-700 dark:text-gray-300 leading-normal focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-gray-300 dark:focus:border-gray-500"
      >
    </div>

    <!--------------------------->
    <!-- submit button -->
    <button
      :disabled="isLoading"
      type="submit"
      class="mt-4 w-full text-sm bg-indigo-600 text-white py-2 rounded-md"
    >
      Create
    </button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      form: {
        name: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.isLoading = true
      this.$axios.post('/workspaces', this.form)
        .then((res) => {
          this.$toasted.global.success({ message: 'Workspace successfully created!' })
          this.$router.push(`/workspaces/${res.data.name}`)
        })
        .catch((err) => {
          this.$toast.global.error({ message: err.response.data.errors[0].message })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
