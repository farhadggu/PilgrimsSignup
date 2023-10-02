# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Copy the remaining app source code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Specify the command to run your React app
CMD ["npm", "start"]z
