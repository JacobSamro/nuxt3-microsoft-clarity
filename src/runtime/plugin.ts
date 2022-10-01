import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { clarity } from 'clarity-js'
import { Config } from 'clarity-js/types/core'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const config: Config = runtimeConfig.clarity
  config.upload = (data) => {
    navigator.sendBeacon('https://m.clarity.ms/collect', data)
  }
  // console.log('clarity', config)

  if (config.projectId) {
    clarity.start(config)
  }
})
