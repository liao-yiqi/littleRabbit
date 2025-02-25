import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { request } from '@/utils/request'

// 获取轮播图
export const getHomeBannerAPI = (distributionSite = 1) => {
  return request<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}

// 获取类别
export const getHomeCategoryAPI = () => {
  return request<CategoryItem[]>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}

// 获取热门推荐
export const getHomeHotAPI = () => {
  return request<HotItem[]>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}
