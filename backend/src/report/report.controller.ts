import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('top-scores')
  async getTopScores() {
    return this.reportService.getTopScores();
  }

  @Get('last-stats-time')
  async getLastStatTime() {
    return this.reportService.getLastStatTime();
  }
}
