<script setup lang="ts">
import type { AddressItems } from '@/types/address'
import { ref } from 'vue'

const emit = defineEmits<{
  (event: 'close'): void
}>()

const props = defineProps<{
  addressList: AddressItems[]
}>()

const onChangeSelect = (item: AddressItems) => {
  props.addressList.forEach((addressItem) => {
    addressItem.isDefault = addressItem.id === item.id ? 1 : 0
  })
}

const selectedAddress = ref<{ addressList: string[]; addressId: string }>()
const onSelectAddress = async () => {
  const selectedItem = props.addressList.find((item) => item.isDefault === 1)
  selectedAddress.value = {
    addressList: [selectedItem!.fullLocation, selectedItem!.address],
    addressId: selectedItem!.id,
  }
  emit('close')
}

defineExpose({
  selectedAddress,
})
</script>

<template>
  <view class="address-panel">
    <!-- 关闭按钮 -->
    <text class="close icon-close" @tap="emit('close')"></text>
    <!-- 标题 -->
    <view class="title">配送至</view>
    <!-- 内容 -->
    <view class="content">
      <view class="item" v-for="item in addressList" :key="item.id" @tap="onChangeSelect(item)">
        <view class="user"> {{ item.receiver }} {{ item.contact }} </view>
        <view class="address">{{ item.fullLocation }}{{ item.address }}</view>
        <text class="icon" :class="[item.isDefault === 1 ? 'icon-checked' : 'icon-ring']"></text>
      </view>
    </view>
    <view class="footer">
      <view v-if="addressList.length" class="button primary" @tap="onSelectAddress">确定</view>
      <navigator
        v-else
        url="/pagesMember/address-form/address-form"
        hover-class="none"
        class="button primary"
      >
        新建地址
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
.address-panel {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;
}

.title {
  line-height: 1;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ddd;
  color: #444;
}

.close {
  position: absolute;
  right: 30rpx;
  top: 30rpx;
  width: 10rpx;
  height: 10rpx;
}

.content {
  min-height: 300rpx;
  max-height: 540rpx;
  overflow: auto;
  padding: 20rpx;
  .item {
    padding: 30rpx 50rpx 30rpx 60rpx;
    background-size: 40rpx;
    background-repeat: no-repeat;
    background-position: 0 center;
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    position: relative;
  }
  .icon {
    color: #999;
    font-size: 40rpx;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 0;
  }
  .icon-checked {
    color: #27ba9b;
  }
  .icon-ring {
    color: #444;
  }
  .user {
    font-size: 28rpx;
    color: #444;
    font-weight: 500;
  }
  .address {
    font-size: 26rpx;
    color: #666;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #444;

  .button {
    flex: 1;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin: 0 20rpx;
    color: #fff;
    border-radius: 72rpx;
  }

  .primary {
    color: #fff;
    background-color: #27ba9b;
  }

  .secondary {
    background-color: #ffa868;
  }
}
</style>
