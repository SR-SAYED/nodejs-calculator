# Use Node.js 18 official image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json & package-lock.json from backend
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the backend source code
COPY backend/ ./

# Expose port 8000 (adjust if your app uses a different port)
EXPOSE 8000

# Run the app
CMD ["node", "main.js"]