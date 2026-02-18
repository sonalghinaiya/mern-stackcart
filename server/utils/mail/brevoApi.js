import Brevo from "@getbrevo/brevo";

const api = new Brevo.TransactionalEmailsApi();

api.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendEmail = async ({ to, subject, html }) => {
  await api.sendTransacEmail({
    sender: {
      email: process.env.FROM_EMAIL,
      name: process.env.FROM_NAME,
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};
