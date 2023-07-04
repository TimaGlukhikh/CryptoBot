FROM node:20.0-alpine
WORKDIR /app/frontend

RUN apk add --no-cache \
        sudo \
        curl \
        build-base \
        g++ \
        libpng \
        libpng-dev \
        jpeg-dev \
        pango-dev \
        cairo-dev \
        giflib-dev \
        python3

COPY package.json ./
RUN npm install --prod
RUN npm run compile
COPY . ./
