import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getItems: publicProcedure.query(async () => {
    const result = await fetch("https://api.printful.com/store/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
    return result;
  }),

  getItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await fetch(
        `https://api.printful.com/store/products/${input.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          return err;
        });
      return result;
    }),
});
