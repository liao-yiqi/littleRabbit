<script setup lang="ts">
import { useGoTop } from '@/composables'
import { getMemberCartAPI, deleteMemberCartAPI } from '@/services/cart'
import { useMemberStore } from '@/stores'
import type { CartItem } from '@/types/cart'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
const memberStore = useMemberStore()
const memberCartList = ref<CartItem[]>([])
const getMemberCartData = async () => {
  const { result } = await getMemberCartAPI()
  memberCartList.value = result
}
const onSelectedChange = (item: CartItem) => {
  item.selected = !item.selected
}

const { isShowGoTop, onScroll, scrollTop, onGoTop } = useGoTop()

const onDeleteCartItem = (skuId: string) => {
  uni.showModal({
    title: '是否删除当前商品',
    confirmColor: '#27ba9b',
    success: async (res) => {
      if (res.confirm) {
        await deleteMemberCartAPI({ ids: [skuId] })
        getMemberCartData()
        uni.showToast({
          title: '删除成功',
          icon: 'success',
          mask: true,
        })
      }
    },
  })
}

onShow(() => {
  if (memberStore.profile) getMemberCartData()
})
</script>

<template>
  <scroll-view scroll-y :scroll-top="scrollTop" scroll-with-animation @scroll="onScroll" class="scroll-view">
    <button class="go-top" v-show="isShowGoTop" @tap="onGoTop" />
    <template v-if="memberStore.profile">
      <!-- 购物车列表 -->
      <view class="cart-list" v-if="memberCartList.length">
        <view class="tips">
          <text class="label">满减</text>
          <text class="desc">满1件，即可享受9折优惠</text>
        </view>
        <uni-swipe-action>
          <uni-swipe-action-item v-for="item in memberCartList" :key="item.skuId" class="cart-swipe">
            <view class="goods">
              <text class="checkbox" :class="{ checked: item.selected }" @tap="onSelectedChange(item)"></text>
              <navigator :url="`/pages/goods/goods?id=${item.id}`" hover-class="none" class="navigator">
                <image :src="item.picture" mode="aspectFill" class="picture" />
                <view class="meta">
                  <view class="name">{{ item.name }}</view>
                  <view class="attrsText">{{ item.attrsText }}</view>
                  <view class="price">{{ item.nowPrice }}</view>
                </view>
              </navigator>
              <view class="count">
                <text class="text">-</text>
                <input class="input" type="number" :value="item.count.toString()" />
                <text class="text">+</text>
              </view>
            </view>
            <template #right>
              <view class="cart-swipe-right">
                <button class="button delete-button" @tap="onDeleteCartItem(item.skuId)">删除</button>
              </view>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <view class="cart-blank" v-else>
        <image src="/static/images/blank_cart.png" class="image" />
        <text class="text">购物车还是空的，快去挑选好货吧</text>
        <navigator url="/pages/index/index" open-type="switchTab" hover-class="none">
          <button class="button">去首页看看</button>
        </navigator>
      </view>
      <view class="toolbar">
        <text class="all" :class="{ checked: true }">全选</text>
        <text class="text">合计</text>
        <text class="amount">100</text>
        <view class="button-grounp">
          <view class="button payment-button" :class="{ disabled: true }"> 去结算（10） </view>
        </view>
      </view>
    </template>
    <view class="login-blank" v-else>
      <text class="text">登录后可查看购物车中的商品</text>
      <navigator url="/pages/login/login" hover-class="none">
        <button class="button">去登录</button>
      </navigator>
    </view>
    <!-- 猜你喜欢 -->
    <XtxGuess ref="guessRef"></XtxGuess>
    <!-- 底部占位空盒子 -->
    <view class="toolbar-height"></view>
  </scroll-view>
</template>

<style lang="scss">
$main-font: 'erabbit' !important;
.checked-before {
  content: '\e6cc';
  color: #27ba9b;
}

:host {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f7f7f8;
}

.scroll-view {
  flex: 1;
}

