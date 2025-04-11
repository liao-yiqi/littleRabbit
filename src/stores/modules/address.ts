import type { AddressItems } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  const selectedAddress = ref<AddressItems>()
  const changeSelectedAddress = (value: AddressItems) => {
    selectedAddress.value = value
  }
  return {
    selectedAddress,
    changeSelectedAddress,
  }
})
