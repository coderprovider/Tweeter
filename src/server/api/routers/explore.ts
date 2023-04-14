import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { formatError } from "../../../utils/utilityFunctions";

function reusedInclude(loggedInUserID: string) {
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
          id: loggedInUserID,
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

export const exploreRouter = createTRPCRouter({
  latestTweets: protectedProcedure.query(
    async ({ ctx: { prisma, session } }) => {
      try {
        const latestTweets = await prisma.tweet.findMany({
          orderBy: {
            createdAt: "asc",
          },
          include: reusedInclude(session.user.id),
        });

        return latestTweets;
      } catch (err) {
        console.log(err);
        throw new TRPCError(formatError(err));
      }
    }
  ),
  topTweets: protectedProcedure.query(async ({ ctx: { prisma, session } }) => {
    try {
      const topTweets = await prisma.tweet.findMany({
        include: reusedInclude(session.user.id),
      });

      topTweets.sort((a, b) => b._count.likes - a._count.likes);

      return topTweets;
    } catch (err) {
      console.log(err);
      throw new TRPCError(formatError(err));
    }
  }),
  topMedia: protectedProcedure.query(async ({ ctx: { prisma, session } }) => {
    try {
      const topMedia = await prisma.tweet.findMany({
        where: {
          image: {
            not: null,
          },
        },
        include: reusedInclude(session.user.id),
      });

      topMedia.sort((a, b) => b._count.likes - a._count.likes);

      return topMedia;
    } catch (err) {
      console.log(err);
      throw new TRPCError(formatError(err));
    }
  }),
  topUsers: protectedProcedure.query(async ({ ctx: { prisma, session } }) => {
    try {
      const topUsers = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          image: true,
          _count: {
            select: {
              followedBy: true,
            },
          },
        },
      });

      topUsers.sort((a, b) => b._count.followedBy - a._count.followedBy);

      return topUsers;
    } catch (err) {
      console.log(err);
      throw new TRPCError(formatError(err));
    }
  }),
});
