import { createClient } from "@supabase/supabase-js";
import { config } from "../config";

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined in the config.");
}
export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey
);
