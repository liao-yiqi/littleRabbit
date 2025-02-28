import type XtxSwiper from '@/components/XtxSwiper.vue'
import type XtxGuess from '@/components/XtxGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}
export type XtxSwiperInstance = InstanceType<typeof XtxSwiper>
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
