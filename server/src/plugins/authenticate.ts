import { FastifyRequest } from 'fastify';

export const authenticate = async (request: FastifyRequest) => {
  await request.jwtVerify();
};
