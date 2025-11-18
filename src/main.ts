import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 5000);

  console.log('=====================================================');
  console.log(`Server is running on port ${process.env.PORT ?? 5000}`);
  console.log(
    `GraphQL Playground: http://localhost:${process.env.PORT ?? 5000}/graphql`,
  );
  console.log('=====================================================');
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
