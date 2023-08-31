FROM node:18.16.0 AS build

# Set the working directory
WORKDIR /app

# Update package list and install MySQL client
RUN apt-get update && apt-get install default-mysql-client -y

# Install TypeScript globally
RUN npm install -g typescript

# Copy package manifests and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the wait-for-mysql script and make it executable
COPY wait-for-mysql.sh /app/wait-for-mysql.sh
RUN chmod +x /app/wait-for-mysql.sh

# Copy source files and tsconfig, then compile
COPY ./src ./src
COPY tsconfig.json ./
RUN tsc

# Runtime stage
FROM node:18.16.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy over compiled JavaScript and dependencies from build image
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/wait-for-mysql.sh ./wait-for-mysql.sh

# Expose the required port
EXPOSE 5000

# Run the wait-for-mysql script before starting the application
# CMD ["/bin/sh", "./wait-for-mysql.sh", "db:3306", "--", "node", "./dist/index.js"]

# Directly start the application without waiting for MySQL
CMD ["node", "./dist/index.js"]
