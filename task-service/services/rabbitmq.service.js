import amqp from 'amqplib';
import logger from '../../notification-service/utils/logger';

let channel;

export async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(process.env.TASK_QUEUE, { durable: true });
    logger.info('✅ Connected to RabbitMQ');
  } catch (err) {
    logger.error('❌ RabbitMQ connection error:', err);
    setTimeout(() => process.exit(1), 3000);
  }
}

export function publishToQueue(type, payload) {
  if (!channel) throw new Error('RabbitMQ channel is not ready');

  const message = {
    type,
    payload,
    timestamp: new Date(),
  };

  channel.sendToQueue(
    process.env.TASK_QUEUE,
    Buffer.from(JSON.stringify(message)),
    { persistent: true }
  );
}

export function getChannel() {
  return channel;
}
