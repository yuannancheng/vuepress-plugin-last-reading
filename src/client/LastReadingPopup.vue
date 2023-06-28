<script setup lang="ts">
import type { LocaleConfig } from '@vuepress/shared'
import type { Ref } from 'vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePageData, useRouteLocale } from '@vuepress/client'

export type I18n = LocaleConfig<PopupConfig>

export interface LastReadingPluginOptions {
  popupCountdown: number // 多少毫秒后自动关闭
  storageKeyName: string // 存储键名
  smooth: boolean // 平滑滚动到指定位置
  popupConfig: PopupConfig | I18n // 自定义弹出按钮及消息
}

export interface PopupConfig {
  message: string
  goto: string
  close: string
}

export interface LastReading {
  path?: string
  title?: string
  scrollTop?: number
  timestamp?: number
}

const getObjectValue = <O extends object, K extends keyof O>(obj: O, key: K) => obj[key]

// 接收默认插件配置
const {
  popupCountdown: defaultPopupCountdown = 10000,
  storageKeyName = 'vuepress-plugin-last-reading',
  smooth: smoothScroll = true,
  popupConfig: defaultPopupConfig = {
    message: '上次阅读位置',
    goto: '前往',
    close: '关闭'
  }
} = defineProps<LastReadingPluginOptions>()
// 是否显示弹出组件
const show = ref(false)
// 当前页面数据
const pageData = usePageData()
// 当前页面路由器
const pageRouter = useRouter()
// 当前路由对应的 locale path 的 Ref 对象。
const routeLocale = useRouteLocale()
// 上次阅读数据
const lastReading: Ref<LastReading> = ref({})
// 临时会话
const session: Ref<number | null> = ref(null)
// 倒计时
const popupCountdown = ref(defaultPopupCountdown)
// 更新自动关闭弹窗倒计时定时器
const countdownInterval: Ref<number | undefined> = ref()
// 自动关闭弹窗定时器
const countdownTimeout: Ref<number | undefined> = ref()
// 弹窗配置
const popupConfig = computed(() => {
  return getObjectValue(<I18n>defaultPopupConfig, routeLocale.value) || defaultPopupConfig
})
// 弹窗提示文本
const message = computed(() => {
  return popupConfig.value.message ? popupConfig.value.message + ': ' + lastReading.value.title : ''
})
// 跳转上次阅读位置按钮文本
const gotoButtonText = computed(() => {
  return popupConfig.value.goto || ''
})
// 关闭弹窗按钮文本
const closeButtonText = computed(() => {
  return popupConfig.value.close || ''
})
// 完整路径
const fullPath = computed(() => {
  return pageRouter.currentRoute.value.path + pageRouter.currentRoute.value.hash
})

// 初始化
function init() {
  const localStorageItem = localStorage.getItem(storageKeyName)
  if (localStorageItem) lastReading.value = JSON.parse(localStorageItem)

  const sessionStorageItem = sessionStorage.getItem(storageKeyName)
  if (sessionStorageItem) session.value = JSON.parse(sessionStorageItem)

  /**
   * 判断有无临时会话记录和历史阅读记录
   */
  if (!session.value && getObjectValue(lastReading.value, 'path') !== undefined) {
    // 没有临时会话记录，且有历史阅读记录

    // 判断当前地址是否和上次地址一样
    if (fullPath.value === lastReading.value.path) {
      // 当前页面地址和上次的一样，定位到上次阅读位置

      scrollToLastReading()
      close(false)
    } else {
      // 当前页面地址和上次的不一样，提示用户是否跳转

      show.value = true

      // 倒计时结束自动关闭弹窗并清除上次阅读历史记录
      countdownTimeout.value = window.setTimeout(close, defaultPopupCountdown)

      // 开始倒计时
      countdownInterval.value = window.setInterval(() => {
        popupCountdown.value -= 1e3
      }, 1e3)
    }
  } else {
    // 清除历史记录
    clean()
  }
}

// 关闭弹窗
function close(auto = true) {
  show.value = false

  // 如果是自动倒计时结束调用关闭，则不需要清除定时器
  if (!auto) {
    window.clearTimeout(countdownTimeout.value)
    countdownTimeout.value = undefined
  }

  clean()
}

