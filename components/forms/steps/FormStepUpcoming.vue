<template>
  <li class="flex items-start">
    <div class="flex-shrink-0 h-5 w-5 relative flex items-center justify-center">
      <div class="h-2 w-2 bg-gray-300 dark:bg-gray-700 rounded-full" />
    </div>
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
