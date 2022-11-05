import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'], // log all queries & results
});

async function bootstrap() {
  const fastify = Fastify({ logger: true }); // set logger to true to enable logging

  await fastify.register(cors, {
    origin: true, // allow all origins; production should be domain name
  });

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();
    return { count };
  });

  // await fastify.listen({ port: 3333, host: '0.0.0.0' });
  await fastify.listen({ port: 3333 });
}

bootstrap();
