import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';
import ShortUniqueId from 'short-unique-id';
import { z } from 'zod';

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

  fastify.post('/pools', async (req, res) => {
    const body = z
      .object({
        title: z.string(),
      })
      .parse(req.body);
    const { title } = body;
    const generateID = new ShortUniqueId({ length: 6 });
    const code = String(generateID()).toUpperCase();

    try {
      if (!title) {
        throw new Error('title is required');
      }

      // create the pool
      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });

      return res.status(201).send({
        code,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({
          message: error.issues
            .map((issue) => issue.message)
            .join(', '),
        });
      } else if (error === 'title is required') {
        return res.status(400).send({
          message: error,
        });
      } else {
        return res.status(500).send({
          message: error.message,
        });
      }
    }
  });

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count();
    return { count };
  });

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count();
    return { count };
  });

  // await fastify.listen({ port: 3333, host: '0.0.0.0' });
  await fastify.listen({ port: 3333 });
}

bootstrap();
