export interface GenerateQRRequest {
  qrId: string;
  qrCode: string;
  userId: string;
}

export interface GenerateQRResponse {
  status: "success" | "error";
  message?: string;
  path?: string;
  publicUrl?: string;
  error?: string;
  details?: string;
}

export interface CronJobConfig {
  schedule: string;
  apiUrl: string | undefined;
}
