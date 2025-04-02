<script lang="ts" setup>
import { getMemberAddressById, postMemberAddressAPI, putMemberAddressByIdAPI } from '@/services/address'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

const props = defineProps<{
  id?: string
}>()
uni.setNavigationBarTitle({ title: `${props.id ? '修改' : '新增'}地址` })

const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

const onRegionChange: UniHelper.RegionPickerOnChange = ({ detail }) => {
  const [provinceCode, cityCode, countyCode] = detail.code!
  Object.assign(form.value, {
    fullLocation: detail.value.join(' '),
    provinceCode,
    cityCode,
    countyCode,
  })
}

const onSwitchChange: UniHelper.SwitchOnChange = ({ detail }) => {
  form.value.isDefault = detail.value ? 1 : 0
}

const getAddressDetail = async () => {
  const { result } = await getMemberAddressById(props.id!)
  Object.assign(form.value, result)
}

const rules = {
  receiver: {
    rules: [{ required: true, errorMessage: '请输入收货人姓名' }],
  },
  contact: {
    rules: [
      { required: true, errorMessage: '请输入联系方式' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' },
    ],
  },
  countyCode: {
    rules: [{ required: true, errorMessage: '请选择所在地区' }],
  },
  address: {
    rules: [{ required: true, errorMessage: '请选择详细地址' }],
  },
}

const formRef = ref()

const onSubmit = async () => {
  try {
    await formRef.value?.validate?.()
    props.id ? putMemberAddressByIdAPI(props.id!, form.value) : postMemberAddressAPI(form.value)
    uni.navigateBack()
    uni.showToast({
      icon: 'success',
      title: `${props.id ? '修改' : '保存'}成功！`,
    })
  } catch (error) {
    uni.showToast({ icon: 'error', title: '请填写完整信息', mask: true })
  }
}

onShow(() => {
  if (props.id) getAddressDetail()
})
</script>

<template>
  <view class="content">
    <uni-forms ref="formRef" :model="form" :rules="rules">
      <uni-forms-item name="receiver" class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item name="contact" class="form-item">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item name="fullLocation" class="form-item">
        <text class="label">所在地区</text>
        <picker class="picker" mode="region" @change="onRegionChange" :value="form.fullLocation.split(' ')">
          <view :class="form.fullLocation ? '' : 'placeholder'">
            {{ form.fullLocation || '请选择省/市/区(县)' }}
          </view>
        </picker>
      </uni-forms-item>
      <uni-forms-item name="address" class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" value="" v-model="form.address" />
      </uni-forms-item>
      <uni-forms-item name="isDefault" class="form-item">
        <label class="label">设为默认地址</label>
        <switch class="switch" color="#27ba9b" :checked="form.isDefault === 1" @change="onSwitchChange" />
      </uni-forms-item>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="onSubmit">保存并使用</button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
