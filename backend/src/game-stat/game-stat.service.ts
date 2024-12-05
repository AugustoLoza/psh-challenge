import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameStat } from './game-stat.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameStatService {
  constructor(
    @InjectRepository(GameStat)
    private gameStatRepository: Repository<GameStat>,
    private readonly httpService: HttpService,
  ) {}

  async simulateGameStat() {
    // Llamar a la API para obtener un nombre y una imagen aleatorios
    try {
      const response = await lastValueFrom(
        this.httpService.get('https://randomuser.me/api')
      );
      const { name, picture } = response.data.results[0];
      
      const now = new Date();
      const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
      // Crear una nueva estadística de juego
      const newStat = this.gameStatRepository.create({
        playerId: uuidv4(), // ID aleatorio de jugador
        nickname: name.first, // Nickname aleatorio
        profileImage: picture.large, // Imagen aleatoria
        createdAt: formattedDate,
        updatedAt: formattedDate,
        score: Math.floor(Math.random() * 100) + 1, // Puntuación aleatoria entre 1 y 100
      });
  
      // Guardar la estadística en la base de datos
      return await this.gameStatRepository.save(newStat);
    } 
    catch (error) {
      console.error('Error al simular la estadística de juego:', error);
    }
  } 
}

