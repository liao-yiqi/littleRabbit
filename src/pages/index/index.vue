<template>
  <view class="viewport">
    <CustomNavbar />
    <scroll-view
      refresher-enabled
      scroll-y
      class="scroll-view"
      :refresher-triggered="isTriggered"
      @scrolltolower="onScrolltolower"
      @refresherrefresh="onRefresh"
    >
      <PageSkeleton v-if="isLoading" />
      <template v-else>
        <XtxSwiper :list="bannerList" />
        <CategoryPanel :list="categoryList" />
        <HotPanel :list="hotItemList" />
        <XtxGuess ref="guessRef" />
      </template>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { XtxGuessInstance } from '@/types/components'
import { useGuessList } from '@/composables'

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

const hotItemList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const { result } = await getHomeHotAPI()
  hotItemList.value = result
}

const { guessRef, onScrolltolower } = useGuessList()

const isLoading = ref(false)
const getPageData = async () => {
  isLoading.value = true
  await Promise.allSettled([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
}

const isTriggered = ref(false)
const onRefresh = async () => {
  isTriggered.value = true
  await Promise.allSettled([getPageData(), guessRef.value?.resetData()])
  isTriggered.value = false
}

onLoad(() => {
  getPageData()
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
  .scroll-view {
    flex: 1;
    overflow: hidden;
  }
}
</style>
