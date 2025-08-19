# Use Node.js 18 official image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/ ./backend/

# Copy frontend files
COPY frontend/ ./frontend/

# Expose port
EXPOSE 8000

# Start backend server
CMD ["node", "backend/main.js"]