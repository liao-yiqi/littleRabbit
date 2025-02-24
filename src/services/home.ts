import type { BannerItem } from '@/types/home'
import { request } from '@/utils/request'

export const getHomeBannerAPI = (distributionSite = 1) => {
  return request<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}
