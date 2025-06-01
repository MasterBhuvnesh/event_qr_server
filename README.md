# Event Server

**Event Server** is a TypeScript-based backend service designed for event management. It provides APIs and utilities to manage, schedule, and generate QR codes for events. This project is built with modern Node.js tooling and leverages Supabase for backend services.

> **Important:** This server is specifically tailored for event management solutions.

## Features

- Event management APIs
- QR code generation for event tickets
- Scheduled tasks with cron jobs
- Environment configuration with dotenv
- CORS support for secure cross-origin requests
- Built with TypeScript for type safety and maintainability

## Modules Used

### Dependencies

- [`@supabase/supabase-js`](https://github.com/supabase/supabase-js): Supabase client for database and authentication
- [`cors`](https://github.com/expressjs/cors): Enable Cross-Origin Resource Sharing
- [`cron`](https://github.com/kelektiv/node-cron): Task scheduling
- [`dotenv`](https://github.com/motdotla/dotenv): Environment variable management
- [`express`](https://github.com/expressjs/express): Web framework for Node.js
- [`nodemon`](https://github.com/remy/nodemon): Development server auto-reloader
- [`qrcode`](https://github.com/soldair/node-qrcode): QR code generation

### Dev Dependencies

- [`@types/cors`](https://www.npmjs.com/package/@types/cors): TypeScript types for cors
- [`@types/express`](https://www.npmjs.com/package/@types/express): TypeScript types for express
- [`@types/node`](https://www.npmjs.com/package/@types/node): TypeScript types for Node.js
- [`@types/qrcode`](https://www.npmjs.com/package/@types/qrcode): TypeScript types for qrcode
- [`ts-node-dev`](https://github.com/wclr/ts-node-dev): TypeScript execution and hot-reloading
- [`typescript`](https://www.typescriptlang.org/): TypeScript language support

## Scripts

- `build`: Compile TypeScript to JavaScript
- `start`: Run the compiled server
- `dev`: Start the server in development mode with hot-reloading

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables in `.env`
4. Build the project: `npm run build`
5. Start the server: `npm start`

## Author

Made by **Bhuvnesh Verma**.

## License

ISC
