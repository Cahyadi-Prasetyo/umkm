# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Use .env.docker for build (assuming build context includes root, or copy explicitly)
# Note: Docker context is ./Client, so we can't access root files easily without changing context.
# WORKAROUND: We will assume the user manually copies or we update docker-compose context.
# ACTUALLY BETTER: We will clean up the Dockerfile and handle env via ARGs or just copy if context allows.
# Given build context is ./Client, we CANNOT copy ../.env.docker.
# We must rely on the file being present OR pass args.
# Reverting to copying .env if it exists, but since we are automating, 
# I will use a different approach: modifying docker-compose to pass args? No, CRA/Vite needs .env file.
# I will copy .env.docker to Client/.env.docker TEMPORARILY.
COPY .env.docker .env
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
