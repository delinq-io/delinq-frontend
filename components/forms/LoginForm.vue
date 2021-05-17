<template>
  <form
    class="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 mt-8"
    @submit.prevent="submitLoginForm()"
  >
    <h1 class="text-xl font-black dark:text-gray-100">
      Enter your email and password
    </h1>

    <!--------------------------->
    <!-- email -->
    <div class="my-4 mt-8">
      <label class="block text-gray-700 dark:text-gray-300  text-sm font-bold mb-2" for="email">Email</label>
      <input
        v-model="loginForm.email"
        name="email"
        type="email"
        placeholder="user@example.com"
        class="bg-gray-100 dark:bg-gray-900 outline-none appearance-none border border-transparent rounded w-full p-2 text-gray-700 dark:text-gray-300 leading-normal focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-gray-300 dark:focus:border-gray-500"
      >
    </div>

    <!--------------------------->
    <!-- password -->
    <div class="my-4">
      <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="password">Password</label>
      <input
        v-model="loginForm.password"
        name="password"
        type="password"
        class="transition bg-gray-100 dark:bg-gray-900 outline-none appearance-none border border-transparent rounded w-full p-2 text-gray-700 dark:text-gray-300 leading-normal focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-gray-300 dark:focus:border-gray-500"
      >
      <p class="text-gray-500 text-xs my-2">
        Forgot your password?
        <nuxt-link to="/password/request-reset" class="underline text-gray-800 dark:text-gray-50">
          Click here
        </nuxt-link>to reset it
      </p>
    </div>

    <!--------------------------->
    <!-- remember me -->
    <div class="my-5">
      <div class="flex items-center">
        <input id="remember_me" v-model="loginForm.remember_me" type="checkbox" class="form-checkbox h-4 w-4 transition duration-150 ease-in-out">
        <label for="remember_me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Remember me
        </label>
      </div>
    </div>

    <!--------------------------->
    <!-- submit button -->
    <button
      :disabled="isLoading"
      type="submit"
      class="mt-4 w-full text-sm bg-indigo-600 text-white py-2 rounded-md"
    >
      Login →
    </button>

    <p class="text-center text-gray-500 text-xs mt-4">
      Don't have an account?
      <nuxt-link to="/register" class="underline text-gray-800 dark:text-gray-50">
        Register
      </nuxt-link>
      now for free!
    </p>
  </form>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      loginForm: {
        email: '',
        password: '',
        remember_me: false
      }
    }
  },
  methods: {
    submitLoginForm () {
      this.isLoading = true
      this.$auth.loginWith('local', { data: this.loginForm })
        .then((res) => {
          this.$toast.global.success({ message: 'Successfully authenticated!' })
          setTimeout(() => {
            (res.data.firstLogin)
              ? this.$router.push('/workspaces/new?showSteps=true')
              : this.$router.push('/workspaces')
          }, 50)
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
