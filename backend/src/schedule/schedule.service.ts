import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GameStatService } from '../game-stat/game-stat.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly gameStatService: GameStatService) {} // GameStatService inyectado

  // Cron job que ejecuta la simulación cada 5 minutos
  //@Cron(CronExpression.EVERY_30_SECONDS)
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    try {
      await this.gameStatService.simulateGameStat();
      console.log('Game stat generated');
    } catch (error) {
      console.error('Error generating Game stat', error);
    }
  }
}
