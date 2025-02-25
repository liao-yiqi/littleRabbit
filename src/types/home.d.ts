// 轮播图类型
export type BannerItem = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: string
}

// 首页类别类型
export type CategoryItem = {
  icon: string
  id: string
  name: string
}

// 热门推荐类别
export type HotItem = {
  alt: string
  id: string
  picture: string
  target: string
  title: string
  type: string
}
