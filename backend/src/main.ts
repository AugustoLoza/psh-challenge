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

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001',
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
  const port = configService.get<number>('PORT', 3000); // 3000 is the default value

  // Log the port where the server is running using your custom logger
  logger.logServerStartup(port); // Utiliza tu método para mostrar el puerto

  // Start the server
  await app.listen(port);
}

bootstrap();
