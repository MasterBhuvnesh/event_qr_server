import dotenv from "dotenv";

dotenv.config();

export const config = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  supabaseStorageBucketQR: process.env.SUPABASE_STORAGE_BUCKET_QR,
  supabaseStorageBucketTicket: process.env.SUPABASE_STORAGE_BUCKET_TICKET,
  apiUrl: process.env.API_URL,
  port: process.env.PORT || 3000,
};

if (
  !config.supabaseUrl ||
  !config.supabaseAnonKey ||
  !config.supabaseStorageBucketQR ||
  !config.supabaseStorageBucketTicket ||
  !config.apiUrl
) {
  throw new Error("Missing Supabase environment variables");
}
