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

# Set the default environment variables
# Which environment are we running
ENVIRONMENT=test

# Database properties
DB_NAME=cookbooks
DB_USER=cookbooks
DB_PASS=FluffyBun135!-65Q
DB_HOST=localhost

## EXPRESS ##
EXPRESS_PORT=3000

## AUTHENTICATION ##
JWT_TOKEN_SECRET=token-secret
JWT_REFRESH_TOKEN_SECRET=refresh-token-secret
SALT_ROUNDS=10

# Start the server
CMD [ "node", "index.js" ]
