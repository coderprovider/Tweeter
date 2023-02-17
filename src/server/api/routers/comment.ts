import { z } from "zod";
import cloudinary from "../../../utils/cloudinaryConfig";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  getComments: protectedProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input: twitterID }) => {
      const comments = await prisma.comment.findMany({
        where: {
          Tweet: {
            id: twitterID,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });
      return comments;
    }),

  createComment: protectedProcedure
    .input(
      z.object({
        comment: z.string(),
        image: z.string(),
        twitterID: z.string(),
      })
    )
    .mutation(
      async ({
        ctx: { prisma, session },
        input: { comment, image, twitterID },
      }) => {
        const photoUrl = image
          ? await cloudinary.uploader.upload(image)
          : undefined;

        const newComment = await prisma.comment.create({
          data: {
            user: {
              connect: {
                id: session.user.id,
              },
            },
            Tweet: {
              connect: {
                id: twitterID,
              },
            },
            text: comment,
            image: photoUrl?.url,
          },
          include: {
            user: true,
            Tweet: true,
            _count: {
              select: {
                likes: true,
              },
            },
          },
        });

        return newComment;
      }
    ),
  deleteComment: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx: { prisma }, input: commentID }) => {
      const comment = await prisma.comment.delete({
        where: {
          id: commentID,
        },
      });
      return comment;
    }),
});
