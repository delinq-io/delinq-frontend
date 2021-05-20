<template>
  <validation-observer v-slot="{ handleSubmit, failed }" class="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 mt-8">
    <form @submit.prevent="handleSubmit(submitForm)">
      <h1 class="text-xl font-black dark:text-gray-100">
        Create new workspace
      </h1>

      <!--------------------------->
      <!-- name -->
      <validation-provider
        v-slot="{ errors }"
        name="name"
        rules="required|max:32"
      >
        <div class="my-4 mt-8">
          <div class="flex justify-between items-center flex-wrap">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Workspace name</label>
            <span v-show="errors[0]" class="inline-block w-auto text-xs text-red-500 ">{{ errors[0] }}.</span>
          </div>
          <div class="mt-1">
            <input
              v-model="form.name"
              name="name"
              type="text"
              class="bg-gray-100 dark:bg-gray-900 outline-none appearance-none border border-transparent rounded w-full p-2 text-gray-700 dark:text-gray-300 leading-normal focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-gray-300 dark:focus:border-gray-500"
            >
          </div>
        </div>
      </validation-provider>

      <!--------------------------->
      <!-- timezone -->
      <validation-provider
        v-slot="{ errors }"
        name="name"
        rules="required"
      >
        <div class="my-6">
          <div class="flex justify-between items-center flex-wrap">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Reporting Timezone</label>
            <span v-show="errors[0]" class="inline-block w-auto text-xs text-red-500 ">{{ errors[0] }}.</span>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-1">
            To make sure we agree on what 'today' means
          </p>

          <div class="mt-1">
            <div class="w-full pr-3 bg-gray-900 rounded">
              <timezone-select
                v-model="form.timezone"
              />
            </div>
          </div>
        </div>
      </validation-provider>

      <!--------------------------->
      <!-- submit button -->
      <button
        :disabled="failed || isLoading"
        type="submit"
        class="mt-4 w-full text-sm bg-indigo-600 text-white py-2 rounded-md"
        :class="{ 'cursor-not-allowed': failed }"
      >
        Create
      </button>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      isLoading: false,
      form: {
        name: '',
        timezone: 'Europe/Brussels'
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
