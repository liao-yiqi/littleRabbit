import type { CategoryTopItem } from '@/types/category'
import { request } from '@/utils/request'

export const getCategoryTopAPI = () => {
  return request<CategoryTopItem[]>({
    url: '/category/top',
    method: 'GET',
  })
}
