import { z } from "zod";

export const createArticleSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Titulo Requerido!" }),
    content: z.string({ required_error: "Conteúdo Requerido!" }),
  }),
});

export const articleParamsSchema = z.object({
  params: z.object({
    articleId: z.string({ required_error: "ID do Artigo é Requerido!" }),
  }),
});

export const updateArticleSchema = z.object({
  params: z.object({
    articleId: z.string({ required_error: "ID do Artigo é Requerido!" }),
  }),
  body: z.object({
    title: z.string({ required_error: "Titulo Requerido!" }),
    content: z.string({ required_error: "Conteúdo Requerido!" }),
  }),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema.shape.body>;
export type ArticleParamsInput = z.infer<
  typeof articleParamsSchema.shape.params
>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
