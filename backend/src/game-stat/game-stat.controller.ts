import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { GameStatService } from './game-stat.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidateApiResponsePipe } from './game-stat-validate.pipe';

@Controller('game-stats')
export class GameStatController {
  constructor(
    private readonly gameStatService: GameStatService,
    private readonly validateApiResponsePipe: ValidateApiResponsePipe, // Inject the pipe
  ) {}

  @Get('simulate')
  @ApiOperation({ summary: 'Simulate the creation of a new game stat' })
  @ApiResponse({
    status: 205,
    description: 'New game stat created successfully',
    schema: {
      example: {
        message: 'New game stat created',
        gameStat: {
          playerId: 1,
          nickname: 'player123',
          profileImage: 'https://example.com/profile.jpg',
          score: 85,
          createdAt: '2024-12-05T10:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - The game stat creation failed',
    schema: {
      example: {
        message: 'Error creating game stat',
      },
    },
  })
  // Function to generate
  async simulateGameStat() {
    try {
      const response = await this.gameStatService.simulateGameStat();
      // Validation of the API response using the pipe
      this.validateApiResponsePipe.transform(response, { type: 'body' });

      return {
        message: 'New game stat created',
        gameStat: response,
      };
    } catch (error) {
      throw new HttpException('Error creating game stat', 400, error.message);
    }
  }
}
