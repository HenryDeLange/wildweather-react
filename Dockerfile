# Build the application
FROM node:22.21 AS builder
RUN apt-get update && apt-get install -y git
WORKDIR /app
ADD ./ /app/
RUN npm install && npm run git:info && npx vite build --mode docker

# Run the application
FROM nginx:1.29.2-alpine AS production
RUN printf "server {\n\
  listen 80;\n\
  server_name localhost;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files \$uri \$uri/ /index.html;\n\
  }\n\
}" > /etc/nginx/conf.d/default.conf
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]