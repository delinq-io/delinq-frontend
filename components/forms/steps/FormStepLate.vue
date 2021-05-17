<template>
  <li class="flex items-start">
    <span class="flex-shrink-0 relative h-5 w-5 flex items-center justify-center">
      <svg class="h-full w-full text-indigo-600 dark:text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    </span>
    <p class="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
      {{ label }}
    </p>
  </li>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
