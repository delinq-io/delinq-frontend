<template>
  <div>
    <div class="mx-auto mt-6 text-center dark:text-gray-100">
      <h1 class="text-3xl font-extrabold">
        Create your account now, for free and forever!
      </h1>
      <div class="text-xl">
        Shorten long URLs and track clicks in just a few clicks
      </div>
    </div>

    <!-------------------------------------------->
    <!-- form ------------------------------------>
    <!-------------------------------------------->
    <div class="w-full max-w-3xl mt-4 mx-auto flex flex-shrink-0">
      <validation-observer v-slot="{ handleSubmit, passed }" class="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 mb-4 mt-8">
        <form @submit.prevent="handleSubmit(submitRegisterForm)">
          <h2 class="text-xl font-black dark:text-gray-100">
            Enter your details
          </h2>

          <!--------------------------->
          <!-- username -->
          <validation-provider
            v-slot="{ errors }"
            name="username"
            rules="required|min:2|max:32"
          >
            <div class="my-4">
              <div class="flex justify-between items-center flex-wrap">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="register-form_name">Username</label>
                <span v-show="errors[0]" class="inline-block w-auto text-xs text-red-500 ">{{ errors[0] }}.</span>
              </div>
              <div class="mt-1">
                <input
                  v-model="registerForm.username"
                  name="username"
                  type="text"
                  placeholder="John"
                  class="dark:bg-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:text-gray-300"
                >
              </div>
            </div>
          </validation-provider>

          <!--------------------------->
          <!-- email -->
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email|max:128"
          >
            <div class="my-4">
              <div class="flex justify-between items-center flex-wrap">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="register-form_email">Email</label>
                <p v-if="!errors[0]" class="text-xs text-gray-500 mt-1">
                  No spam, guaranteed.
                </p>
                <span v-if="errors[0]" class="inline-block w-auto text-xs text-red-500 ">{{ errors[0] }}.</span>
              </div>
              <div class="mt-1">
                <input
                  v-model="registerForm.email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  class="dark:bg-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:text-gray-300"
                >
              </div>
            </div>
          </validation-provider>

          <!--------------------------->
          <!-- password -->
          <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required|min:8|max:64"
          >
            <div class="my-4">
              <div class="flex justify-between items-center flex-wrap">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="register-form_password">Password</label>
                <p v-if="!errors[0]" class="text-xs text-gray-500 mt-1">
                  Min 8 characters
                </p>
                <span v-if="errors[0]" class="inline-block w-auto text-xs text-red-500 ">{{ errors[0] }}.</span>
              </div>
              <div class="mt-1">
                <input
                  v-model="registerForm.password"
                  name="user[password]"
                  type="password"
                  class="dark:bg-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:text-gray-300"
                >
              </div>
            </div>
          </validation-provider>

          <!--------------------------->
          <!-- password confirmation -->
          <validation-provider
            v-slot="{ errors }"
            name="password-confirmation"
            rules="required|password:@password"
          >
            <div class="my-4">
              <div class="flex justify-between items-center flex-wrap">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="register-form_password_confirmation">Password confirmation</label>
                <span v-show="errors[0]" class="inline-block w-auto text-xs text-red-500 ">{{ errors[0] }}.</span>
              </div>
              <div class="mt-1">
                <input
                  v-model="registerForm.password_confirmation"
                  name="user[password_confirmation]"
                  type="password"
                  class="dark:bg-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:text-gray-300"
                >
              </div>
            </div>
          </validation-provider>

          <!--------------------------->
          <!-- submit button -->
          <button
            :disabled="!passed || isLoading"
            type="submit"
            class="mt-4 w-full text-sm bg-indigo-600 text-white py-2 rounded-md"
            :class="{ 'cursor-not-allowed': !passed }"
          >
            Register now →
          </button>

          <p class="text-center text-gray-500 text-xs mt-4">
            Already have an account?
            <nuxt-link to="/login" class="underline text-gray-800 dark:text-gray-50">
              Log in
            </nuxt-link>
            instead.
          </p>
        </form>
      </validation-observer>

      <!-------------------------------------------->
      <!-- steps ----------------------------------->
      <!-------------------------------------------->
      <div class="pt-12 pl-8 hidden md:block">
        <div class="pt-6 px-4 sm:px-6 lg:px-8">
          <nav class="flex justify-center">
            <ol class="space-y-6">
              <form-step-current label="Register" />
              <form-step-upcoming label="Activate account" />
              <form-step-upcoming label="Shorten links!" />
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  layout: 'form',
  middleware: 'guest',
  data () {
    return {
      isLoading: false,
      registerForm: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    submitRegisterForm () {
      this.isLoading = true
      this.$axios.post('/auth/register', this.registerForm)
        .then(() => {
          this.$toast.global.success({ message: 'A confirmation email has been sent to your address.' })
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
