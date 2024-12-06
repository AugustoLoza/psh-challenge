import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateApiResponsePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Validation of the API response
    if (!value || !value.playerId || !value.nickname || !value.profileImage) {
      throw new BadRequestException('API response is missing required fields');
    }
    return value;
  }
}