// 清除历史记录、定时器等
function clean() {
  window.clearInterval(countdownInterval.value)
  countdownInterval.value = undefined

  popupCountdown.value = 0

  localStorage.removeItem(storageKeyName)
  sessionStorage.removeItem(storageKeyName)
}

// 页面滚动到上次阅读位置
function scrollToLastReading() {
  /**
   * 使用异步，以覆盖 Router.scrollBehavior
   * 切换路由后自动滚动到顶部行为
   * 因 router 官方暂未提供临时覆盖 Router.scrollBehavior 配置的接口
   */
  window.setTimeout(() => {
    document.documentElement.scrollTo({
      top: lastReading.value.scrollTop,
      behavior: smoothScroll ? 'smooth' : 'auto'
    })
  }, 0)
}

// 前往上次阅读位置
function gotoLastReading() {
  // 切换路由，并滚动到指定位置
  pageRouter.replace(<string>lastReading.value.path).then(() => {
    scrollToLastReading()
    close(false)
  })
}

// 存储当前阅读位置
function saveThisReading() {
  if (!show.value) {
    const timestamp = new Date().getTime()

    // 存储阅读记录
    localStorage.setItem(
      storageKeyName,
      JSON.stringify({
        path: fullPath.value,
        title: pageData.value.title.slice(0, 200) || document.title.slice(0, 200),
        scrollTop: document.documentElement.scrollTop,
        timestamp: timestamp
      })
    )

    // 标记会话
    sessionStorage.setItem(storageKeyName, JSON.stringify(timestamp))
  }
}

onMounted(() => {
  // 初始化
  init()

  // 页面关闭时存储当前阅读进度
  // Safari不能触发visiblilitychange
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    document.addEventListener('pagehide', function () {
      saveThisReading()
    })
  } else {
    document.addEventListener('visibilitychange', function (event) {
      if (document.visibilityState === 'hidden') {
        saveThisReading()
      }
    })
  }
})
</script>

<template>
  <transition name="last-reading-popup">
    <div v-if="show" class="last-reading-popup">
      <p class="message" :title="message">{{ message }}</p>
      <div class="button-wrap">
        <button @click="gotoLastReading" class="gotoButton">
          {{ gotoButtonText }}
        </button>
        <button @click="close(false)" class="closeButton">
          {{ closeButtonText }}({{ Math.round(popupCountdown / 1e3) }})
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.last-reading-popup {
  position: fixed;
  display: flex;
  right: 5%;
  bottom: 1.5em;
  width: 330px;
  max-width: 80%;
  height: 130px;
  padding: 1em;
  background: var(--c-bg, #ffffff);
  box-shadow: 0px 4px 10px -4px var(--c-text, #2c3e50);
  z-index: 12;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  box-sizing: border-box;
  border-radius: 8px;
}

.last-reading-popup > .message {
  flex-shrink: 0;
  margin: 0;
  line-height: 1;
  color: var(--c-text, #2c3e50);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.5em;
  height: 2em;
  box-sizing: border-box;
}

.last-reading-popup > .button-wrap {
  display: flex;
  padding: 0.4em;
  justify-content: space-evenly;
  height: 100%;
  align-content: center;
  align-items: flex-end;
}

.last-reading-popup > .button-wrap > button {
  display: inline-block;
  font-size: 1.05rem;
  padding: 0.35rem 1.1rem;
  border: 2px solid var(--c-brand, #3eaf7c);
  border-radius: 4px;
  transition: background-color var(--t-color, 0.3s ease);
  box-sizing: border-box;
  cursor: pointer;
}

.last-reading-popup > .button-wrap > .gotoButton {
  color: var(--c-bg, #ffffff);
  background-color: var(--c-brand, #3eaf7c);
}

.last-reading-popup > .button-wrap > .closeButton {
  color: var(--c-brand, #3eaf7c);
  background-color: var(--c-bg, #ffffff);
}

.last-reading-popup > .button-wrap > .gotoButton:hover {
  background-color: var(--c-brand-light, #4abf8a);
}

.last-reading-popup > .button-wrap > .closeButton:hover {
  color: var(--c-bg, #ffffff);
  background-color: var(--c-brand-light, #4abf8a);
}

.last-reading-popup-enter-active,
.last-reading-popup-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.last-reading-popup-enter-from,
.last-reading-popup-leave-to {
  opacity: 0;
  transform: translate(0, 50%) scale(0.5);
}
</style>
./lifecycle.es5.format.js
