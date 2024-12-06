import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('top-scores')
  @ApiOperation({ summary: 'Get top 10 players with best scores' })
  @ApiResponse({
    status: 200,
    description: 'Top 10 players with best scores',
    schema: {
      example: [
        {
          playerId: 1,
          nickname: 'player123',
          score: 95,
          createdAt: '2024-12-05T10:00:00Z',
        },
        {
          playerId: 2,
          nickname: 'player456',
          score: 90,
          createdAt: '2024-12-05T10:05:00Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No top scores found',
    schema: {
      example: { message: 'No top scores found' },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: { message: 'Error in obtaining top scores' },
    },
  })
  async getTopScores() {
    try {
      return await this.reportService.getTopScores();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('last-stats-time')
  @ApiOperation({ summary: 'Get the last time the stats were generated' })
  @ApiResponse({
    status: 200,
    description: 'Last time stats were generated',
    schema: {
      example: '6/12/2024, 01:02:28',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No statistics found',
    schema: {
      example: { message: 'No statistics found' },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: { message: 'Error getting the last hour of statistics' },
    },
  })
  async getLastStatTime() {
    try {
      return await this.reportService.getLastStatTime();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
