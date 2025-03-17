<script setup lang="ts">
import Profile from './components/Profile.vue'
import { ref } from 'vue'
import { useGuessList } from '@/composables'

const { guessRef, onScrolltolower } = useGuessList()
</script>

<template>
  <view class="viewport">
    <Profile />
    <scroll-view class="scroll-view" scroll-y @scrolltolower="onScrolltolower">
      <view class="guess">
        <XtxGuess ref="guessRef" />
      </view>
    </scroll-view>
  </view>
</template>

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
    .guess {
      background-color: #f7f7f8;
      margin-top: 30rpx;
    }
  }
}
</style>
