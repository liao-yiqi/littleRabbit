<template>
  <view>
    <CustomNavbar />
    <XtxSwiper :list="bannerList" />
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
import { getHomeBannerAPI } from '@/services/home'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const { result } = await getHomeBannerAPI()
  bannerList.value = result
}
onLoad(async () => {
  await Promise.allSettled([getHomeBannerData()])
})
</script>

<style lang="scss" scoped></style>
