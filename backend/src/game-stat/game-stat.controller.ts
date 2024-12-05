import { Controller, Get } from '@nestjs/common';
import { GameStatService } from './game-stat.service';

@Controller('game-stats')
export class GameStatController {
  constructor(private readonly gameStatService: GameStatService) {}

  @Get('simulate')
  async simulateGameStat() {
    const newGameStat = await this.gameStatService.simulateGameStat();
    return {
      message: 'New game stat created',
      gameStat: newGameStat,
    };
  }
}
