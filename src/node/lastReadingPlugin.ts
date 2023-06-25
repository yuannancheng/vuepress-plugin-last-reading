import type { Plugin, PluginObject } from '@vuepress/core'
import type { I18n } from './i18n'
import { getDirname, path } from '@vuepress/utils'

export interface LastReadingPluginOptions {
  popupCountdown?: number // 多少毫秒后自动关闭
  storageKeyName?: string // 存储键名
  smooth?: boolean // 平滑滚动到指定位置
  popupConfig?: PopupConfig | I18n // 自定义弹出按钮及消息
}

export interface PopupConfig {
  message: string
  goto: string
  close: string
}

export const defaultOption: LastReadingPluginOptions = {
  popupCountdown: 10000,
  storageKeyName: 'vuepress-plugin-last-reading',
  smooth: true,
  popupConfig: {
    message: '上次阅读位置',
    goto: '前往',
    close: '关闭'
  }
}

const __dirname = getDirname(import.meta.url)

export const lastReadingPlugin =
  (options: LastReadingPluginOptions = {}): Plugin =>
  () => {
    const plugin: PluginObject = {
      name: '@yuannancheng/vuepress-plugin-last-reading'
    }

    const pluginOptions = {
      ...defaultOption,
      ...options
    }

    return {
      ...plugin,

      // 客户端配置文件
      clientConfigFile: path.resolve(__dirname, '../client/clientConfig.ts'),

      define: {
        __LAST_READING_PLUGIN_OPTIONS__: pluginOptions
      }
    }
  }
