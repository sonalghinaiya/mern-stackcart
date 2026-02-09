import nodemailer from "nodemailer";
// import { transporter } from "./mail/ethereal.js";
import { transporter } from "./mail/gmail.js";

export const sendVerificationCode = async (email, otp) => {
  const info = await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "Password Reset OTP",
    text: "This is a test email sent via Ethereal!",
    html: `
        <div>
            <h2>Password Reset</h2>
            <p>Your OTP is: </p>
            <h1 style="letter-spacing: 3px;">${otp}</h1>
            <p>This OTP is valid for <b>10 minutes</b>.</p>
            <p>If you didn't request this, ignore this email.</p>
        </div>
    `,
  });
  console.log("Preview URL", nodemailer.getTestMessageUrl(info));
};
