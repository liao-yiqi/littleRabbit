import type { CartItem } from '@/types/cart'
import { request } from '@/utils/request'

export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data,
  })
}

export const getMemberCartAPI = () => {
  return request<CartItem[]>({
    url: '/member/cart',
    method: 'GET',
  })
}

export const deleteMemberCartAPI = (data: { ids: string[] }) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data,
  })
}
