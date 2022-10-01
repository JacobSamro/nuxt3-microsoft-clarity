import { defineNuxtModule, isNuxt2 } from '@nuxt/kit'

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
      const children = `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${options.id}");`

      if (isNuxt2()) {
        nuxt.options.head.script = nuxt.options.head.script || []
        nuxt.options.head.script.push({
          hid: 'clarity',
          innerHTML: children
        })
        return
      }

      nuxt.options.app.head.script.push({
        hid: 'clarity',
        children
      })
    }
  }
})
