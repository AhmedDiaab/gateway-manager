import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServerConfiguration } from './config/server.config';
import { useContainer } from 'class-validator';
import { Logger } from '@nestjs/common';
import { initializeSwagger } from '@utils/initialize-swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get config module
  const { PORT, APP_NAME, NODE_ENV } = app.get(ConfigService).get<ServerConfiguration>('server');

  // set container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // global prefix
  app.setGlobalPrefix('/api/v1');

  // initialize swagger
  initializeSwagger(app, APP_NAME);

  await app.listen(PORT);

  Logger.log(`Application: ${APP_NAME}`, 'Application');
  Logger.log(`Environment: ${NODE_ENV}`, 'Application');
  Logger.log(`Server running on port ${PORT}`, 'Application');
}
bootstrap();
