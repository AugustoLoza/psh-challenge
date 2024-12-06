import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameStat } from './game-stat.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class GameStatService {
  constructor(
    @InjectRepository(GameStat)
    private gameStatRepository: Repository<GameStat>,
    private readonly httpService: HttpService,
  ) {}

  async simulateGameStat() {
    // Call the API to get a random name and image
    try {
      const response = await lastValueFrom(
        this.httpService.get('https://randomuser.me/api'),
      );
      const { name, picture } = response.data.results[0];

      const now = new Date();
      const formattedDate = now
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19);
      // Create a new game statistic
      const newStat = this.gameStatRepository.create({
        playerId: uuidv4(),
        nickname: name.first,
        profileImage: picture.large,
        updatedAt: formattedDate,
        createdAt: formattedDate,
        score: Math.floor(Math.random() * 1000) + 1,
      });

      // Save the statistic in the database
      return await this.gameStatRepository.save(newStat);
    } catch (error) {
      console.error('Error when simulating game statistics:', error.message);
      throw new InternalServerErrorException(
        'Error when simulating game statistics:',
      );
    }
  }
}
