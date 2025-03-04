<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image mode="widthFix" class="image" :src="currentBannerPicture" />
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        class="text"
        v-for="(item, index) in subTypesList"
        :key="item.id"
        :class="{ active: index === activeIndex }"
        @tap="activeIndex = index"
      >
        {{ item.title }}
      </text>
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      v-for="(item, index) in subTypesList"
      :key="item.id"
      scroll-y
      class="scroll-view"
      v-show="activeIndex === index"
      @scrolltolower="onScrolltolower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture" />
          <view class="name ellipsis">{{ goods.desc }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="decimal">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">
        {{ !item.finish ? '正在加载中...' : '没有更多了' }}
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { getHotRecommendAPI } from '@/services/hot'
import type { SubTypeItem } from '@/types/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
const queryProps = defineProps<{
  type: string
}>()

const currentHot = hotMap.find((item) => item.type === queryProps.type)
uni.setNavigationBarTitle({ title: currentHot!.title })

const currentBannerPicture = ref('')
const subTypesList = ref<(SubTypeItem & { finish?: boolean })[]>([])
const activeIndex = ref(0)

const getHotRecommendData = async () => {
  const {
    result: { bannerPicture, subTypes },
  } = await getHotRecommendAPI(currentHot!.url)
  currentBannerPicture.value = bannerPicture
  subTypesList.value = subTypes
}

const onScrolltolower = async () => {
  const currSubType = subTypesList.value[activeIndex.value]
  if (currSubType.goodsItems.page < currSubType.goodsItems.pageSize) {
    currSubType.goodsItems.page++
  } else {
    currSubType.finish = true
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const {
    result: { subTypes },
  } = await getHotRecommendAPI(currentHot!.url, {
    subType: currSubType.id,
    page: currSubType.goodsItems.page,
    pageSize: currSubType.goodsItems.pageSize,
  })
  const { goodsItems: newGoodsItems } = subTypes[activeIndex.value]
  currSubType.goodsItems.items.push(...newGoodsItems.items)
}

onLoad(() => {
  getHotRecommendData()
})
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  .image {
    width: 750rpx;
  }
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.scroll-view {
  height: calc(100vh - 180rpx - 100rpx);
  overflow: hidden;
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 342rpx;
    padding: 20rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
    .thumb {
      width: 305rpx;
      height: 305rpx;
    }
    .name {
      font-size: 26rpx;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-word;
      white-space: normal;
    }
    .price {
      line-height: 1;
      color: #cf4444;
      font-size: 30rpx;
      .symbol {
        font-size: 70%;
      }
      .decimal {
        font-size: 70%;
      }
    }
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
