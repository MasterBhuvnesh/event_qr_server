import QRCode from "qrcode";
import { supabase } from "./supabase";
import { config } from "../config";
import { GenerateQRRequest, GenerateQRResponse } from "../types";

export async function generateAndUploadQR(
  params: GenerateQRRequest
): Promise<GenerateQRResponse> {
  try {
    const { qrId, qrCode, userId } = params;

    // Convert JSON to string and generate QR buffer
    const qrData = JSON.stringify({ qrId, qrCode });
    const qrBuffer = await QRCode.toBuffer(qrData, {
      type: "png",
      errorCorrectionLevel: "H",
    });

    const fileName = `${userId}/${qrId}.png`;

    if (!config.supabaseStorageBucket) {
      throw new Error("supabaseStorageBucket is not defined in config");
    }

    const { data, error } = await supabase.storage
      .from(config.supabaseStorageBucket)
      .upload(fileName, qrBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) {
      console.error(error);
      return {
        status: "error",
        error: "Upload failed",
        details: error.message,
      };
    }

    const { data: urlData } = supabase.storage
      .from(config.supabaseStorageBucket)
      .getPublicUrl(fileName);

    return {
      status: "success",
      message: "QR code uploaded successfully",
      path: data?.path,
      publicUrl: urlData.publicUrl,
    };
  } catch (err: any) {
    console.error(err);
    return {
      status: "error",
      error: "Something went wrong",
      details: err.message,
    };
  }
}
