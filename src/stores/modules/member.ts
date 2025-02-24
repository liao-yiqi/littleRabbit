import type { LoginResult } from '@/types/member'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMemberStore = defineStore(
  'member',
  () => {
    const profile = ref<LoginResult>()
    const setProfile = (value: LoginResult) => {
      profile.value = value
    }
    const clearProfile = () => {
      profile.value = undefined
    }
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
