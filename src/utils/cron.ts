import { CronJob } from "cron";
import https, { RequestOptions } from "https";
import { CronJobConfig } from "../types";

export class HealthCheckJob {
  private job: CronJob;
  private apiUrl: string;

  constructor(config: CronJobConfig) {
    if (!config.apiUrl) {
      throw new Error("API_URL environment variable is not defined");
    }
    this.apiUrl = config.apiUrl;

    this.job = new CronJob(
      config.schedule,
      this.executeHealthCheck.bind(this),
      null,
      true,
      "UTC"
    );
  }

  private executeHealthCheck(): void {
    const options: RequestOptions = {
      method: "GET",
      timeout: 5000, // 5 seconds timeout
    };

    const request = https.get(this.apiUrl, options, (res) => {
      if (res.statusCode === 200) {
        console.log(
          `[${new Date().toISOString()}] GET request sent successfully`
        );
      } else {
        console.error(
          `[${new Date().toISOString()}] GET request failed with status: ${
            res.statusCode
          }`
        );
      }
    });

    request.on("error", (error: Error) => {
      console.error(
        `[${new Date().toISOString()}] Error while sending request: ${
          error.message
        }`
      );
    });

    request.on("timeout", () => {
      request.destroy();
      console.error(
        `[${new Date().toISOString()}] Request timed out after 5 seconds`
      );
    });
  }

  public start(): void {
    this.job.start();
    console.log(`Cron job started with schedule: ${this.job.cronTime.source}`);
  }

  public stop(): void {
    this.job.stop();
    console.log("Cron job stopped");
  }
}

// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals
// we want to send 1 GET request for every 14 minutes

// How to define a "Schedule"?
// You define a schedule using a cron expression, which consists of 5 fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Every 14 minutes
//* 0 0 * * 0 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour
