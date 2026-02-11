import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    family: 4,
  },
});
