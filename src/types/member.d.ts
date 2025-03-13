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
