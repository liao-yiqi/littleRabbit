<script lang="ts" setup>
import { getMemberProfileAPI, putMemberProfileAPI } from '@/services/profile'
import { useMemberStore } from '@/stores'
import type { Gender, ProfileDetail } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
const { safeAreaInsets } = uni.getSystemInfoSync()

const memberStore = useMemberStore()

const profile = ref({} as ProfileDetail)
const getMemberProfileData = async () => {
  const { result } = await getMemberProfileAPI()
  profile.value = result
  memberStore.profile!.avatar = result.avatar
  memberStore.profile!.nickname = result.nickname
}

onLoad(() => {
  getMemberProfileData()
})

const onAvatarChange = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (success) => {
      const { tempFilePath } = success.tempFiles[0]
      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file',
        filePath: tempFilePath,
        success: (res) => {
          if (res.statusCode === 200) {
            const { avatar } = JSON.parse(res.data)
            profile.value!.avatar = avatar
            memberStore.profile!.avatar = avatar
            uni.showToast({
              title: '更新成功',
              icon: 'success',
              mask: true,
            })
          } else {
            uni.showToast({
              title: '出现未知错误',
              icon: 'error',
              mask: true,
            })
          }
        },
      })
    },
  })
}

const onGenderChange: UniHelper.RadioGroupOnChange = ({ detail }) => {
  profile.value.gender = detail.value as Gender
}

const onDateChange: UniHelper.DatePickerOnChange = ({ detail }) => {
  profile.value.birthday = detail.value
}

let fullLocationCode: [string, string, string] = ['', '', '']
const onFullLacation: UniHelper.RegionPickerOnChange = ({ detail }) => {
  profile.value.fullLocation = detail.value.join(' ')
  fullLocationCode = detail.code!
}

const onSubmit = async () => {
  const { nickname, gender, birthday, profession } = profile.value
  const [provinceCode = undefined, cityCode = undefined, countyCode = undefined] = fullLocationCode
  const params = reactive({
    nickname,
    gender,
    birthday,
    profession,
    provinceCode,
    cityCode,
    countyCode,
  })
  const { result } = await putMemberProfileAPI(params)
  memberStore.profile!.nickname = result.nickname
  uni.navigateBack()
  uni.showToast({
    title: '保存成功',
    icon: 'success',
    mask: true,
  })
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @tap="onAvatarChange">
        <image class="image" :src="profile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="profile.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label
              v-for="item in [
                { value: '男', id: '1' },
                { value: '女', id: '0' },
              ]"
              :key="item.id"
              class="radio"
            >
              <radio :value="item.value" color="#27ba9b" :checked="profile?.gender === item.value" />
              {{ item.value }}
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profile?.birthday"
            @change="onDateChange"
          >
            <view :class="profile?.birthday ? '' : 'placeholder'">
              {{ profile?.birthday || '请选择日期' }}
            </view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            :value="profile?.fullLocation?.split(' ')"
            @change="onFullLacation"
          >
            <view :class="profile?.fullLocation ? '' : 'placeholder'">
              {{ profile?.fullLocation || '请选择城市' }}
            </view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profile.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onSubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
