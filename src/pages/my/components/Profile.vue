<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync()
import { useMemberStore } from '@/stores'
import { storeToRefs } from 'pinia'
// 如需解构store里面的数据，必须使用storeToRefs来转成响应式数据
const { profile } = storeToRefs(useMemberStore())

const orderTypes = [
  { type: 1, text: '待付款', icon: 'icon-currency' },
  { type: 2, text: '待发货', icon: 'icon-gift' },
  { type: 3, text: '待收货', icon: 'icon-check' },
  { type: 4, text: '待评价', icon: 'icon-comment' },
]
</script>

<template>
  <view class="profile" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <view class="profile-panel">
      <!-- 情况1：已登录 -->
      <view class="overview" v-if="profile">
        <navigator url="/pagesMember/profileInfo/profileInfo" hover-class="none">
          <image class="avatar" mode="aspectFill" :src="profile?.avatar" />
        </navigator>
        <view class="meta">
          <view class="nickname"> {{ profile?.nickname || profile.account }} </view>
          <navigator class="extra" url="/pagesMember/profileInfo/profileInfo" hover-class="none">
            <text class="update">更新头像昵称</text>
          </navigator>
        </view>
      </view>
      <!-- 情况2：未登录 -->
      <view class="overview" v-else>
        <navigator url="/pages/login/login" hover-class="none">
          <image
            class="avatar gray"
            mode="aspectFill"
            src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png"
          />
        </navigator>
        <view class="meta">
          <navigator url="/pages/login/login" hover-class="none" class="nickname"> 未登录 </navigator>
          <view class="extra">
            <text class="tips">点击登录账号</text>
          </view>
        </view>
      </view>
      <navigator class="settings" url="/pagesMember/settings/settings" hover-class="none"> 设置 </navigator>
    </view>
    <view class="profile-orders">
      <view class="title">
        我的订单
        <navigator class="navigator" url="/pagesOrder/list/list?type=0" hover-class="none">
          查看全部订单<text class="icon-right"></text>
        </navigator>
      </view>
      <view class="section">
        <!-- 订单 -->
        <navigator
          v-for="item in orderTypes"
          :key="item.type"
          :class="item.icon"
          :url="`/pagesOrder/list/list?type=${item.type}`"
          class="navigator"
          hover-class="none"
        >
          {{ item.text }}
        </navigator>
        <!-- 客服 -->
        <button class="contact icon-handset" open-type="contact">售后</button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.profile {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/center_bg.png);
  background-size: 100% auto;
  .profile-panel {
    margin-top: 20rpx;
    position: relative;
    .overview {
      display: flex;
      height: 120rpx;
      padding: 0 36rpx;
      color: #fff;
    }

    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: #eee;
    }

    .gray {
      filter: grayscale(100%);
    }

    .meta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      line-height: 30rpx;
      padding: 16rpx 0;
      margin-left: 20rpx;
    }

    .nickname {
      max-width: 350rpx;
      margin-bottom: 16rpx;
      font-size: 30rpx;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .extra {
      display: flex;
      font-size: 20rpx;
    }

    .tips {
      font-size: 22rpx;
    }

    .update {
      padding: 3rpx 10rpx 1rpx;
      color: rgba(255, 255, 255, 0.8);
      border: 1rpx solid rgba(255, 255, 255, 0.8);
      margin-right: 10rpx;
      border-radius: 30rpx;
    }

    .settings {
      position: absolute;
      bottom: 0;
      right: 40rpx;
      font-size: 30rpx;
      color: #fff;
    }
  }
  .profile-orders {
    position: relative;
    z-index: 99;
    padding: 30rpx;
    margin: 50rpx 20rpx 0;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

    .title {
      height: 40rpx;
      line-height: 40rpx;
      font-size: 28rpx;
      color: #1e1e1e;

      .navigator {
        font-size: 24rpx;
        color: #939393;
        float: right;
      }
    }
    .section {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 10rpx;
      margin-top: 20rpx;
      .navigator,
      .contact {
        text-align: center;
        font-size: 24rpx;
        color: #333;
        &::before {
          display: block;
          font-size: 60rpx;
          color: #ff9545;
        }
      }
      .contact {
        padding: 0;
        margin: 0;
        border: 0;
        background-color: transparent;
        line-height: inherit;
      }
    }
  }
}
</style>
