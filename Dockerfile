FROM node:20-alpine
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5173

# Allow frontend to be accessed from the host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
