FROM node:alpine3.10 as build
RUN apk add g++ make python
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
# .ENV al compilar

#ARG DOCKER BUILD
ARG VITE_APP_BASE_URL
ENV VITE_APP_BASE_URL $VITE_APP_BASE_URL

# Compilacion app
RUN npm run build
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
