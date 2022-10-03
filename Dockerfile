# Deploy Node API Backend to docker
# Version of node to use
FROM node:14.20-alpine3.15

# Create app working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy application source
COPY . .

# Set the port to connect to
EXPOSE 3000

# Start the server
CMD [ "node", "index.js" ]
