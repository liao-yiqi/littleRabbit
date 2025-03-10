import type { GoodsResult } from '@/types/goods'
import { request } from '@/utils/request'

export const getGoodsByIdAPI = (id: string) => {
  return request<GoodsResult>({
    url: '/goods',
    method: 'GET',
    data: { id },
  })
}
