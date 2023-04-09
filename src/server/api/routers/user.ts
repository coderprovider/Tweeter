import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatError } from "../../../utils/utilityFunctions";
import { createTRPCRouter, protectedProcedure } from "../trpc";

function reusedInclude(profileUserID: string, loggedInUserID: string) {
  const reusedWhere = {
    user: {
      id: loggedInUserID,
    },
  };
  return {
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
          id: {
            in: [profileUserID, loggedInUserID],
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
    likes: {
      where: reusedWhere,
    },
    Bookmark: {
      where: reusedWhere,
    },
  };
}

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx: { prisma, session }, input: { userID } }) => {
      try {
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: userID,
          },
          select: {
            _count: {
              select: {
                following: true,
                followedBy: true,
              },
            },
            followedBy: {
              where: {
                id: session.user.id,
              },
              select: {
                id: true,
              },
            },
            image: true,
            name: true,
            id: true,
          },
        });

        return user;
      } catch (err) {
        console.log(err);
        throw new TRPCError(formatError(err));
      }
    }),

  userTweets: protectedProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx: { prisma, session }, input: { userID } }) => {
      try {
        const tweets = await prisma.tweet.findMany({
          where: {
            OR: [
              {
                user: {
                  id: userID,
                },
              },
              {
                retweets: {
                  some: {
                    user: {
                      id: userID,
                    },
                  },
                },
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          include: reusedInclude(userID, session.user.id),
        });

        return tweets;
      } catch (err) {
        console.log(err);
        throw new TRPCError(formatError(err));
      }
    }),
  userMedia: protectedProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx: { prisma, session }, input: { userID } }) => {
      try {
        const tweetsWithMedia = await prisma.tweet.findMany({
          where: {
            user: {
              id: userID,
            },
            image: {
              not: null,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          include: reusedInclude(userID, session.user.id),
        });
        return tweetsWithMedia;
      } catch (err) {
        console.log(err);
        throw new TRPCError(formatError(err));
      }
    }),
  userLikes: protectedProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx: { prisma, session }, input: { userID } }) => {
      try {
        const tweetsWithLikes = await prisma.tweet.findMany({
          where: {
            likes: {
              some: {
                user: {
                  id: userID,
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          include: reusedInclude(userID, session.user.id),
        });

        return tweetsWithLikes;
      } catch (err) {
        console.log(err);
        throw new TRPCError(formatError(err));
      }
    }),
  userBookmarks: protectedProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx: { prisma, session }, input: { userID } }) => {
      try {
        const bookmarkedTweets = await prisma.tweet.findMany({});
      } catch (err) {
        console.log(err);
        throw new TRPCError(formatError(err));
      }
    }),
});
