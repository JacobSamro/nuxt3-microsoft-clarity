import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { clarity } from 'clarity-js'
import { ModuleOptions } from '../module'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const config: ModuleOptions = runtimeConfig.clarity
  config.upload = (data) => {
    navigator.sendBeacon('https://m.clarity.ms/collect', data)
  }
  // console.log('clarity', config)

  if (config.projectId && config.auto) {
    clarity.start(config)
  }
})
