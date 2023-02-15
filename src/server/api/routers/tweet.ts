import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const tweetRouter = createTRPCRouter({
  createTweet: protectedProcedure
    .input(
      z.object({
        image: z.string().optional(),
        text: z.string(),
        authorized: z.enum(["PUBLIC", "FOLLOWER"]),
      })
    )
    .mutation(async ({ input, ctx: { prisma, session } }) => {
      const newTweet = await prisma.tweet.create({
        data: {
          user: {
            connect: {
              id: session.user.id,
            },
          },
          image: input.image,
          text: input.text,
          authorized: input.authorized,
        },
      });
      return newTweet;
    }),

  getTweets: protectedProcedure.query(async ({ ctx: { prisma, session } }) => {
    return await prisma.$transaction(async (tx) => {
      const followingUser = await tx.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          Following: true,
        },
      });

      const following = followingUser
        ? followingUser.Following.map((f) => f.userId)
        : [];

      const tweets = await tx.tweet.findMany({
        where: {
          user: {
            id: {
              in: [session.user.id, ...following],
            },
          },
        },
      });
      return tweets;
    });
  }),

  deleteTweet: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx: { prisma }, input: tweetID }) => {
      const tweet = await prisma.tweet.delete({
        where: {
          id: tweetID,
        },
      });

      return tweet;
    }),
});
