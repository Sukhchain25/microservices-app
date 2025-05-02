import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // use SSL if port is 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendNotificationEmail(content) {
  try {
    const subject =
      content.type === 'TASK_CREATED' ? 'New Task Created' : 'Task Updated';
    const html = `
      <h3>${subject}</h3>
      <p><strong>Title:</strong> ${content.payload.title}</p>
      <p><strong>Description:</strong> ${content.payload.description}</p>
      <p><strong>Status:</strong> ${content.payload.status}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject,
      html,
    });

    logger.info(`Email sent successfully for ${content.type}`);
  } catch (err) {
    logger.error('Failed to send email:', err);
    // Optional: rethrow or handle depending on use case
  }
}
