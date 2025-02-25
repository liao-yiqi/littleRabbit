<template>
  <view class="viewport">
    <CustomNavbar />
    <XtxSwiper :list="bannerList" />
    <CategoryPanel :list="categoryList" />
  </view>
</template>
<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem } from '@/types/home'
import { getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const { result } = await getHomeBannerAPI()
  bannerList.value = result
}

const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const { result } = await getHomeCategoryAPI()
  categoryList.value = result
}

onLoad(async () => {
  await Promise.allSettled([getHomeBannerData(), getHomeCategoryData()])
})
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
