import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import cloudinary from "../../../utils/cloudinaryConfig";

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
      const photoUrl = input.image
        ? await cloudinary.uploader.upload(input.image)
        : undefined;

      const newTweet = await prisma.tweet.create({
        data: {
          user: {
            connect: {
              id: session.user.id,
            },
          },
          image: photoUrl?.url,
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

      const reusedWhere = {
        user: {
          id: session.user.id,
        },
      };

      const tweets = await tx.tweet.findMany({
        where: {
          user: {
            id: {
              in: [session.user.id, ...following],
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          _count: {
            select: {
              retweets: true,
              likes: true,
              Bookmark: true,
              comments: true,
            },
          },
          retweets: {
            where: {
              user: {
                id: session.user.id,
              },
            },
          },
          likes: {
            where: reusedWhere,
          },
          Bookmark: {
            where: reusedWhere,
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

  likeTweet: protectedProcedure
    .input(z.object({ liked: z.boolean(), twitterID: z.string() }))
    .mutation(
      async ({ ctx: { prisma, session }, input: { liked, twitterID } }) => {}
    ),
});
