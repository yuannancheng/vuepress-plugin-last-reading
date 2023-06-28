import { PopupConfig } from './lastReadingPlugin.js'
import type { LocaleConfig } from '@vuepress/shared'

export type I18n = LocaleConfig<PopupConfig>

export default <I18n>{
  '/': {
    message: 'Last reading',
    goto: 'Go to',
    close: 'Close'
  },
  '/zh/': {
    message: '上次阅读位置',
    goto: '前往',
    close: '关闭'
  }
}
