import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';

@Injectable()
export class GameStatMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { nickname, profileImage, score } = req.body;

    if (!nickname || typeof nickname !== 'string') {
      throw new BadRequestException('El nickname es obligatorio y debe ser una cadena.');
    }

    if (!profileImage || typeof profileImage !== 'string') {
      throw new BadRequestException('La imagen de perfil es obligatoria y debe ser una URL.');
    }

    if (!score || typeof score !== 'number' || score < 0 || score > 100) {
      throw new BadRequestException('El puntaje debe ser un número entre 0 y 100.');
    }

    next();
  }
}
