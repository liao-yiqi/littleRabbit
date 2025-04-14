import type { OrderCreateParams, OrderPreResult, OrderResult } from '@/types/order'
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

export const getMemberOrderByIdAPI = (id: string) => {
  return request<OrderResult>({
    url: `/member/order/${id}`,
    method: 'GET',
  })
}

export const getMemberOrderRepurchaseByIdAPI = (id: string) => {
  return request<OrderPreResult>({
    url: `/member/order/repurchase/${id}`,
    method: 'GET',
  })
}
