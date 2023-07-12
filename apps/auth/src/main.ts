import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const rmqService = app.get(RmqService);
  app.connectMicroservice(rmqService.getOptions('AUTH', true));
  await app.startAllMicroservices();
  await app.listen(3001);
}

bootstrap();
