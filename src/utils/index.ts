/**
 * 防抖函数
 * @param {*} fn 函数体
 * @param {*} duration 时间
 */
export function Debounce(fn: Function, duration: number = 500) {
  let timer: number | null = null
  return function (this: unknown) {
    clearInterval(timer!)
    setTimeout(() => {
      fn.apply(this, arguments)
    }, duration)
  }
}
