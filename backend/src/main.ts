import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(LoggerService);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Game Stats API')
    .setDescription('API to manage and generate game statistics for players.')
    .setVersion('1.0')
    .addTag('games')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Get TypeORM connection
  const dataSource: DataSource = app.get(DataSource);

  if (dataSource.isInitialized) {
    logger.logConnectionDb('Connection has been established successfully.');
  } else {
    logger.logConnectionDb('Unable to connect to the database.');
  }

  // Get the port from the environment variables
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000); 

  // Log the port where the server is running using your custom logger
  logger.logServerStartup(port); 

  // Start the server
  await app.listen(port);
}

bootstrap();
