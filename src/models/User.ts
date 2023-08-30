import { prisma } from '../../prisma/connection'
import bcrypt from 'bcrypt'

export interface IUser {
  nickname: string
  email?: string | null
  name?: string | null
  notes?: object[] | null
  password?: string | null
}

interface IUserCreateData {
  nickname: string
  email: string
  password: string
  name: string | null
}

interface IUserAuthenticateData {
  nickname: string
  password: string
  name?: string | null
}

async function create(User: IUserCreateData): Promise<IUser> {
  User.password = await bcrypt.hash(
    User.password,
    process.env.SALT_ROUNDS || 10
  )

  const user = await prisma.user.create({
    data: {
      nickname: User.nickname,
      email: User.email,
      name: User.name,
      password: User.password
    }
  })

  return user
}

async function readByNickname(
  nickname: string
): Promise<IUserAuthenticateData | null> {
  const user = await prisma.user.findUnique({
    where: {
      nickname
    },
    select: {
      nickname: true,
      name: true,
      password: true
    }
  })

  return user
}

async function authenticate(
  User: IUserAuthenticateData
): Promise<IUser | undefined> {
  const user = await readByNickname(User.nickname)

  if (!user) {
    throw new Error('User not found!')
  } else {
    const passwordMatch = await bcrypt.compare(User.password, user.password)

    if (passwordMatch) {
      return {
        nickname: user.nickname,
        name: user.name
      }
    }
  }

  throw new Error('Invalid password!')
}

async function isAuthenticated(User: IUser): Promise<IUser | null> {
  const { nickname } = User

  const user = await prisma.user.findUnique({
    where: {
      nickname
    }
  })

  return user
}

export default {
  create,
  authenticate,
  isAuthenticated
}
