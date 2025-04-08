import type { XtxGuessInstance } from '@/types/components'
import { nextTick, ref } from 'vue'

export const useGuessList = () => {
  const guessRef = ref<XtxGuessInstance>()
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }
  const isTriggered = ref(false)
  const onRefresh = () => {
    isTriggered.value = true
    return new Promise(async (resolve, _) => {
      await guessRef.value?.resetData()
      isTriggered.value = false
      resolve(true)
    })
  }
  return {
    guessRef,
    onScrolltolower,
    isTriggered,
    onRefresh,
  }
}

export const useGoTop = () => {
  const isShowGoTop = ref(false)
  const oldScrollTop = ref(0)
  const onScroll: UniHelper.ScrollViewOnScroll = (e) => {
    oldScrollTop.value = e.detail.scrollTop
    if (e.detail.scrollTop >= 500) {
      isShowGoTop.value = true
    } else {
      isShowGoTop.value = false
    }
  }
  const scrollTop = ref(0)
  const onGoTop = () => {
    scrollTop.value = oldScrollTop.value
    nextTick(() => {
      scrollTop.value = 0
    })
  }
  return {
    isShowGoTop,
    onScroll,
    oldScrollTop,
    onGoTop,
    scrollTop,
  }
}
