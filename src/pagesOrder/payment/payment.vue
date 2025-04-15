<script setup lang="ts">
import { useGuessList } from '@/composables'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取页面参数
const props = defineProps<{
  id: string
}>()

// 猜你喜欢
const { guessRef, onScrolltolower } = useGuessList()

// 页面加载
onLoad(() => {
  wx.showModal({
    title: '温馨提示',
    content: '此交易是模拟支付，您并未付款，不会导致实际购买商品或服务',
    confirmText: '知道了',
    showCancel: false,
  })
})
const navigatorBtn: { url: string; text: string; openType: 'switchTab' | 'redirect' | 'navigate' }[] = [
  { url: '/pages/index/index', text: '返回首页', openType: 'switchTab' },
  { url: `/pagesOrder/orderDetail/orderDetail?id=${props.id}`, text: '查看订单', openType: 'redirect' },
]
const activeIndex = ref(0)
</script>

<template>
  <scroll-view enable-back-to-top class="viewport" scroll-y @scrolltolower="onScrolltolower">
    <!-- 订单状态 -->
    <view class="overview">
      <view class="status icon-checked">支付成功</view>
      <view class="tips">提示: 本小程序仅为演示用途，并未实际支付或购买商品或服务</view>
      <view class="buttons">
        <navigator
          v-for="(item, index) in navigatorBtn"
          :key="item.url"
          :url="item.url"
          :open-type="item.openType"
          hover-class="none"
          class="button navigator"
          :class="{ active: index === activeIndex }"
          @tap="activeIndex = index"
        >
          {{ item.text }}
        </navigator>
      </view>
    </view>

    <!-- 猜你喜欢 -->
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.viewport {
  background-color: #f7f7f8;
}

.overview {
  line-height: 1;
  padding: 50rpx 0;
  color: #fff;
  background-color: #27ba9b;

  .tips {
    width: 70%;
    font-size: 24rpx;
    text-align: center;
    line-height: 1.5;
    margin: 60rpx auto;
  }

  .status {
    font-size: 36rpx;
    font-weight: 500;
    text-align: center;
  }

  .status::before {
    display: block;
    font-size: 110rpx;
    margin-bottom: 20rpx;
  }

  .buttons {
    height: 60rpx;
    line-height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60rpx;
  }

  .button {
    text-align: center;
    margin: 0 10rpx;
    font-size: 28rpx;
    color: #fff;

    /* &:first-child {
      width: 200rpx;
      border-radius: 64rpx;
      border: 1rpx solid #fff;
    } */
  }
  .active {
    width: 200rpx;
    border-radius: 64rpx;
    border: 1rpx solid #fff;
  }
}
</style>
