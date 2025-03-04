<!--
此文件为开发者工具生成，生成时间: 2025/3/3上午10:40:27
使用方法：
在 D:\uni-app\littleRabbit\dist\dev\mp-weixin\pages\index\index.wxml 引入模板

```
<import src="index.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 D:\uni-app\littleRabbit\dist\dev\mp-weixin\pages\index\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view class="sk-container">
    <view class="viewport viewport">
      <scroll-view :refresher-enabled="true" :scroll-y="true" class="scroll-view scroll-view">
        <view is="components/XtxSwiper">
          <view class="carousel XtxSwiper--carousel data-v-17cc3903 XtxSwiper--data-v-17cc3903">
            <swiper
              :autoplay="false"
              :circular="true"
              class="data-v-17cc3903 XtxSwiper--data-v-17cc3903"
              :interval="3000"
              :current="0"
            ></swiper>
            <view class="indicator XtxSwiper--indicator data-v-17cc3903 XtxSwiper--data-v-17cc3903">
              <text class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903"></text>
              <text
                class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903 active XtxSwiper--active"
              ></text>
              <text class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903"></text>
              <text class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903"></text>
              <text class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903"></text>
            </view>
          </view>
        </view>
        <view is="pages/index/components/CategoryPanel">
          <view class="category CategoryPanel--category data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-251 sk-text"
                >居家</text
              >
            </navigator>
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-509 sk-text"
                >锦鲤</text
              >
            </navigator>
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-585 sk-text"
                >服饰</text
              >
            </navigator>
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-373 sk-text"
                >母婴</text
              >
            </navigator>
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-165 sk-text"
                >个护</text
              >
            </navigator>
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-987 sk-text"
                >严选</text
              >
            </navigator>
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-614 sk-text"
                >数码</text
              >
            </navigator>
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-751 sk-text"
                >运动</text
              >
            </navigator>
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-903 sk-text"
                >杂项</text
              >
            </navigator>
            <navigator
              class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81"
              hover-class="none"
            >
              <image
                class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
              ></image>
              <text
                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-343 sk-text"
                >品牌</text
              >
            </navigator>
          </view>
        </view>
        <view is="pages/index/components/HotPanel">
          <view class="panel HotPanel--panel hot HotPanel--hot data-v-df6c854a HotPanel--data-v-df6c854a">
            <view class="item HotPanel--item data-v-df6c854a HotPanel--data-v-df6c854a">
              <view class="title HotPanel--title data-v-df6c854a HotPanel--data-v-df6c854a">
                <text
                  class="title-text HotPanel--title-text data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-735 sk-text"
                  >特惠推荐</text
                >
                <text
                  class="title-desc HotPanel--title-desc data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-895 sk-text"
                  >精选全攻略</text
                >
              </view>
              <navigator
                class="cards HotPanel--cards data-v-df6c854a HotPanel--data-v-df6c854a"
                hover-class="none"
              >
                <image
                  class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image"
                  mode="aspectFit"
                ></image>
                <image
                  class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image"
                  mode="aspectFit"
                ></image>
              </navigator>
            </view>
            <view class="item HotPanel--item data-v-df6c854a HotPanel--data-v-df6c854a">
              <view class="title HotPanel--title data-v-df6c854a HotPanel--data-v-df6c854a">
                <text
                  class="title-text HotPanel--title-text data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-214 sk-text"
                  >爆款推荐</text
                >
                <text
                  class="title-desc HotPanel--title-desc data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-7 sk-text"
                  >最受欢迎</text
                >
              </view>
              <navigator
                class="cards HotPanel--cards data-v-df6c854a HotPanel--data-v-df6c854a"
                hover-class="none"
              >
                <image
                  class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image"
                  mode="aspectFit"
                ></image>
                <image
                  class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image"
                  mode="aspectFit"
                ></image>
              </navigator>
            </view>
            <view class="item HotPanel--item data-v-df6c854a HotPanel--data-v-df6c854a">
              <view class="title HotPanel--title data-v-df6c854a HotPanel--data-v-df6c854a">
                <text
                  class="title-text HotPanel--title-text data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-787 sk-text"
                  >一站买全</text
                >
                <text
                  class="title-desc HotPanel--title-desc data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-101 sk-text"
                  >精心优选</text
                >
              </view>
              <navigator
                class="cards HotPanel--cards data-v-df6c854a HotPanel--data-v-df6c854a"
                hover-class="none"
              >
                <image
                  class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image"
                  mode="aspectFit"
                ></image>
                <image
                  class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image"
                  mode="aspectFit"
                ></image>
              </navigator>
            </view>
            <view class="item HotPanel--item data-v-df6c854a HotPanel--data-v-df6c854a">
              <view class="title HotPanel--title data-v-df6c854a HotPanel--data-v-df6c854a">
                <text
                  class="title-text HotPanel--title-text data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-264 sk-text"
                  >新鲜好物</text
                >
                <text
                  class="title-desc HotPanel--title-desc data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-623 sk-text"
                  >生活加分项</text
                >
              </view>
              <navigator
                class="cards HotPanel--cards data-v-df6c854a HotPanel--data-v-df6c854a"
                hover-class="none"
              >
                <image
                  class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image"
                  mode="aspectFit"
                ></image>
                <image
                  class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image"
                  mode="aspectFit"
                ></image>
              </navigator>
            </view>
          </view>
        </view>
        <view is="components/XtxGuess" class="r r">
          <view class="caption XtxGuess--caption data-v-e94a02da XtxGuess--data-v-e94a02da">
            <text
              class="text XtxGuess--text data-v-e94a02da XtxGuess--data-v-e94a02da sk-transparent sk-text-0-0000-297 sk-text sk-pseudo sk-pseudo-circle"
              >猜你喜欢</text
            >
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<style>
.sk-transparent {
  color: transparent !important;
}
.sk-text-6-2500-597 {
  background-image: linear-gradient(transparent 6.25%, #eeeeee 0%, #eeeeee 93.75%, transparent 0%) !important;
  background-size: 100% 27.907rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-349 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-14-2857-251 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-509 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-585 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-373 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-165 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-987 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-614 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-751 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-903 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-343 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-735 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-895 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-214 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-7 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-787 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-101 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-264 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-623 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-0-0000-297 {
  background-image: linear-gradient(transparent 0%, #eeeeee 0%, #eeeeee 100%, transparent 0%) !important;
  background-size: 100% 31.3953rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
