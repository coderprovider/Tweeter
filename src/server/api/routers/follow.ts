import { User } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const followRouter = createTRPCRouter({
  suggestToFollow: protectedProcedure.query(
    async ({ ctx: { prisma, session } }) => {
      return await prisma.$transaction(async (tx) => {
        const suggested = (await tx.user.aggregateRaw({
          pipeline: [
            {
              $graphLookup: {
                from: "User",
                startWith: "$followingIDs",
                connectFromField: "followingIDs",
                connectToField: "_id",
                depthField: "depth",
                as: "extended_network",
              },
            },
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: session.user.id }] },
              },
            },
            // Add new accumulating fields
            {
              $set: {
                _id: "$$REMOVE",
                notFollowing: {
                  $slice: [
                    {
                      $filter: {
                        input: "$extended_network",
                        as: "n",
                        cond: {
                          $gte: ["$$n.depth", 1],
                        },
                      },
                    },
                    20,
                  ],
                },
              },
            },
            {
              $project: {
                onlyIDs: {
                  $map: {
                    input: "$extended_network",
                    as: "n",
                    in: { $toString: "$$n._id" },
                  },
                },
                suggestUsers: {
                  $map: {
                    input: "$notFollowing",
                    as: "u",
                    in: {
                      id: { $toString: "$$u._id" },
                      email: "$$u.email",
                      image: "$$u.image",
                      name: "$$u.name",
                    },
                  },
                },
              },
            },
          ],
        })) as any;

        const suggestedUsers = suggested[0].suggestUsers as {
          id: string;
          email: string | null;
          image: string | null;
          name: string | null;
        }[];

        if (suggestedUsers.length < 20) {
          const randomUsers = await tx.user.findMany({
            where: {
              NOT: {
                id: {
                  in: [session.user.id, ...suggested[0].onlyIDs], // Exclude suggested users from the random users
                },
              },
            },
            select: {
              id: true,
              image: true,
              name: true,
              email: true,
            },
            take: 20 - suggestedUsers.length, // Retrieve enough random users to make up the difference
          });
          suggestedUsers.push(...randomUsers);
        }

        return suggestedUsers;
        // return suggested;
      });
    }
  ),

  followUser: protectedProcedure
    .input(z.object({ followUserID: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input: { followUserID } }) => {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          following: {
            connect: {
              id: followUserID,
            },
          },
        },
      });

      return followUserID;
    }),
});
