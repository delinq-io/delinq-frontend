<template>
  <li class="flex items-start">
    <span class="flex-shrink-0 h-5 w-5 relative flex items-center justify-center">
      <span class="absolute h-4 w-4 rounded-full bg-indigo-200 dark:bg-indigo-100" />
      <span class="relative block w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
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
