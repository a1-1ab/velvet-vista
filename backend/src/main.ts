// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * @function bootstrap
 * @description Bootstraps the NestJS application.
 * Configures the server to listen on the specified port.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for Cloudflare Workers
  app.enableCors({
    origin: '*', // Allow all origins (adjust in production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Set the global prefix for API routes
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Velvet Vista Core API is running on: http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap the application:', err);
  process.exit(1);
});
