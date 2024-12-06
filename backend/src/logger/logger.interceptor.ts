import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { LoggerService } from './logger.service';
  import { tap, catchError } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logService: LoggerService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const url = request.url;
  
      const now = Date.now();
  
      return next
        .handle()
        .pipe(
          tap((data) => {
            const duration = Date.now() - now;
            this.logService.logRequest(method, url, 200, duration);
          }),
          catchError((error) => {
            const duration = Date.now() - now;
            this.logService.logError(method, url, error);
            throw error;
          }),
        );
    }
  }
  