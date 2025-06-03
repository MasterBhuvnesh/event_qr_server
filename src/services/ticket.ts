import { config } from "../config";
import { supabase } from "./supabase";

export async function uploadTicketToSupabase(
  ticket: Buffer,
  userId: string,
  qrId: string
): Promise<{
  status: "success" | "error";
  message: string;
  publicUrl: string | null;
}> {
  const ticketFileName = `${userId}/${qrId}.png`;

  if (!config.supabaseStorageBucketTicket) {
    return {
      status: "error",
      message: "supabaseStorageBucket is not defined in config",
      publicUrl: null,
    };
  }

  const { error: ticketError } = await supabase.storage
    .from(config.supabaseStorageBucketTicket)
    .upload(ticketFileName, ticket, {
      contentType: "image/png",
      upsert: true,
    });

  if (ticketError) {
    return {
      status: "error",
      message: `Ticket upload failed: ${ticketError.message}`,
      publicUrl: null,
    };
  }

  const { data: ticketPublic } = supabase.storage
    .from(config.supabaseStorageBucketTicket)
    .getPublicUrl(ticketFileName);

  return {
    status: "success",
    message: "Ticket uploaded successfully",
    publicUrl: ticketPublic.publicUrl,
  };
}
