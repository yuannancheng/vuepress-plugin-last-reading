import { defineClientConfig } from '@vuepress/client'
import { defineComponent, h } from 'vue'
import LastReadingPopup from './LastReadingPopup.vue'
import type { LastReadingPluginOptions } from './LastReadingPopup.vue'

declare const __LAST_READING_PLUGIN_OPTIONS__: LastReadingPluginOptions

const pluginOptions = __LAST_READING_PLUGIN_OPTIONS__

export default defineClientConfig({
  rootComponents: [
    defineComponent(() => {
      if (__VUEPRESS_SSR__) return () => null
      return () => h(LastReadingPopup, pluginOptions)
    })
  ]
})
