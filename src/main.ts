import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServerConfiguration } from './config/server.config';
import { useContainer } from 'class-validator';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initializeSwagger } from '@utils/initialize-swagger.util';
import { handleValidationErrors } from '@handlers/validation-error.handler';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { HttpExceptionFilter } from '@filters/http.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors
  app.enableCors();

  // get config module
  const { PORT, APP_NAME, NODE_ENV } = app.get(ConfigService).get<ServerConfiguration>('server');

  // set container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // global prefix
  app.setGlobalPrefix('/api/v1');

  // enable validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    errorHttpStatusCode: 422,
    exceptionFactory: handleValidationErrors
  }));

  // unify response body 
  app.useGlobalInterceptors(new ResponseInterceptor());

  // catch all exceptions
  app.useGlobalFilters(new HttpExceptionFilter());

  // initialize swagger
  initializeSwagger(app, APP_NAME);

  await app.listen(PORT);

  Logger.log(`Application: ${APP_NAME}`, 'Application');
  Logger.log(`Environment: ${NODE_ENV}`, 'Application');
  Logger.log(`Server running on port ${PORT}`, 'Application');
}
bootstrap();
