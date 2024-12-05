import { Test, TestingModule } from '@nestjs/testing';
import { GameStatController } from './game-stat.controller';

describe('GameStatController', () => {
  let controller: GameStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameStatController],
    }).compile();

    controller = module.get<GameStatController>(GameStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
