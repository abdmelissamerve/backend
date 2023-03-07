# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /src
WORKDIR /src/

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to the container
COPY . .


# Expose port 3000 for the Express server
EXPOSE 3050

# Start the Express server
CMD [ "npx", "nodemon", "/Users/melissamerve/Documents/disertatie/backend/src/index.ts"]
