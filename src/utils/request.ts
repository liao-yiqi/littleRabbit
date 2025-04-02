import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const memberStore = useMemberStore()

const requestInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) options.url = baseURL + options.url
    options.timeout = 10000
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    const token = memberStore.profile?.token
    if (token) options.header.Authorization = token
  },
}
uni.addInterceptor('request', requestInterceptor)
uni.addInterceptor('uploadFile', requestInterceptor)

type Data<T> = {
  code: string
  msg: string
  result: T
}

export const request = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'error',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail: (error) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(error)
      },
    })
  })
}
