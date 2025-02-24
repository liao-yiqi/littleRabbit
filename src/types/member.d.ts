type BaseProfile = {
  id: number
  avatar: string
  account: string
  nickName?: string
}

export type LoginResult = BaseProfile & {
  mobile: string
  token: string
}
