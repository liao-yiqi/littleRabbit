<script setup lang="ts">
import { orderStateList, OrderState } from '@/services/contants'
import { deleteMemberOrderAPI, getMemberOrderAPI, getMemberOrderCancelByIdAPI } from '@/services/order'
import { getPayMockAPI, getPayWxPayMiniPayAPI } from '@/services/pay'
import type { OrderItem, OrderListParams } from '@/types/order'
import { onMounted, ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const props = defineProps<{
  orderState: number
}>()

// 请求参数
const orderParams: OrderListParams = {
  page: 1,
  pageSize: 5,
  orderState: props.orderState,
}
const memberOrderList = ref<OrderItem[]>([])
const isLoading = ref(false)
const finish = ref(false)
const getMemberOrderList = async () => {
  if (isLoading.value) return
  if (finish.value === true) return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  isLoading.value = true
  const { result } = await getMemberOrderAPI(orderParams)
  const _items = result.items.map((item) => {
    return {
      ...item,
    }
  })
  memberOrderList.value.push(..._items)
  isLoading.value = false
  orderParams.page! < result.pages ? orderParams.page!++ : (finish.value = true)
}
onMounted(() => {
  getMemberOrderList()
})

// 更改订单状态
const changeOrderState = (id: string, state: OrderState) => {
  const order = memberOrderList.value.find((item) => item.id === id)
  order!.orderState = state
}

// 去支付
const onOrderPay = async (id: string) => {
  if (import.meta.env.DEV) {
    await getPayMockAPI({ orderId: id })
  } else {
    await getPayWxPayMiniPayAPI({ orderId: id })
  }
  uni.showToast({ title: '支付成功', icon: 'success', mask: true })
  changeOrderState(id, OrderState.DaiFaHuo)
}

// 下拉刷新
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  isTriggered.value = true
  orderParams.page = 1
  memberOrderList.value = []
  await getMemberOrderList()
  isTriggered.value = false
}

// 删除订单
const onOrderDelete = (id: string) => {
  uni.showModal({
    content: '确定删除该订单吗？',
    confirmColor: '#27BA9B',
    success: async (res) => {
      if (res.confirm) {
        await deleteMemberOrderAPI({ ids: [id] })
        const index = memberOrderList.value.findIndex((v) => v.id === id)
        uni.showToast({ title: '删除成功', icon: 'none' })
        memberOrderList.value.splice(index, 1)
      }
    },
  })
}

// 取消订单
const onOrderCancel = (id: string) => {
  uni.showModal({
    content: '确定取消该订单吗？',
    confirmColor: '#27BA9B',
    success: async (res) => {
      if (res.confirm) {
        await getMemberOrderCancelByIdAPI(id, { cancelReason: '' })
        uni.showToast({
          title: '取消成功！',
          icon: 'success',
          mask: true,
        })
        changeOrderState(id, OrderState.YiQuXiao)
      }
    },
  })
}
</script>

<template>
  <scroll-view
    scroll-y
    class="orders"
    @scrolltolower="getMemberOrderList"
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh"
  >
    <view class="card" v-for="item in memberOrderList" :key="item.id">
      <!-- 订单信息 -->
      <view class="status">
        <text class="date">{{ item.createTime }}</text>
        <!-- 订单状态文字 -->
        <text>{{ orderStateList[item.orderState].text }}</text>
        <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
        <text
          class="icon-delete"
          v-show="item.orderState >= OrderState.DaiPingJia"
          @tap="onOrderDelete(item.id)"
        ></text>
      </view>
      <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
      <navigator
        v-for="sku in item.skus"
        :key="sku.spuId"
        class="goods"
        :url="`/pagesOrder/detail/detail?id=${sku.id}`"
        hover-class="none"
      >
        <view class="cover">
          <image mode="aspectFit" :src="sku.image"></image>
        </view>
        <view class="meta">
          <view class="name ellipsis">{{ sku.name }}</view>
          <view class="type">{{ sku.attrsText }}</view>
        </view>
      </navigator>
      <!-- 支付信息 -->
      <view class="payment">
        <text class="quantity">共{{ item.totalNum }}件商品</text>
        <text>实付</text>
        <text class="amount">
          <text class="symbol">¥</text>
          {{ item.payMoney }}
        </text>
      </view>
      <!-- 订单操作按钮 -->
      <view class="action">
        <!-- 待付款状态：显示去支付按钮 -->
        <template v-if="item.orderState === OrderState.DaiFuKuan">
          <view class="button" @tap="onOrderCancel(item.id)">取消订单</view>
          <view class="button primary" @tap="onOrderPay(item.id)">去支付</view>
        </template>
        <!-- 再次购买 -->
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/createOrder/createOrder?orderId=${item.id}`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 待收货状态: 展示确认收货 -->
          <view v-if="item.orderState === OrderState.DaiShouHuo" class="button primary">确认收货</view>
        </template>
      </view>
    </view>
    <!-- 底部提示文字 -->
    <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      {{ finish ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>

<style lang="scss">
// 订单列表
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;

    .date {
      color: #666;
      flex: 1;
    }

    .primary {
      color: #ff9240;
    }

    .icon-delete {
      line-height: 1;
      margin-left: 10rpx;
      padding-left: 10rpx;
      border-left: 1rpx solid #e3e3e3;
    }
  }

  .goods {
    display: flex;
    margin-bottom: 20rpx;

    .cover {
      width: 170rpx;
      height: 170rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;
    }

    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      line-height: 1;
      padding: 6rpx 4rpx 6rpx 8rpx;
      font-size: 24rpx;
      color: #fff;
      border-radius: 10rpx 0 0 0;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 10rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }
  }

  .payment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
    padding: 20rpx 0;
    text-align: right;
    color: #999;
    font-size: 28rpx;
    border-bottom: 1rpx solid #eee;

    .quantity {
      font-size: 24rpx;
      margin-right: 16rpx;
    }

    .amount {
      color: #444;
      margin-left: 6rpx;
    }

    .symbol {
      font-size: 20rpx;
    }
  }

  .action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20rpx;

    .button {
      width: 180rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20rpx;
      border-radius: 60rpx;
      border: 1rpx solid #ccc;
      font-size: 26rpx;
      color: #444;
    }

    .secondary {
      color: #27ba9b;
      border-color: #27ba9b;
    }

    .primary {
      color: #fff;
      background-color: #27ba9b;
    }
  }

  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>
