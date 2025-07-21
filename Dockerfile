FROM node:18                          # Use Node.js 18 official image

WORKDIR /app                         # Set working directory inside container

COPY package*.json ./               # Copy package.json & lock file

RUN npm install                     # Install dependencies

COPY . .                           # Copy rest of project files

EXPOSE 8000                        # Expose port 8000 to outside

CMD ["npm", "start"]                # Run the app
