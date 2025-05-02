import dotenv from 'dotenv';
dotenv.config();

import { listenToQueue } from './services/rabbitmq.service.js';

listenToQueue();
