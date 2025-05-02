# Use official Node.js image as base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code (including utils/, routes/, etc.)
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run the app with ES module support
CMD ["node", "server.js"]
