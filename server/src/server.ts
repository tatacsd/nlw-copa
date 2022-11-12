import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import Fastify from 'fastify';
import { authRoutes } from './routes/auth';
import { gamesRoutes } from './routes/game';
import { guessRoutes } from './routes/guess';
import { pollRoutes } from './routes/poll';
import { userRoutes } from './routes/user';

async function bootstrap() {
  const fastify = Fastify({ logger: true }); // set logger to true to enable logging

  await fastify.register(cors, {
    origin: true, // allow all origins; production should be domain name
  });

  await fastify.register(jwt, {
    secret: 'nlw',
  });

  await fastify.register(authRoutes);
  await fastify.register(gamesRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(pollRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
  // await fastify.listen({ port: 3333 });
}

bootstrap();
