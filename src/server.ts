import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "./config";
import { HealthCheckJob } from "./utils/cron";

import ticketRoute from "./routes/ticket";
import qrScanRoute from "./routes/qrscan";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Crons job
const job = new HealthCheckJob({
  schedule: "*/14 * * * *",
  apiUrl: config.apiUrl,
});
job.start();

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

//  QR Scan endpoint
app.use("/", qrScanRoute);

// Ticket endpoint
app.use("/", ticketRoute);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
