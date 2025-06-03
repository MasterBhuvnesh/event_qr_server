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

export interface TicketData {
  event: {
    title: string;
    description: string;
    banner_image_url: string;
    category: string;
    date_time: {
      start: string | Date;
      end: string | Date;
    };
    pricing: {
      amount: string | number;
    };
    location: string;
    organizer: {
      full_name: string;
    };
  };
  registration: {
    code: string;
  };
  user: {
    full_name: string;
    email: string;
  };
}
