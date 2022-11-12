import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

const createUserBody = z.object({
  access_token: z.string(),
});

const userinfoSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  picture: z.string().url(),
});

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    '/me',
    {
      onRequest: [authenticate],
    },
    async (request) => {
      await authenticate(request);
      return { user: request.user };
    }
  );

  fastify.post('/users', async (req, res) => {
    const { access_token } = createUserBody.parse(req.body);
    const userResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = await userResponse.json();
    const userInfo = userinfoSchema.parse(userData);

    // check if the user exists in the database
    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
          googleId: userInfo.id,
        },
      });
    }

    const token = fastify.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
        email: user.email,
      },
      {
        sub: user.id,
        expiresIn: '6h',
      }
    );
    return { token };
  });
};
