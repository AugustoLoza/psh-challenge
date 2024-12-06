import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule.service';
import { GameStatModule } from '../game-stat/game-stat.module';

@Module({
  imports: [ScheduleModule.forRoot(), GameStatModule],
  providers: [ScheduleService],
})
export class ScheduleClassModule {}