.go-top {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 260rpx;
  right: 28rpx;
  border-radius: 40px;
  background-color: white;
  opacity: 0.5;
  &::before {
    content: '\e6c3';
    color: #27ba9b;
    opacity: 0.6;
    font-family: $main-font;
    font-size: 50rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-45%, -50%) rotate(-90deg);
  }
  &:hover {
    opacity: 1;
  }
}

.cart-list {
  padding: 0 20px;
  .tips {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 30rpx 10rpx;
    font-size: 26rpx;
    color: #666;
    .label {
      color: #fff;
      padding: 7rpx 15rpx 5rpx;
      border-radius: 4rpx;
      font-size: 24rpx;
      background-color: #27ba9b;
      margin-right: 10rpx;
    }
  }
  .goods {
    display: flex;
    padding: 20rpx 20rpx 20rpx 80rpx;
    border-radius: 10rpx;
    background-color: #fff;
    position: relative;
    .navigator {
      display: flex;
    }
    .checkbox {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80rpx;
      height: 100%;
      &::before {
        content: '\e6cd';
        font-family: $main-font;
        font-size: 40rpx;
        color: #444;
      }
      &.checked::before {
        @extend .checked-before;
      }
    }
    .picture {
      width: 170rpx;
      height: 170rpx;
    }
    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
      .name {
        height: 72rpx;
        font-size: 26rpx;
        color: #444;
      }
      .attrsText {
        line-height: 1.8;
        padding: 0 15rpx;
        font-size: 24rpx;
        align-self: flex-start;
        border-radius: 4rpx;
        color: #888;
        max-width: 50prpx;
        background-color: #f7f7f8;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .price {
        line-height: 1;
        font-size: 26rpx;
        color: #444;
        margin-bottom: 2rpx;
        color: #cf4444;
        &::before {
          content: '￥';
          font-size: 80%;
        }
      }
    }
    .count {
      position: absolute;
      bottom: 10rpx;
      right: 5rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 220rpx;
      height: 48rpx;
      .text {
        height: 100%;
        padding: 0 20rpx;
        font-size: 32rpx;
        color: #444;
      }
      .input {
        height: 100%;
        text-align: center;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #444;
        background-color: #f6f6f6;
      }
    }
  }
  .cart-swipe {
    display: block;
    margin: 20rpx 0;
  }
  .cart-swipe-right {
    display: flex;
    height: 100%;
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100rpx;
      padding: 6rpx;
      line-height: 1.5;
      color: #fff;
      font-size: 26rpx;
      border-radius: 0;
    }
    .delete-button {
      background-color: #cf4444;
    }
  }
}

.cart-blank,
.login-blank {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  .image {
    width: 400rpx;
    height: 281rpx;
  }
  .text {
    color: #444;
    font-size: 26rpx;
    margin: 20rpx 0;
  }
  .button {
    width: 240rpx !important;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 20rpx;
    font-size: 26rpx;
    border-radius: 60rpx;
    color: #fff;
    background-color: #27ba9b;
  }
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: var(--window-bottom);
  z-index: 1;
  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;
  box-sizing: content-box;
  .all {
    margin-left: 25rpx;
    font-size: 14px;
    color: #444;
    display: flex;
    align-items: center;
  }
  .all::before {
    font-family: $main-font;
    content: '\e6cd';
    font-size: 40rpx;
    margin-right: 8rpx;
  }
  .checked::before {
    @extend .checked-before;
  }
  .text {
    margin-right: 8rpx;
    margin-left: 32rpx;
    color: #444;
    font-size: 14px;
  }
  .amount {
    font-size: 20px;
    color: #cf4444;
    .decimal {
      font-size: 12px;
    }
    &::before {
      content: '￥';
      font-size: 12px;
    }
  }
  .button-grounp {
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 72rpx;
    font-size: 13px;
    color: #fff;
    .button {
      width: 240rpx;
      margin: 0 10rpx;
      border-radius: 72rpx;
    }
    .payment-button {
      background-color: #27ba9b;
      &.disabled {
        opacity: 0.6;
      }
    }
  }
}
.toolbar-height {
  height: 100rpx;
}
</style>
