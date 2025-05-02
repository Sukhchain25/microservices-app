
# Microservices Task and Notification Service

This project implements a **Task Management** system using microservices architecture with **RabbitMQ** for communication, **MongoDB** for data storage, and **Gmail SMTP** for email notifications. 

### Features:
1. **Task Service**: 
   - Create, Update, Delete tasks.
   - Interacts with RabbitMQ to notify the Notification Service on task changes.

2. **Notification Service**:
   - Listens to task updates or creations from RabbitMQ.
   - Sends email notifications (via Gmail SMTP) when a task is created or updated.

### Architecture Overview:
- **Task Service**: Manages tasks and publishes task events to RabbitMQ.
- **Notification Service**: Listens for task events from RabbitMQ and sends notifications (logs or emails).
- **MongoDB**: Used by Task Service for storing task data.
- **RabbitMQ**: Acts as a message broker between Task and Notification services.
  
---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Running the Project](#running-the-project)
4. [API Endpoints](#api-endpoints)
5. [Docker Setup](#docker-setup)
6. [Environment Variables](#environment-variables)
7. [Logging](#logging)

---

## Prerequisites

Ensure the following are installed:
1. **Docker** & **Docker Compose**: For containerization of services.
2. **Node.js**: Version `16.x` or higher for development.
3. **Gmail Account**: Required for sending email notifications via Gmail SMTP.

---

## Setup Instructions

1. Install dependencies for both services:

    - **Task Service**: 
        ```bash
        cd task-service
        npm install
        ```
    - **Notification Service**: 
        ```bash
        cd notification-service
        npm install
        ```

2. Set up environment variables for both services (example provided below).

---

## Running the Project

### Without Docker

Run both services separately:

1. **Task Service**:

    ```bash
    cd task-service
    npm start
    ```

2. **Notification Service**:

    ```bash
    cd notification-service
    npm start
    ```

The services will be accessible as follows:
- **Task Service**: `http://localhost:3000`
- **Notification Service**: Running in the background as it listens to RabbitMQ queue.

---

## API Endpoints

### Task Service

1. **Create Task**  
   `POST /api/tasks`  
   Request Body:  
   ```json
   {
     "title": "Task Title",
     "description": "Task Description"
   }
   ```

2. **Update Task Status**  
   `PUT /api/tasks/:id`  
   Request Body:  
   ```json
   {
     "status": "completed"
   }
   ```

3. **Delete Task**  
   `DELETE /api/tasks/:id`

---

## Docker Setup

To run both services in Docker containers, follow the steps below.

1. Build and start the containers using `docker-compose`:

    ```bash
    docker-compose up --build
    ```

2. The services will be available as follows:
    - **Task Service**: `http://localhost:3000`
    - **Notification Service**: Running in the background.

---

## Environment Variables

### Task Service (`task-service/.env`)

```env
PORT=3000
MONGODB_URI=mongodb://mongo:27017/task-service
RABBITMQ_URL=amqp://rabbitmq
TASK_QUEUE=task-queue
```

### Notification Service (`notification-service/.env`)

```env
RABBITMQ_URL=amqp://rabbitmq
TASK_QUEUE=task-queue
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=<your-email@gmail.com>
SMTP_PASS=<your-app-password>
EMAIL_FROM=<your-email@gmail.com>
EMAIL_TO=<receiver-email@gmail.com>
```

### Docker Compose Variables

In the `docker-compose.yml`, ensure that the environment variables are correctly linked with the `.env` file using `env_file`.

---

## Logging

All logs are handled by **Winston**. Logs are written to both the console and a file (`app.log`).

1. The logs can be viewed in the Docker container logs:

    ```bash
    docker logs <container-name>
    ```

2. If you have mapped the log volume, you can also access the logs at:

    ```bash
    ./logs/app.log
    ```

---

