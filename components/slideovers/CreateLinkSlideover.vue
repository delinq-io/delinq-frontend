<template>
  <BaseSlideover
    :showing="showCreateLinkSlideover"
    title="Create new link"
    @close="close()"
  >
    <validation-observer v-slot="{ handleSubmit, failed }">
      <form class="h-full flex flex-col justify-between" @submit.prevent="handleSubmit(submit)">
        <div>
          <!--------------------------------------->
          <!-- link domain -->
          <div>
            <div class="mb-4">
              <div class="flex justify-between items-center flex-wrap">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Domain</label>
              </div>
              <div class="mt-1">
                <div class="flex justify-between items-center shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full p-3 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:text-gray-300">
                  <p>delinq.io</p>

                  <div class="flex items-center space-x-2">
                    <div class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                      <p class="text-gray-900 dark:text-white text-xs">
                        Default
                      </p>
                    </div>
                    <font-awesome-icon icon="caret-down" class="text-xs text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--------------------------------------->
          <!-- link url -->
          <validation-provider
            v-slot="{ errors }"
            name="url"
            rules="required|url|min:2|max:512"
          >
            <div class="my-4">
              <div class="flex justify-between items-center flex-wrap">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Paste long url</label>
                <span v-show="errors[0]" class="inline-block w-auto text-xs text-red-500 ">{{ errors[0] }}.</span>
              </div>
              <div class="mt-1">
                <textarea
                  v-model="form.url"
                  name="url"
                  class="h-20 dark:bg-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:text-gray-300"
                />
              </div>
            </div>
          </validation-provider>

          <collapse-transition>
            <div v-show="showMore">
              <hr class="h-px border-none bg-gray-300 dark:bg-gray-700">

              <!--------------------------------------->
              <!-- link title -->
              <validation-provider
                v-slot="{ errors }"
                name="title"
                rules="min:1|max:64"
              >
                <div class="mt-4">
                  <div class="flex justify-between items-center flex-wrap">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <span v-show="errors[0]" class="inline-block w-auto text-xs text-red-500 ">{{ errors[0] }}.</span>
                  </div>
                  <div class="mt-1">
                    <input
                      v-model="form.title"
                      name="title"
                      placeholder="Add a title."
                      class="dark:bg-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:text-gray-300"
                    >
                  </div>
                </div>
              </validation-provider>

              <!--------------------------------------->
              <!-- link key -->
              <validation-provider
                v-slot="{ errors }"
                name="key"
                rules="min:1|max:512"
              >
                <div class="mt-4">
                  <div class="flex justify-between items-center flex-wrap">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Customize back-half</label>
                    <span v-show="errors[0]" class="inline-block w-auto text-xs text-red-500 ">{{ errors[0] }}.</span>
                  </div>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-850 text-gray-500 dark:text-gray-400 sm:text-sm">
                      delinq.io/
                    </span>
                    <input
                      v-model="form.key"
                      name="key"
                      type="text"
                      autocomplete="off"
                      class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                    >
                  </div>
                </div>
              </validation-provider>
            </div>
          </collapse-transition>

          <div class="my text-right">
            <button
              type="button"
              class="text-gray-400 hover:underline text-xs cursor-pointer focus:outline-none"
              @click="showMore = !showMore"
            >
              {{ showMore ? 'Less' : 'More' }} options
            </button>
          </div>
        </div>

        <!--------------------------->
        <!-- submit button -->
        <div class="py-5">
          <button
            :disabled="failed || isLoading"
            type="submit"
            class="w-full text-sm bg-indigo-600 text-white py-2 rounded-md"
            :class="{ 'cursor-not-allowed': failed || isLoading }"
          >
            Shorten link
          </button>
        </div>
      </form>
    </validation-observer>
  </BaseSlideover>
</template>

<script>
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      isLoading: false,
      form: {},
      showMore: false
    }
  },
  computed: {
    ...mapState('layout', [
      'showCreateLinkSlideover'
    ])
  },
  methods: {
    close () {
      this.$store.commit('layout/TOGGLE_CREATE_LINK_SLIDEOVER', false)
    },
    submit () {
      this.isLoading = true
      this.$store.dispatch('links/create', { ...this.form, workspaceName: this.$route.params.name })
        .then(() => {
          this.form = {}
          this.$toasted.global.success({ message: 'Link successfully created!' })
          this.close()
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
