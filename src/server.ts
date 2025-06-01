import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "./config";
import { generateAndUploadQR } from "./services/qr";
import { GenerateQRRequest, GenerateQRResponse } from "./types";
import { HealthCheckJob } from "./utils/cron";

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

// QR Code Generation Endpoint
app.post("/qr", async (req: Request, res: Response): Promise<void> => {
  const { qrId, qrCode, userId } = req.body as GenerateQRRequest;

  if (!qrId || !qrCode || !userId) {
    res.status(400).json({
      status: "error",
      error: "qrId, userId and qrCode are required",
    });
    return;
  }

  const result = await generateAndUploadQR({ qrId, qrCode, userId });

  if (result.status === "error") {
    res.status(500).json(result);
    return;
  }

  res.status(200).json(result);
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
