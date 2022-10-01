import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'

export interface ModuleOptions {
  enablePlugin: boolean
  id: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'clarity',
    configKey: 'clarity'
  },
  defaults: {
    enablePlugin: true,
    id: null
  },
  setup (options, nuxt) {
    if (options.enablePlugin) {
      nuxt.options.app.head.script.push({
        hid: 'clarity',
        children: `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${options.id}");`
      })
    }
  }
})
