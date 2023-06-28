import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { lastReadingPlugin } from '../../dist/node/index.js'

export default defineUserConfig({
  base: '/vuepress-plugin-last-reading/',
  title: 'vuepress-plugin-last-reading',
  description: '一个记录上次阅读进度的 vuepress 插件',
  dest: 'docs/.vuepress/dist',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'vuepress-plugin-last-reading',
      description: 'A vuepress plugin to record the last reading'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'vuepress-plugin-last-reading',
      description: '一个记录上次的阅读位置的 vuepress 插件'
    }
  },
  theme: defaultTheme({
    repo: 'yuannancheng/vuepress-plugin-last-reading',
    docsDir: 'docs',
    editLink: true,
    locales: {
      '/': {
        selectLanguageText: 'Languages',
        selectLanguageName: 'English',
        selectLanguageAriaLabel: 'English',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: true,
        lastUpdatedText: 'Last Updated',
        sidebar: 'auto'
      },
      '/zh/': {
        selectLanguageText: '选择语言',
        selectLanguageName: '简体中文',
        selectLanguageAriaLabel: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: true,
        lastUpdatedText: '最后更新时间',
        sidebar: 'auto'
      }
    }
  }),
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {}
  }),
  plugins: [
    lastReadingPlugin({
      popupConfig: {
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
    })
  ]
})
