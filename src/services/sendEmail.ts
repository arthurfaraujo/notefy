import nodemailer from 'nodemailer'
import mailConfig from '../config/mail'

export async function createNewUser(to: string) {
  try {
    const config = await mailConfig()

    const transporter = nodemailer.createTransport(config)

    const info = {
      from: 'notefy@email.com',
      to,
      subject: 'Your Notefy account has been created!',
      text: 'Now you can have access to our features in the Notefy web app.',
      html: '<h1>Your Notefy account has been created!</h1><p>Now you can have access to our features in the Notefy web app.</p>'
    }

    const email = await transporter.sendMail(info)

    if (process.env.NODE_ENV === 'development')
      console.log(`Send e-mail: ${nodemailer.getTestMessageUrl(email)}`)
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function tryLogin(to: string) {
  try {
    const config = await mailConfig()

    const transporter = nodemailer.createTransport(config)

    const info = {
      from: 'notefy@email.com',
      to,
      subject: 'Failed login attempt!',
      text: "Someone tried to login to your account, if it wasn't you, change your password immediately.",
      html: "<h1>Failed login attempt</h1><p>Someone tried to login to your account, if it wasn't you, change your password immediately.</p>"
    }

    const email = await transporter.sendMail(info)

    if (process.env.NODE_ENV === 'development')
      console.log(`Send e-mail: ${nodemailer.getTestMessageUrl(email)}`)
  } catch (e: any) {
    throw new Error(e)
  }
}

export default {
  createNewUser
}
