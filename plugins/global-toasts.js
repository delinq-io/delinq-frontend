import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

export default () => {
  // Success toast
  Vue.toasted.register('success', (payload) => {
    return payload.message
      ? payload.message
      : 'Success'
  }, {
    type: 'success',
    position: 'top-right',
    duration: 5000
  })

  // Error toast
  Vue.toasted.register('error', (payload) => {
    return payload.message
      ? payload.message
      : 'Error'
  }, {
    type: 'error',
    position: 'top-right',
    duration: 5000
  })
}
