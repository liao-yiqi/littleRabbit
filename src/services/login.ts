import type { LoginResult } from '@/types/member'
import { request } from '@/utils/request'

type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

export const postLoginWxMinAPI = (data: LoginParams) => {
  return request<LoginResult>({
    url: '/login/wxMin',
    method: 'POST',
    data,
  })
}

export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return request<LoginResult>({
    url: '/login/wxMin/simple',
    method: 'POST',
    data: {
      phoneNumber,
    },
  })
}
