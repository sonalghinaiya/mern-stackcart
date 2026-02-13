import SibApiV3Sdk from "@getbrevo/brevo";

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey =
  process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async ({ to, subject, html }) => {
  return apiInstance.sendTransacEmail({
    sender: {
      name: process.env.FROM_NAME,
      email: process.env.FROM_EMAIL,
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};
