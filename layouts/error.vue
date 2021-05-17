<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="container text-center mt-24">
      <h1 class="text-5xl font-black dark:text-gray-100">
        {{ error.statusCode }}
      </h1>
      <div class="my-4 text-xl dark:text-gray-100">
        {{ error.message }}
      </div>

      <button
        type="submit"
        class="mt-4 px-4 text-sm bg-indigo-600 text-white py-2 rounded-md"
        @click="$router.push('/login')"
      >
        Go to the homepage
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
