## Introduce

This plug-in records the current browsing location information when the page is closed. Used to display a popup window to that location on the next visit.

This plugin is refactored using [VuePress 2](https://v2.vuepress.vuejs.org) API based on [@tolking/vuepress-plugin-last-reading](https://github.com/tolking/vuepress-plugin-last-reading)

Because `VuePress 2` is still in `beta` when this plugin is developed, major changes are likely to occur in the `Minor` version. Please be sure to read the [change log](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md) of VuePress carefully when using it. This version of the plugin is based on [VuePress v2.0.0-beta.63](https://github.com/vuepress/vuepress-next/releases/tag/v2.0.0-beta.63).

## Install

``` sh
npm i @yuannancheng/vuepress-plugin-last-reading
```

## Use

``` js
import { lastReadingPlugin } from '@yuannancheng/vuepress-plugin-last-reading'

export default {
  plugins: [
    lastReadingPlugin({
      // options
    }),
  ],
}
```

## Options

### popupConfig

- type: `PopupConfig | I18n`
- required: `false`

The default prompt text content displayed in the popup component.

``` js
import { lastReadingPlugin } from '@yuannancheng/vuepress-plugin-last-reading'

export default {
  plugins: [
    lastReadingPlugin({
      popupConfig: {
        message: 'last read position',
        goto: 'go to',
        close: 'close'
      },
    }),
  ],
}
```

Or refer to I18n type to configure multi-language.

### popupCountdown

- type: `number`
- default: `10000`
- required: `false`

Configure the time to display the popup window.

### storageKeyName

- type: `string`
- default：`'vuepress-plugin-last-reading'`
- required: `false`

It is used to set the `localStorage` key name to store reading progress data.

### smooth

- type: `boolean`
- default：`true`
- required: `false`

Used to set whether to scroll smoothly when positioning to the last reading position.

> Translated by Google Translate.

