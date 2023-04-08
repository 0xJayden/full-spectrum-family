import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getItems: publicProcedure.query(async () => {
    const result = await fetch(
      "https://api.printful.com/store/products?limit=50",
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

  getItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
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

  getCountries: publicProcedure.query(async () => {
    const result = await fetch("https://api.printful.com/tax/countries", {
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

  getTax: publicProcedure
    .input(
      z.object({
        country: z.string(),
        state: z.string(),
        city: z.string(),
        zip: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await fetch(`https://api.printful.com/tax/rates`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: {
            country_code: input.country,
            state_code: input.state,
            city: input.city,
            zip: input.zip,
          },
        }),
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

  getShipping: publicProcedure
    .input(
      z.object({
        address: z.string(),
        city: z.string(),
        country: z.string(),
        state: z.string(),
        zip: z.number(),
        phone: z.string(),
        items: z.array(
          z.object({
            variant_id: z.string(),
            // external_variant_id: z.string(),
            quantity: z.number(),
            value: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const result = await fetch(`https://api.printful.com/shipping/rates`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: {
            address1: input.address,
            city: input.city,
            country_code: input.country,
            state_code: input.state,
            zip: input.zip,
            phone: input.phone,
          },
          items: input.items,
        }),
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
});
