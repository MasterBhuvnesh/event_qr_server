FROM ghcr.io/puppeteer/puppeteer:24.10.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /app

# Install dependencies separately from build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
