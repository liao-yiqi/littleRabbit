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

export const putMemberCartBySkuIdAPI = (skuId: string, data: { selected?: boolean; count?: number }) => {
  return request({
    url: `/member/cart/${skuId}`,
    method: 'PUT',
    data,
  })
}

export const putMemberCartSelectedAPI = (data: { selected: boolean }) => {
  return request({
    url: '/member/cart/selected',
    method: 'PUT',
    data,
  })
}
