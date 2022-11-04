import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'], // log all queries & results
});

async function bootstrap() {
  const fastify = Fastify({ logger: true }); // set logger to true to enable logging

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();
    return { count };
  });

  await fastify.listen({ port: 3333 });
}

bootstrap();
