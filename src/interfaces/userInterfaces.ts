import { boolean } from "zod"

export interface IUser {
  nickname: string
  email: string
  name: string
  notes?: object[]
  password: string
}

export interface IUserAuthenticate {
  nickname: string
  password: string
}

export interface IUserFound extends IUserAuthenticate {
  name: string | null
}

export interface IUserCreated {
  created: boolean
  code?: string
  location?: string
}