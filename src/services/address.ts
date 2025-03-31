import type { AddressItems, AddressParams } from '@/types/address'
import { request } from '@/utils/request'

export const getMemberAddressAPI = () => {
  return request<AddressItems[]>({
    url: '/member/address',
    method: 'GET',
  })
}

export const postMemberAddressAPI = (data: AddressParams) => {
  return request({
    url: '/member/address',
    method: 'POST',
    data,
  })
}
