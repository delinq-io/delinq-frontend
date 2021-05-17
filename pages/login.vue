<template>
  <LoginForm />
</template>

<script>
export default {
  layout: 'form',
  middleware: 'guest'
}
</script>
