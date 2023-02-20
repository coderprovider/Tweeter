import { TRPCError } from "@trpc/server";
import { z } from "zod";
import cloudinary from "../../../utils/cloudinaryConfig";
import { formatError } from "../../../utils/utilityFunctions";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  getComments: protectedProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input: tweetID }) => {
      try {
        const comments = await prisma.comment.findMany({
          where: {
            Tweet: {
              id: tweetID,
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
      } catch (err) {
        console.log(err);
        throw new TRPCError(formatError(err));
      }
    }),

  createComment: protectedProcedure
    .input(
      z.object({
        comment: z.string(),
        image: z.string(),
        tweetID: z.string(),
      })
    )
    .mutation(
      async ({
        ctx: { prisma, session },
        input: { comment, image, tweetID },
      }) => {
        try {
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
                  id: tweetID,
                },
              },
              text: comment,
              image: photoUrl?.url,
              imageID: photoUrl?.public_id,
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

          return newComment;
        } catch (err) {
          console.log(err);
          throw new TRPCError(formatError(err));
        }
      }
    ),
  deleteComment: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx: { prisma }, input: commentID }) => {
      try {
        const comment = await prisma.comment.delete({
          where: {
            id: commentID,
          },
        });
        return comment;
      } catch (err) {
        console.log(err);
        throw new TRPCError(formatError(err));
      }
    }),
  likeComment: protectedProcedure
    .input(
      z.object({
        liked: z.boolean(),
        likeID: z.string().optional(),
        commentID: z.string(),
      })
    )
    .mutation(
      async ({
        ctx: { prisma, session },
        input: { liked, likeID, commentID },
      }) => {
        try {
          if (liked && likeID) {
            const deletedLike = await prisma.commentLike.delete({
              where: {
                id: likeID,
              },
            });

            return deletedLike;
          }

          const likeComment = await prisma.commentLike.create({
            data: {
              user: {
                connect: {
                  id: session.user.id,
                },
              },
              Comment: {
                connect: {
                  id: commentID,
                },
              },
            },
          });

          return likeComment;
        } catch (err) {
          console.log(err);
          throw new TRPCError(formatError(err));
        }
      }
    ),
});
