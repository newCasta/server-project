import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'sicastaprojectos@gmail.com',
        pass: 'swydvsssghobcemk',
    },
})
