import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import axios from "axios";
import { RootArticle } from "../../../utils/types";

export const newsRouter = createTRPCRouter({
  getNews: publicProcedure.query(async () => {
    const res = await axios.get<RootArticle>(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    );
    return res.data;
  }),
});
