# Use Node.js 18 official image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application files
COPY . .

# Expose port 8000
EXPOSE 8000

# Run the app
CMD ["npm", "start"]

