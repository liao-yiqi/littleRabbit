import { request } from "@/utils/request"

/**
 * 获取微信支付参数
 * @param data orderId 订单id
 */
export const getPayWxPayMiniPayAPI = (data: { orderId: string }) => {
  return request<WechatMiniprogram.RequestPaymentOption>({
    url: '/pay/wxPay/miniPay',
    method: 'GET',
    data,
  })
}

/**
 * 模拟支付-内测版
 * @param data orderId 订单id
 */
export const getPayMockAPI = (data: { orderId: string }) => {
  return request({
    url: '/pay/mock',
    method: 'GET',
    data,
  })
}
