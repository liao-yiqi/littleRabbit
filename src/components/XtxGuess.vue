<template>
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessLikeList"
      :key="item.id + new Date().getTime()"
      :url="`/pages/goods/goods?id=` + item.id"
    >
      <image class="image" mode="aspectFill" :src="item.picture" />
      <view class="name">{{ item.desc }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text">{{ finish ? '没有更多数据~' : '正在加载...' }}</view>
</template>

<script setup lang="ts">
import { getHomeGuessLikeAPI } from '@/services/home'
import type { PageParams } from '@/types/global'
import type { GuessItem } from '@/types/home'
import { onMounted, ref } from 'vue'
const guessLikeList = ref<GuessItem[]>([])
const finish = ref(false)
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}

const getGuessLikeData = async () => {
  if (finish.value === true) return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  const { result } = await getHomeGuessLikeAPI(pageParams)
  const _items = result.items.map((item) => {
    return {
      key: new Date().getTime(),
      ...item,
    }
  })
  guessLikeList.value.push(..._items)
  pageParams.page < result.pages ? pageParams.page++ : (finish.value = true)
}

const resetData = async () => {
  pageParams.page = 1
  guessLikeList.value = []
  await getGuessLikeData()
  finish.value = false
}

onMounted(() => {
  getGuessLikeData()
})

defineExpose({
  getMore: getGuessLikeData,
  resetData,
})
</script>
<style lang="scss" scoped>
:host {
  display: block;
}
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    box-sizing: border-box;
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .name {
    height: 95rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
