FROM node:18.16.0 AS build

# Set the working directory
WORKDIR /usr/src/app

# Install TypeScript globally
RUN npm install -g typescript
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY tsconfig.json ./

# Compile TypeScript to JavaScript
RUN tsc

# Copy the wait-for-mysql script
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

FROM node:18.16.0 AS runtime

# Set the working directory
WORKDIR /usr/src/app

# Copy over compiled JavaScript and dependencies from build image
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/wait-for-mysql.sh ./wait-for-mysql.sh

EXPOSE 5000

# Run the wait-for-mysql script before starting the application
CMD ["/bin/sh", "./wait-for-mysql.sh", "db:3306", "--", "node", "./dist/index.js"]
