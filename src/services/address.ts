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

export const getMemberAddressById = (id: string) => {
  return request<AddressItems>({
    url: `/member/address/${id}`,
    method: 'GET',
  })
}

export const putMemberAddressByIdAPI = (id: string, data: AddressParams) => {
  return request({
    url: `/member/address/${id}`,
    method: 'PUT',
    data,
  })
}

export const deleteMemberAddressByIdAPI = (id: string) => {
  return request({
    url: `/member/address/${id}`,
    method: 'DELETE',
  })
}
