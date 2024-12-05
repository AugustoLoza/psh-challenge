import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameStatService } from './game-stat.service';
import { GameStatController } from './game-stat.controller';
import { GameStat } from './game-stat.entity';
import { GameStatMiddleware } from './game-stat.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([GameStat]), HttpModule],
  providers: [GameStatService],
  controllers: [GameStatController],
  exports: [GameStatService],
})
export class GameStatModule  {
  /*configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GameStatMiddleware)
      .forRoutes(GameStatController);
  }*/
}
