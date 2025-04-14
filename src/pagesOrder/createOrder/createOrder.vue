<script setup lang="ts">
import { getMemberAddressById } from '@/services/address'
import {
  getMemberOrderPreAPI,
  getMemberOrderPreNowAPI,
  getMemberOrderRepurchaseByIdAPI,
  postMemberOrderAPI,
} from '@/services/order'
import { useAddressStore } from '@/stores/modules/address'
import type { AddressItems } from '@/types/address'
import type { OrderCreateParams, OrderPreResult } from '@/types/order'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref, watchEffect } from 'vue'

const { safeAreaInsets } = uni.getSystemInfoSync()
const props = defineProps<{
  skuId: string
  count: string
  addressId: string
  orderId: string
}>()
const deliveryList = ref([
  { type: 1, text: '时间不限 (周一至周日)' },
  { type: 2, text: '工作日送 (周一至周五)' },
  { type: 3, text: '周末配送 (周六至周日)' },
])
const activeIndex = ref(0)
const activeDelivery = computed(() => deliveryList.value[activeIndex.value])

const orderPre = ref<OrderPreResult>()
const getMemberOrderPreData = async () => {
  const { skuId, count, orderId } = props
  if (skuId && count) {
    const { result } = await getMemberOrderPreNowAPI({ skuId, count })
    orderPre.value = result
  } else if (orderId) {
    const { result } = await getMemberOrderRepurchaseByIdAPI(orderId)
    orderPre.value = result
  } else {
    const { result } = await getMemberOrderPreAPI()
    orderPre.value = result
  }
}

const addressStore = useAddressStore()
const selecteAddress = ref<AddressItems>()
const getSelectAddress = async () => {
  // 判断当前是否从立即购买跳转
  if (props.addressId) {
    const { result } = await getMemberAddressById(props.addressId)
    selecteAddress.value = result
  } else {
    selecteAddress.value =
      addressStore.selectedAddress || orderPre.value?.userAddresses.find((item) => item.isDefault)
  }
}

const buyerMessage = ref<string>()
const onSubmitOrder = async () => {
  if (!selecteAddress.value?.id) return uni.showToast({ title: '请选择收货地址', icon: 'none' })
  const { result } = await postMemberOrderAPI({
    addressId: selecteAddress.value?.id!,
    deliveryTimeType: activeDelivery.value.type,
    buyerMessage: buyerMessage.value!,
    goods: orderPre.value!.goods.map((item) => {
      return {
        count: item.count,
        skuId: item.skuId,
      }
    }),
    payChannel: 2,
    payType: 1,
  })
  uni.redirectTo({ url: `/pagesOrder/orderDetail/orderDetail?id=${result.id}` })
}

onLoad(() => {
  getMemberOrderPreData()
})
watchEffect(() => {
  getSelectAddress()
})
</script>

<template>
  <scroll-view scroll-y class="viewport">
    <!-- 收货地址 -->
    <navigator
      v-if="selecteAddress"
      url="/pagesMember/address/address?from=order"
      hover-class="none"
      class="shipment"
    >
      <view class="user">{{ selecteAddress.receiver }} {{ selecteAddress.contact }}</view>
      <view class="address">{{ selecteAddress.fullLocation }} {{ selecteAddress.address }}</view>
      <view class="icon icon-right"></view>
    </navigator>
    <navigator v-else url="/pagesMember/address/address?from=order" hover-class="none" class="shipment">
      <view class="address">请选择收货地址</view>
      <view class="icon icon-right"></view>
    </navigator>
    <!-- 商品信息 -->
    <view class="goods">
      <navigator
        :url="`/pages/goods/goods?id=${item.id}`"
        hover-class="none"
        v-for="item in orderPre?.goods"
        :key="item.skuId"
        class="item"
      >
        <image class="picture" :src="item.picture" />
        <view class="meta">
          <view class="name">{{ item.name }}</view>
          <view class="attrs">{{ item.attrsText }}</view>
          <view class="prices">
            <view class="pay-price symbol">{{ item.payPrice }}</view>
            <view class="price symbol">{{ item.price }}</view>
          </view>
          <view class="count">x{{ item.count }}</view>
        </view>
      </navigator>
    </view>
    <!-- 支付方式 -->
    <view class="related">
      <view class="item">
        <view class="text">配送时间</view>
        <picker :range="deliveryList" range-key="text">
          <view class="icon-fonts picker">
            {{ activeDelivery.text }}
          </view>
        </picker>
      </view>
      <view class="item">
        <text class="text">订单备注</text>
        <input
          class="input"
          :cursor-spacing="30"
          placeholder="建议留言前先与商家沟通确认"
          v-model="buyerMessage"
        />
      </view>
    </view>
    <!-- 支付金额 -->
    <view class="settlement">
      <view class="item">
        <text class="text">商品总价：</text>
        <text class="number symbol">
          {{ orderPre?.summary.totalPrice.toFixed(2) }}
        </text>
      </view>
      <view class="item">
        <text class="text">运费: </text>
        <text class="number symbol">{{ orderPre?.summary.postFee.toFixed(2) }}</text>
      </view>
    </view>
    <view style="height: 150rpx"></view>
    <!-- 工具栏 -->
    <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      <view class="total-pay symbol">
        <text class="number">{{ orderPre?.summary.totalPayPrice.toFixed(2) }}</text>
      </view>
      <view class="button" :class="{ disabled: !selecteAddress?.id }" @tap="onSubmitOrder"> 提交订单 </view>
    </view>
  </scroll-view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

.shipment {
  margin: 20rpx;
  padding: 30rpx 30rpx 30rpx 84rpx;
  font-size: 26rpx;
  border-radius: 10rpx;
  background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png) 20rpx center /
    50rpx no-repeat #fff;
  position: relative;
  .user {
    color: #333;
    margin-bottom: 5rpx;
  }
  .address {
    color: #666;
  }
  .icon {
    font-size: 36rpx;
    color: #333;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20rpx;
  }
}

.goods {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  .item {
    display: flex;
    padding: 30rpx 0;
    border-top: 1rpx solid #eee;
    &:first-child {
      border-top: none;
    }
    .picture {
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
    .attrs {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }
    .prices {
      display: flex;
      align-items: baseline;
      margin-top: 6rpx;
      font-size: 28rpx;
      .pay-price {
        margin-right: 10rpx;
        color: #cf4444;
      }
      .price {
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
    }
    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 26rpx;
      color: #444;
    }
  }
}

.related {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }
  .input {
    flex: 1;
    text-align: right;
    margin: 20rpx 0;
    padding-right: 20rpx;
    font-size: 26rpx;
    color: #999;
  }
  .item .text {
    width: 125rpx;
  }
  .picker {
    color: #666;
    &::after {
      content: '\e6c2';
    }
  }
}

.settlement {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }
  .danger {
    color: #cf4444;
  }
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .total-pay {
    font-size: 40rpx;
    color: #cf4444;

    .decimal {
      font-size: 75%;
    }
  }

  .button {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 72rpx;
    background-color: #27ba9b;
  }

  .disabled {
    opacity: 0.6;
  }
}

.symbol::before {
  content: '￥';
  font-size: 80%;
  margin-right: 5rpx;
}
</style>
