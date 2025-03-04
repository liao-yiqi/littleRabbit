<template>
  <view class="panel hot">
    <view class="item" v-for="item in list" :key="item.id">
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text class="title-desc">{{ item.alt }}</text>
      </view>
      <navigator hover-class="none" :url="`/pages/hot/hot?type=${item.type}`" class="cards">
        <image v-for="src in item.pictures" :key="src" class="image" mode="aspectFit" :src="src"></image>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { HotItem } from '@/types/home'

defineProps<{
  list: HotItem[]
}>()
</script>

<style lang="scss" scoped>
.hot {
  display: flex;
  flex-wrap: wrap;
  min-height: 508rpx;
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    flex-direction: column;
    width: 50%;
    box-sizing: border-box;
    // flex: auto;
    height: 254rpx;
    border-right: 1rpx solid #eee;
    border-top: 1rpx solid #eee;
    .title {
      display: flex;
      align-items: center;
      padding: 24rpx 24rpx 0;
      font-size: 32rpx;
      color: #262626;
      position: relative;
      justify-content: start;
      .title-desc {
        font-size: 24rpx;
        color: #7f7f7f;
        margin-left: 18rpx;
      }
    }
    &:nth-child(2n) {
      border-right: 0 none;
    }
    &:nth-child(-n + 2) {
      border-top: 0 none;
    }
    .image {
      width: 150rpx;
      height: 150rpx;
    }
  }
  .cards {
    flex: 1;
    padding: 15rpx 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
