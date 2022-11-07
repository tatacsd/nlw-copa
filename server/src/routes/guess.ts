import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export const guessRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count();
    return { count };
  });

  fastify.post(
    '/polls/:pollId/games/:gameId/guesses',
    { onRequest: [authenticate] },
    async (req, res) => {
      const guessParams = z.object({
        pollId: z.string(),
        gameId: z.string(),
      });

      const guessBody = z.object({
        firstTeamPoints: z.number().min(0),
        secondTeamPoints: z.number().min(0),
      });

      const { pollId, gameId } = guessParams.parse(req.params);
      const { firstTeamPoints, secondTeamPoints } = guessBody.parse(req.body);

      // validate the participant with the pollId and userId
      const participant = await prisma.participant.findUnique({
        where: {
          userId_pollId: {
            userId: req.user.sub,
            pollId,
          },
        },
      });

      if (!participant) {
        res.status(403).send({
          message: 'You are not allowed to make a guess for this poll',
        });
      }

      // validate the game if the user already made a guess
      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            participantId: participant!.id,
            gameId,
          },
        },
      });

      if (guess) {
        res.status(400).send({
          message: 'You already made a guess for this game in this poll',
        });
      }

      // find the game
      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });

      if (!game) {
        res.status(404).send({
          message: 'Game not found',
        });
      }

      // validate the game date
      if (game!.date < new Date()) {
        res.status(400).send({
          message: 'You cannot make a guess for a game that already started',
        });
      }

      // create the guess
      const createdGuess = await prisma.guess.create({
        data: {
          firstTeamPoints,
          secondTeamPoints,
          gameId,
          participantId: participant!.id,
        },
      });

      return res.status(201).send(createdGuess);
    }
  );
};
