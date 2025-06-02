import express, { Request, Response } from "express";
import { generateAndUploadQR } from "../services/qr";
import { GenerateQRRequest, GenerateQRResponse, TicketData } from "../types";
const router = express.Router();

router.post("/qr", async (req: Request, res: Response): Promise<void> => {
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
export default router;
