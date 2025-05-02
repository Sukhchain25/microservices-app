import amqp from 'amqplib';
import { sendNotificationEmail } from './mail.service.js';
import logger from '../utils/logger.js';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // milliseconds

export async function listenToQueue() {
  let connection;
  let channel;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      connection = await amqp.connect(process.env.RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue(process.env.TASK_QUEUE);

      logger.info(
        `Connected to RabbitMQ and listening to queue: ${process.env.TASK_QUEUE}`
      );

      channel.consume(process.env.TASK_QUEUE, async (msg) => {
        if (msg !== null) {
          const content = JSON.parse(msg.content.toString());
          logger.info('Received from task-queue:', content);

          try {
            await sendNotificationEmail(content);
          } catch (err) {
            console.error('Email sending failed:', err);
          }

          channel.ack(msg);
        }
      });

      break; // Break out of retry loop once successful
    } catch (err) {
      console.error(
        `RabbitMQ connection attempt ${attempt} failed: ${err.message}`
      );
      if (attempt === MAX_RETRIES) {
        console.error('Max retries reached. Exiting.');
        process.exit(1);
      } else {
        logger.info(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
}
