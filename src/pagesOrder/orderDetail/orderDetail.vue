<script setup lang="ts">
import { OrderState, orderStateList } from '@/services/contants'
import {
  deleteMemberOrderAPI,
  getMemberOrderByIdAPI,
  getMemberOrderConsignmentByIdAPI,
  getMemberOrderLogisticsByIdAPI,
  putMemberOrderReceiptByIdAPI,
} from '@/services/order'
import type { LogisticItem, OrderResult } from '@/types/order'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { getPayMockAPI, getPayWxPayMiniPayAPI } from '@/services/pay'

const { safeAreaInsets } = uni.getSystemInfoSync()
const props = defineProps<{
  id: string
}>()

// 弹出层组件
const popup = ref<{
  open: (type?: 'top' | 'bottom') => void
  close: () => void
}>()
// 取消原因列表
const reasonList = ref(['商品无货', '不想要了', '商品信息填错了', '地址信息填写错误', '商品降价', '其它'])
// 订单取消原因
const reason = ref('')

// 获取页面栈
const pages = getCurrentPages()
// 获取当前页面实例
const pageInstance = pages.at(-1) as any

onReady(() => {
  // 动画效果,导航栏背景色
  pageInstance.animate(
    '.navbar',
    [{ backgroundColor: 'transparent' }, { backgroundColor: '#f8f8f8' }],
    1000,
    {
      scrollSource: '#scroller',
      timeRange: 1000,
      startScrollOffset: 0,
      endScrollOffset: 50,
    },
  )
  // 动画效果,导航栏标题
  pageInstance.animate('.navbar .title', [{ color: 'transparent' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 50,
  })
  // 动画效果,导航栏返回按钮
  pageInstance.animate('.navbar .back', [{ color: '#fff' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 50,
  })
})

const memberOrderData = ref<OrderResult>()
const getMemberOrderByIdData = async () => {
  const { result } = await getMemberOrderByIdAPI(props.id)
  memberOrderData.value = result
  if (
    [OrderState.DaiShouHuo, OrderState.DaiPingJia, OrderState.YiWanCheng].includes(
      memberOrderData.value.orderState,
    )
  ) {
    getLogisticData()
  }
}
const onTimeup = () => {
  // 修改订单状态为已取消
  memberOrderData.value!.orderState = OrderState.YiQuXiao
}

// 去支付
const isDev = import.meta.env.DEV
const onOrderPay = async () => {
  if (isDev) {
    await getPayMockAPI({ orderId: props.id })
  } else {
    await getPayWxPayMiniPayAPI({ orderId: props.id })
  }
  uni.redirectTo({ url: `/pagesOrder/payment/payment?id=${props.id}` })
}

// 模拟发货
const onOrderSend = async () => {
  if (isDev) {
    await getMemberOrderConsignmentByIdAPI(props.id)
    uni.showToast({ title: '发货成功', icon: 'none', mask: true })
    memberOrderData.value!.orderState = OrderState.DaiShouHuo
  }
}

const logisticList = ref<LogisticItem[]>([])
const getLogisticData = async () => {
  const { result } = await getMemberOrderLogisticsByIdAPI(props.id)
  logisticList.value = result.list
}

// 确认收货
const onOrderConfirm = () => {
  uni.showModal({
    content: '为保障您的权益，请收到货并确认无误后，再确认收货',
    confirmColor: '#27BA9B',
    success: async (success) => {
      if (success.confirm) {
        const { result } = await putMemberOrderReceiptByIdAPI(props.id)
        // 更新订单状态
        memberOrderData.value!.orderState = result.orderState
      }
    },
  })
}

// 删除订单
const onOrderDelete = () => {
  uni.showModal({
    content: '确定要删除该订单吗？',
    confirmColor: '#27BA9B',
    success: async (success) => {
      if (success.confirm) {
        await deleteMemberOrderAPI({ ids: [props.id] })
        uni.redirectTo({ url: `/pagesOrder/orderList/orderList` })
      }
    },
  })
}

onLoad(() => {
  getMemberOrderByIdData()
})
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="wrap">
      <navigator
        v-if="pages.length > 1"
        url="/pages/"
        open-type="navigateBack"
        class="back icon-left"
      ></navigator>
      <navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home"> </navigator>
      <view class="title">订单详情</view>
    </view>
  </view>
  <scroll-view scroll-y class="viewport" id="scroller">
    <!-- 订单状态 -->
    <template v-if="memberOrderData">
      <view class="overview" :style="{paddingTop: safeAreaInsets!.top +20+ 'px'}">
        <!-- 待付款状态 -->
        <template v-if="memberOrderData.orderState === OrderState.DaiFuKuan">
          <view class="status icon-clock">待付款</view>
          <view class="tip">
            <text class="money">应付金额：${{ memberOrderData.payMoney }}</text>
            <text class="time">支付剩余</text>
            <uni-countdown
              :second="memberOrderData.countdown"
              color="#fff"
              splitor-color="#fff"
              :show-day="false"
              :show-colon="false"
              @timeup="onTimeup"
            />
          </view>
          <view class="button" @tap="onOrderPay">去支付</view>
        </template>
        <!-- 其他订单状态 -->
        <template v-else>
          <view class="status">
            {{ orderStateList[memberOrderData.orderState].text }}
          </view>
          <view class="button-group">
            <navigator
              class="button"
              :url="`/pagesOrder/createOrder/createOrder?orderId=${props.id}`"
              hover-class="none"
            >
              再次购买
            </navigator>
            <!-- 待发货状态：模拟发货,开发期间使用,用于修改订单状态为已发货 -->
            <view v-if="isDev" class="button" @tap="onOrderSend">模拟发货</view>
          </view>
        </template>
      </view>
      <!-- 配送状态 -->
      <view class="shipment">
        <!-- 订单物流信息 -->
        <view v-for="item in logisticList" :key="item.id" class="item">
          <view class="message">
            {{ item.text }}
          </view>
          <view class="date"> {{ item.time }} </view>
        </view>
        <!-- 用户收货地址 -->
        <view class="locate">
          <view class="user">
            {{ memberOrderData?.receiverContact }}
            {{ memberOrderData?.receiverMobile }}
          </view>
          <view class="address">
            {{ memberOrderData?.receiverAddress }}
          </view>
        </view>
      </view>
      <!-- 商品信息 -->
      <view class="goods">
        <view class="item">
          <navigator
            class="navigator"
            v-for="item in memberOrderData.skus"
            :key="item.spuId"
            :url="`/pages/goods/goods?id=${item.id}`"
            hover-class="none"
          >
            <image class="cover" :src="item.image" />
            <view class="meta">
              <view class="name ellipsis">{{ item.name }}</view>
              <view class="type">{{ item.attrsText }}</view>
              <view class="price">
                <view class="actual">
                  <text class="symbol">¥</text>
                  <text>{{ item.curPrice }}</text>
                </view>
              </view>
              <view class="quantity">x{{ item.quantity }}</view>
            </view>
          </navigator>
          <!-- 待评价状态:展示按钮 -->
          <view class="action" v-if="memberOrderData.orderState === OrderState.DaiPingJia">
            <view class="button primary">申请售后</view>
            <navigator url="" class="button"> 去评价 </navigator>
          </view>
        </view>
        <!-- 合计 -->
        <view class="total">
          <view class="row">
            <view class="text">商品总价：</view>
            <view class="symbol">{{ memberOrderData.totalMoney }}</view>
          </view>
          <view class="row">
            <view class="text">运费：</view>
            <view class="symbol">1{{ memberOrderData.postFee }}</view>
          </view>
          <view class="row">
            <view class="text">应付金额：</view>
            <view class="symbol primary">{{ memberOrderData.payMoney }}</view>
          </view>
        </view>
      </view>
      <!-- 订单信息 -->
      <view class="detail">
        <view class="title">订单信息</view>
        <view class="row">
          <view class="item"> 订单编号: {{ props.id }} <text class="copy">复制</text> </view>
          <view class="item">下单时间: {{ memberOrderData.createTime }}</view>
        </view>
      </view>
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
      <!-- 底部操作栏 -->
      <view class="toolbar-height" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"></view>
      <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
        <!-- 待付款状态:展示支付按钮 -->
        <template v-if="memberOrderData.orderState === OrderState.DaiFuKuan">
          <view class="button primary" @tap="onOrderPay"> 去支付 </view>
          <view class="button" @tap="popup?.open?.()"> 取消订单 </view>
        </template>
        <!-- 其他订单状态:按需展示按钮 -->
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/create?orderId=${props.id}`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 待收货状态: 展示确认收货 -->
          <view
            class="button primary"
            v-if="memberOrderData.orderState === OrderState.DaiShouHuo"
            @tap="onOrderConfirm"
          >
            确认收货
          </view>
          <!-- 待评价状态: 展示去评价 -->
          <view class="button" v-if="memberOrderData.orderState === OrderState.DaiPingJia">去评价</view>
          <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
          <view
            class="button delete"
            v-if="memberOrderData.orderState >= OrderState.DaiPingJia"
            @tap="onOrderDelete"
          >
            删除订单
          </view>
        </template>
      </view>
    </template>
    <template v-else>
      <!-- 骨架屏组件 -->
      <PageSkeleton />
    </template>
  </scroll-view>
  <!-- 取消订单弹窗 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <view class="popup-root">
      <view class="title">订单取消</view>
      <view class="description">
        <view class="tips">请选择取消订单的原因：</view>
        <view class="cell" v-for="item in reasonList" :key="item" @tap="reason = item">
          <text class="text">{{ item }}</text>
          <text class="icon" :class="{ checked: item === reason }"></text>
        </view>
      </view>
      <view class="footer">
        <view class="button" @tap="popup?.close?.()">取消</view>
        <view class="button primary">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.navbar {
  width: 750rpx;
  color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: transparent;
  .wrap {
    position: relative;
    .title {
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32rpx;
      color: transparent;
    }
    .back {
      position: absolute;
      left: 0;
      height: 44px;
      width: 44px;
      font-size: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }
}

.viewport {
  background-color: #f7f7f8;
}

.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  padding-bottom: 30rpx;
  color: #fff;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: cover;
  .status {
    font-size: 36rpx;
    &::before {
      margin-right: 6rpx;
      font-weight: 500;
    }
  }

  .tip {
    margin: 30rpx 0;
    display: flex;
    font-size: 14px;
    align-items: center;
    .money {
      margin-right: 30rpx;
    }
  }
  .button {
    width: 260rpx;
    height: 64rpx;
    margin: 0 10rpx;
    text-align: center;
    line-height: 64rpx;
    font-size: 28rpx;
    color: #27ba9b;
    border-radius: 68rpx;
    background-color: #fff;
  }
  .button-group {
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.shipment {
  line-height: 1.4;
  padding: 0 20rpx;
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: #fff;
  .item {
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/car.png);
    border-bottom: 1rpx solid #eee;
    position: relative;
    .message {
      font-size: 26rpx;
      color: #444;
    }
    .date {
      font-size: 24rpx;
      color: #666;
    }
  }
  .locate,
  .item {
    min-height: 120rpx;
    padding: 30rpx 30rpx 25rpx 75rpx;
    background-size: 50rpx;
    background-repeat: no-repeat;
    background-position: 6rpx center;
  }
  .locate {
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    .user {
      font-size: 26rpx;
      color: #444;
    }
    .address {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.goods {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  .item {
    padding: 30rpx 0;
    border-bottom: 1rpx solid #eee;
    .navigator {
      display: flex;
      margin: 20rpx 0;
    }
    .cover {
      width: 170rpx;
      height: 170rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }
    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }
    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }
    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }
    .price {
      display: flex;
      margin-top: 6rpx;
      font-size: 24rpx;
    }
    .symbol {
      font-size: 20rpx;
    }
    .original {
      color: #999;
      text-decoration: line-through;
    }
    .actual {
      margin-left: 10rpx;
      color: #444;
    }
    .text {
      font-size: 22rpx;
    }
    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 24rpx;
      color: #444;
    }
    .action {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-start;
      padding: 30rpx 0 0;

      .button {
        width: 200rpx;
        height: 60rpx;
        text-align: center;
        justify-content: center;
        line-height: 60rpx;
        margin-left: 20rpx;
        border-radius: 60rpx;
        border: 1rpx solid #ccc;
        font-size: 26rpx;
        color: #444;
      }

      .primary {
        color: #27ba9b;
        border-color: #27ba9b;
      }
    }
  }
  .total {
    line-height: 1;
    font-size: 26rpx;
    padding: 20rpx 0;
    color: #666;

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10rpx 0;
    }

    .symbol::before {
      content: '¥';
      font-size: 80%;
      margin-right: 3rpx;
    }

    .primary {
      color: #cf4444;
      font-size: 36rpx;
    }
  }
}

.detail {
  line-height: 1;
  padding: 30rpx 20rpx 0;
  margin: 20rpx 20rpx 0;
  font-size: 26rpx;
  color: #666;
  border-radius: 10rpx;
  background-color: #fff;
  .title {
    font-size: 30rpx;
    color: #444;
  }

  .row {
    padding: 20rpx 0;

    .item {
      padding: 10rpx 0;
      display: flex;
      align-items: center;
    }

    .copy {
      border-radius: 20rpx;
      font-size: 20rpx;
      border: 1px solid #ccc;
      padding: 5rpx 10rpx;
      margin-left: 10rpx;
    }
  }
}

.toolbar-height {
  height: 100rpx;
  box-sizing: content-box;
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;
  box-sizing: content-box;

  .button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 200rpx;
    height: 72rpx;
    margin-left: 15rpx;
    font-size: 26rpx;
    border-radius: 72rpx;
    border: 1rpx solid #ccc;
    color: #444;
  }

  .delete {
    order: 4;
    color: #cf4444;
  }

  .button {
    order: 3;
  }

  .secondary {
    order: 2;
    color: #27ba9b;
    border-color: #27ba9b;
  }

  .primary {
    order: 1;
    color: #fff;
    background-color: #27ba9b;
  }
}

.popup-root {
  padding: 30rpx 30rpx 0;
  border-radius: 10rpx 10rpx 0 0;
  overflow: hidden;

  .title {
    font-size: 30rpx;
    text-align: center;
    margin-bottom: 30rpx;
  }

  .description {
    font-size: 28rpx;
    padding: 0 20rpx;

    .tips {
      color: #444;
      margin-bottom: 12rpx;
    }

    .cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15rpx 0;
      color: #666;
    }

    .icon::before {
      content: '\e6cd';
      font-family: 'erabbit' !important;
      font-size: 38rpx;
      color: #999;
    }

    .icon.checked::before {
      content: '\e6cc';
      font-size: 38rpx;
      color: #27ba9b;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 0 40rpx;
    font-size: 28rpx;
    color: #444;

    .button {
      flex: 1;
      height: 72rpx;
      text-align: center;
      line-height: 72rpx;
      margin: 0 20rpx;
      color: #444;
      border-radius: 72rpx;
      border: 1rpx solid #ccc;
    }

    .primary {
      color: #fff;
      background-color: #27ba9b;
      border: none;
    }
  }
}
</style>
