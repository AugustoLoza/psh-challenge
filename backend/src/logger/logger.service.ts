import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);

  logRequest(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
  ) {
    this.logger.log(
      `HTTP ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms`,
    );
  }

  logError(method: string, url: string, error: any) {
    this.logger.error(
      `HTTP ${method} ${url} - Error: ${error.message || error}`,
    );
  }

  logServerStartup(port: number) {
    this.logger.log(`Server running on port ${port}`);
  }

  logConnectionDb(description: string) {
    this.logger.log(`${description}`);
  }
}
