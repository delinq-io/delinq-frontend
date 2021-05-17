<template>
  <validation-observer v-slot="{ handleSubmit, passed }" class="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 mb-4 mt-8">
    <form @submit.prevent="handleSubmit(submitActivateForm)">
      <h2 class="text-xl font-black dark:text-gray-100">
        Activate your account
      </h2>

      <div class="mt-2 text-sm text-gray-500 dark:text-gray-200 leading-tight">
        Please enter the 4-digit code we sent to <b>{{ email }}</b>
      </div>

      <div class="mt-12 flex items-stretch flex-grow">
        <!--------------------------->
        <!-- code input -->
        <validation-provider
          v-slot="{}"
          name="code"
          rules="required|min:4|max:4"
        >
          <input
            v-model="activateForm.code"
            type="text"
            placeholder="••••"
            style="letter-spacing: 10px;"
            minlength="4"
            maxlength="4"
            class="tracking-widest font-medium shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-36 px-8 py-2 border-gray-300 dark:border-gray-500 rounded-l-md dark:text-gray-200 dark:bg-gray-900"
          >
        </validation-provider>

        <!--------------------------->
        <!-- submit button -->
        <button
          type="submit"
          class="text-sm bg-indigo-600 text-white px-5 py-2 rounded-r-md"
          :class="{ 'cursor-not-allowed': !passed }"
        >
          Activate →
        </button>
      </div>

      <!--------------------------------------------->
      <!-- Email not received ----------------------->
      <!--------------------------------------------->
      <div class="mt-12 text-sm dark:text-gray-100">
        Didn't receive an email?
      </div>
      <ol class="list-disc text-xs text-gray-500 leading-tight space-y-1 mt-1">
        <li>
          Check your spam folder
        </li>

        <li>
          <!-- TODO: implement send a new code ---------->
          <span class="underline text-indigo-600" @click="$toasted.global.error({ message: 'Not implemented '})">Send a new code</span> to {{ email }}
        </li>

        <li>
          Contact <a class="underline text-indigo-600" href="mailto:dufourarthur.perso@gmail.com">dufourarthur.perso@gmail.com</a> if the problem persists
        </li>
      </ol>

      <!--------------------------------------------->
      <!-- Wrong address ---------------------------->
      <!--------------------------------------------->
      <div class="mt-4 text-sm dark:text-gray-100">
        Entered the wrong email address?
      </div>
      <ul class="list-disc text-xs text-gray-500 leading-tight mt-1">
        <li>
          <!-- TODO: implement delete account -->
          <span class="underline text-indigo-600" @click="$toasted.global.error({ message: 'Not implemented '})">Delete this account</span> and start over
        </li>
      </ul>
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
      email: '',
      activateForm: {
        code: ''
      }
    }
  },
  beforeMount () {
    const email = localStorage.getItem('activate.email')
    email
      ? this.email = email
      : this.$router.push('/login')
  },
  methods: {
    submitActivateForm () {
      this.isLoading = true
      this.$axios.post('/auth/activate', { ...this.activateForm, email: this.email })
        .then(() => {
          localStorage.removeItem('activate.email')
          setTimeout(() => {
            this.$router.push('/login?showSteps=true')
          }, 100)
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
