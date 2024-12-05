import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameStat } from '../game-stat/game-stat.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(GameStat)
    private gameStatRepository: Repository<GameStat>,
  ) {}

  // Obtener las 10 mejores puntuaciones
  async getTopScores() {
    try {
      return this.gameStatRepository.find({
        order: { score: 'DESC' },
        take: 10,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Obtener la última vez que se generaron estadísticas
  async getLastStatTime() {
    try {
      const lastStat = await this.gameStatRepository.findOne({
        where: {},
        order: { updatedAt: 'DESC' },
      });
      return lastStat ? new Date(lastStat.updatedAt).toLocaleString() : null;
    } catch (error) {
      console.log(error);
    }
  }
}
