# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed for production)
RUN npm run build

# Expose port (adjust if your dev server uses a different one)
EXPOSE 8080

# Start the application (in dev mode you might use 'npm run serve')
CMD ["npm", "run", "dev"]
