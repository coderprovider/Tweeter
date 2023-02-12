import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const tweetRouter = createTRPCRouter({
  createTweet: protectedProcedure
    .input(z.object({ image: z.string().optional(), text: z.string() }))
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
        },
      });
      return newTweet;
    }),
});
