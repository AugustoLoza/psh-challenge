import { GameStatMiddleware } from './game-stat.middleware';

describe('GameStatMiddleware', () => {
  it('should be defined', () => {
    expect(new GameStatMiddleware()).toBeDefined();
  });
});
