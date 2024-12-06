import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameStatService } from './game-stat.service';
import { GameStatController } from './game-stat.controller';
import { GameStat } from './game-stat.entity';
import { HttpModule } from '@nestjs/axios';
import { ValidateApiResponsePipe } from './game-stat-validate.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([GameStat]), HttpModule],
  providers: [GameStatService, ValidateApiResponsePipe],
  controllers: [GameStatController],
  exports: [GameStatService],
})
export class GameStatModule {}
