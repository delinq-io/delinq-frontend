<template>
  <div>
    <div class="w-full max-w-3xl mt-4 mx-auto flex flex-shrink-0">
      <!-- form -->
      <ActivateForm />

      <!-- steps -->
      <div class="pt-12 pl-8 hidden md:block">
        <div class="pt-6 px-4 sm:px-6 lg:px-8">
          <nav class="flex justify-center">
            <ol class="space-y-6">
              <form-step-late label="Register" />
              <form-step-current label="Activate account" />
              <form-step-upcoming label="Setup a workspace" />
              <form-step-upcoming label="Shorten links!" />
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'form',
  middleware: 'guest'
}
</script>
