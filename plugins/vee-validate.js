import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from '@/locales/en.json'

// -------------------------------------------
// -- load all default rules
// -------------------------------------------

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    // eslint-disable-next-line import/namespace
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

// -------------------------------------------
// -- add custom validation rules
// -------------------------------------------

extend('password', {
  params: ['target'],
  validate (value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match'
})

extend('url', {
  validate (value) {
    if (value) {
      const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm
      return regex.test(value)
    }

    return false
  },
  message: 'This value must be a valid URL'
})
