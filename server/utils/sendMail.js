import nodemailer from "nodemailer";
// import { transporter } from "./mail/ethereal.js";
// import { transporter } from "./mail/gmail.js";
// import { transporter } from "./mail/brevo.js";
import { sendEmail } from "./mail/brevoApi.js";

export const sendVerificationCode = async (email, otp) => {
  await sendEmail({
    to: email,
    subject: "Your Password Reset OTP",
    html: `
     <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px 0;">
        <div style="max-width:520px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">
          <div style="padding:30px; color:#333;">
                 <div align="center" style="padding-bottom:25px;">
              <h1 style="margin:0;font-size:24px; font-weight: 800;">
                Reset Your Password
              </h1>
            </div>
            <p style="font-size:15px;">Hello,</p>

            <p style="font-size:15px;">
              We received a request to reset your password.  
              Use the OTP below to proceed:
            </p>

            <div style="text-align:center; margin:30px 0;">
               <div style="
                background:#eef2ff;
                color:#2563eb;
                font-size:34px;
                font-weight:bold;
                letter-spacing:8px;
                padding:16px 30px;
                border-radius:8px;
                display:inline-block;">
                ${otp}
              </div>
            </div>

            <p style="font-size:14px;">
              This OTP will expire in <b>10 minutes</b> from the time this email was sent.
            </p>

            <p style="font-size:14px; color:#666;">
              If you didn’t request a password reset, please ignore this email.
            </p>

            <hr style="border:none; border-top:1px solid #eee;">
            
 <p style="font-size:14px;">
             Thank You
            </p>
            <p style="font-size:12px; color:#999;">
              © ${new Date().getFullYear()} ${process.env.FROM_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `,
  });
};

// export const sendVerificationCode = async (email, otp) => {
//   const info = await transporter.sendMail({
//     from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
//     to: email,
//     subject: "Your Password Reset OTP",
//     // text: "This is a test email sent via Ethereal!",
//     html: `
//       <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px 0;">
//         <div style="max-width:520px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">

//           <div style="background:#6d6eaf; color:#ffffff; padding:20px; text-align:center;">
//             <h2 style="margin:0;">Password Reset</h2>
//           </div>

//           <div style="padding:30px; color:#333;">
//             <p style="font-size:15px;">Hi 👋,</p>

//             <p style="font-size:15px;">
//               We received a request to reset your password.
//               Use the OTP below to proceed:
//             </p>

//             <div style="text-align:center; margin:30px 0;">
//               <span style="
//                 display:inline-block;
//                 background:#f1f5ff;
//                 color:#0d6efd;
//                 font-size:28px;
//                 letter-spacing:6px;
//                 padding:14px 24px;
//                 border-radius:6px;
//                 font-weight:bold;
//               ">
//                 ${otp}
//               </span>
//             </div>

//             <p style="font-size:14px;">
//               ⏰ This OTP is valid for <b>10 minutes</b>.
//             </p>

//             <p style="font-size:14px; color:#666;">
//               If you didn’t request a password reset, you can safely ignore this email.
//             </p>

//             <hr style="border:none; border-top:1px solid #eee; margin:25px 0;">

//             <p style="font-size:12px; color:#999; text-align:center;">
//               © ${new Date().getFullYear()} ${process.env.FROM_NAME}. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     `,
//   });
//   // console.log("Preview URL", nodemailer.getTestMessageUrl(info));
// };
