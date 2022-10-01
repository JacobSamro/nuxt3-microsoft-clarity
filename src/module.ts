import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { addPlugin, defineNuxtModule, isNuxt2 } from '@nuxt/kit'
import { Config } from 'clarity-js/types/core'

export interface ModuleOptions extends Config {
  enablePlugin: boolean,
  auto: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'clarity',
    configKey: 'clarity'
  },
  defaults: {
    enablePlugin: true,
    auto: true // enable clarity automatically
  },
  setup (options, nuxt) {
    if (!options.projectId) {
      console.error('[clarity]: projectId is required')
      return
    }

    if (options.enablePlugin) {
      const children = `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${options.projectId}");`

      if (isNuxt2()) {
        nuxt.options.head.script = nuxt.options.head.script || []
        nuxt.options.head.script.push({
          hid: 'clarity',
          innerHTML: children
        })
        return
      }

      nuxt.options.runtimeConfig.public.clarity = {
        auto: options.auto,
        projectId: options.projectId
      }

      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)

      addPlugin({
        src: resolve(runtimeDir, 'plugin'),
        mode: 'client'
      }, {
        append: true
      })
    }
  }
})
