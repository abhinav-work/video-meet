# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# # Removing node modules if present
RUN rm -rf node_modules

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install PM2 globally first
RUN npm i -g pm2

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# # Define environment variable
ENV NODE_ENV=production

# Start the application with PM2 runtime (not regular pm2)
CMD ["pm2-runtime", "start", "pm2.config.js"]