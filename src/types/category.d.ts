import type { GoodsItem } from './global'

export type CategoryTopItem = {
  // 一级分类id
  id: string
  // 分类
  name: string
  // 一级分类图片
  picture: string
  // 一级分类图片集
  imageBanners: string[]
  // 二级分类集合
  children: CategoryChildItem[]
}

export type CategoryChildItem = {
  id: string
  // 二级分类名称
  name: string
  // 二级分类图片
  picture: string
  // 商品集合
  goods: GoodsItem[]
}
