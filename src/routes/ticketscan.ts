import express, { Request, Response } from "express";
import { generateQR } from "../utils/generateQR";
import { htmlToPng } from "../utils/htmlToImage";
import { generateTicketHTML } from "../templates/ticketTemplate";
import { uploadTicketToSupabase } from "../services/ticket";

const router = express.Router();

router.post("/ticket", async (req: Request, res: Response): Promise<void> => {
  try {
    const { data } = req.body;

    const qrData = {
      qrId: data.registration.id,
      qrCode: data.registration.code,
    };

    const qrImage = await generateQR(qrData);
    const html = generateTicketHTML(data, qrImage);
    const imageBuffer = await htmlToPng(html);
    const result = await uploadTicketToSupabase(
      imageBuffer as Buffer,
      data.user.id,
      data.registration.id
    );
    if (result.status === "error") {
      res.status(500).json(result);
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate ticket");
  }
});

export default router;
