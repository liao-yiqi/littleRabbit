import type { ProfileDetail, ProfileParams } from '@/types/member'
import { request } from '@/utils/request'

export const getMemberProfileAPI = () => {
  return request<ProfileDetail>({
    url: '/member/profile',
    method: 'GET',
  })
}

export const putMemberProfileAPI = (data: ProfileParams) => {
  return request<ProfileDetail>({
    url: '/member/profile',
    method: 'PUT',
    data,
  })
}
