import type { OrderCreateParams, OrderLogisticResult, OrderPreResult, OrderResult } from '@/types/order'
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

/**
 * 模拟发货-内测版
 * @description 在DEV环境下使用，仅在订单状态为待发货时，可模拟发货，调用后订单状态修改为待收货，包含模拟物流。
 * @param id 订单id
 */
export const getMemberOrderConsignmentByIdAPI = (id: string) => {
  return request({
    url: `/member/order/consignment/${id}`,
    method: 'GET',
  })
}

/**
 * 获取订单物流
 * @description 仅在订单状态为待收货，待评价，已完成时，可获取物流信息。
 * @param id 订单id
 */
export const getMemberOrderLogisticsByIdAPI = (id: string) => {
  return request<OrderLogisticResult>({
    method: 'GET',
    url: `/member/order/${id}/logistics`,
  })
}

/**
 * 确认收货
 * @description 仅在订单状态为待收货时，可确认收货。
 * @param id 订单id
 */
export const putMemberOrderReceiptByIdAPI = (id: string) => {
  return request<OrderResult>({
    url: `/member/order/${id}/receipt`,
    method: 'PUT',
  })
}

/**
 * 删除订单
 * @description 仅在订单状态为待评价，已完成，已取消时，可删除订单。
 * @param data ids 订单集合
 */
export const deleteMemberOrderAPI = (data: { ids: string[] }) => {
  return request({
    url: `/member/order`,
    method: 'DELETE',
    data,
  })
}
