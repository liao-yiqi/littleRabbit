import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { request } from '@/utils/request'

type HotParams = PageParams & { subType?: string }

export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return request<HotResult>({
    url,
    method: 'GET',
    data,
  })
}
