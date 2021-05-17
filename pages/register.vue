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

    <div class="w-full max-w-3xl mt-4 mx-auto flex flex-shrink-0">
      <!-- form --->
      <RegisterForm />

      <!-- steps -->
      <div class="pt-12 pl-8 hidden md:block">
        <div class="pt-6 px-4 sm:px-6 lg:px-8">
          <nav class="flex justify-center">
            <ol class="space-y-6">
              <form-step-current label="Register" />
              <form-step-upcoming label="Activate account" />
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
