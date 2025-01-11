// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.useGlobalPipes(new ValidationPipe());

//   await app.listen(process.env.PORT ?? 5000);
// }
// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the frontend (localhost:3000 in your case)
  app.enableCors({
    origin: ['http://localhost:3000', "https://hospital-food-management-system-ten.vercel.app"], // Your frontend URL
    methods: 'GET,POST,PUT,DELETE,PATCH', // Methods allowed
    allowedHeaders: 'Content-Type, Authorization', // Headers allowed
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Start the app on the configured port
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
