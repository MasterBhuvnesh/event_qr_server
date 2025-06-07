FROM ghcr.io/puppeteer/puppeteer:24.10.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable


WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
