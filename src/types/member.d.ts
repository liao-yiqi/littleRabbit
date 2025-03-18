type BaseProfile = {
  id: number
  avatar: string
  account: string
  nickname?: string
}

export type LoginResult = BaseProfile & {
  mobile: string
  token: string
}

/** 个人信息 用户详情信息 */
export type ProfileDetail = BaseProfile & {
  /** 性别 */
  gender?: Gender
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}

export type Gender = '男' | '女'

export type ProfileParams = Pick<ProfileDetail, 'nickname' | 'gender' | 'profession' | 'birthday'> & {
  /** 省份编码 */
  provinceCode?: string
  /** 城市编码 */
  cityCode?: string
  /** 区/县编码 */
  countyCode?: string
}
