## 介绍

该插件在页面关闭时，记录当前浏览的位置信息。用来在下一次访问时，展示一个前往该位置的弹窗。

本插件基于 [@tolking/vuepress-plugin-last-reading](https://github.com/tolking/vuepress-plugin-last-reading) 使用 [VuePress 2](https://v2.vuepress.vuejs.org/zh/) API 进行重构

因开发本插件时 `VuePress 2` 尚处于 `beta` 阶段，很可能会在 `Minor` 版本中发生重大变化，使用时请一定要仔细阅读 VuePress 的 [更新日志](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md)，此版本插件基于 [VuePress v2.0.0-beta.63](https://github.com/vuepress/vuepress-next/releases/tag/v2.0.0-beta.63)。

## 安装

``` sh
npm i @yuannancheng/vuepress-plugin-last-reading
```

## 使用

``` js
import { lastReadingPlugin } from '@yuannancheng/vuepress-plugin-last-reading'

export default {
  plugins: [
    lastReadingPlugin({
      // 配置项
    }),
  ],
}
```

## 选项

### popupConfig
- 类型: `PopupConfig | I18n`
- 必须: `false`

弹出组件中显示的默认提示文本内容。

``` js
import { lastReadingPlugin } from '@yuannancheng/vuepress-plugin-last-reading'

export default {
  plugins: [
    lastReadingPlugin({
      popupConfig: {
        message: '上次阅读位置',
        goto: '前往',
        close: '关闭'
      },
    }),
  ],
}
```

或者参考 I18n 类型配置多语言。

### popupCountdown
- 类型: `number`
- 默认值: `10000`
- 必须: `false`

配置弹窗显示的时间。

### storageKeyName
- 类型: `string`
- 默认值：`'vuepress-plugin-last-reading'`
- 必须: `false`

用于设置 `localStorage` 键名，存储阅读进度数据。

### smooth
- 类型: `boolean`
- 默认：`true`
- 必须: `false`

用于设置定位到上次阅读位置时是否平滑滚动


