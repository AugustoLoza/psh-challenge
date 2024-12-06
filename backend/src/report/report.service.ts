import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameStat } from '../game-stat/game-stat.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(GameStat)
    private gameStatRepository: Repository<GameStat>,
  ) {}

  // Obtain top 10 scores
  async getTopScores() {
    try {
      const topScores = await this.gameStatRepository.find({
        order: { score: 'DESC' },
        take: 10,
      });

      if (!topScores || topScores.length === 0) {
        throw new NotFoundException('No top scores found');
      }

      return topScores;
    } catch (error) {
      console.error('Error when obtaining the best scores:', error.message);
      throw new InternalServerErrorException(
        'Error when obtaining the best scores',
      );
    }
  }

  // Get the last time the report was refreshed
  async getLastStatTime() {
    try {
      const lastStat = await this.gameStatRepository.findOne({
        where: {},
        order: { updatedAt: 'DESC' },
      });

      if (!lastStat) {
        throw new NotFoundException('No statistics found');
      }

      return new Date(lastStat.updatedAt).toLocaleString();
    } catch (error) {
      console.error(
        'Error in obtaining the last hour of statistics:',
        error.message,
      );
      throw new InternalServerErrorException(
        'Error in obtaining the last hour of statistics',
      );
    }
  }
}
