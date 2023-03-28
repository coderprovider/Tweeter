import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatError } from "../../../utils/utilityFunctions";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx: { prisma }, input: { userID } }) => {
      try {
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: userID,
          },
          select: {
            _count: {
              select: {
                following: true,
              },
            },
            followedByIDs: true,
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
});
