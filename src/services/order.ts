import type { OrderCreateParams, OrderPreResult } from '@/types/order'
import { request } from '@/utils/request'

export const getMemberOrderPreAPI = () => {
  return request<OrderPreResult>({
    url: '/member/order/pre',
    method: 'GET',
  })
}

export const getMemberOrderPreNowAPI = (data: { skuId: string; count: string; addressId?: string }) => {
  return request<OrderPreResult>({
    url: '/member/order/pre/now',
    method: 'GET',
    data,
  })
}

export const postMemberOrderAPI = (data: OrderCreateParams) => {
  return request<{ id: string }>({
    url: '/member/order',
    method: 'POST',
    data,
  })
}
