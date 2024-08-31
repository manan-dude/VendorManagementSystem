FROM node:18-alpine as builder

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build the app
COPY . .
RUN npm run build

# ENV DB_URI 

WORKDIR /app
CMD ["node", "dist/main.js"]