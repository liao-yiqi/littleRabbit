import type { XtxGuessInstance } from '@/types/components'
import { ref } from 'vue'

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
