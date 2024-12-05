import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameStat } from '../game-stat/game-stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameStat])],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
