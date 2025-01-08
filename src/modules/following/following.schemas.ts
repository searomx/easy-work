import { z } from "zod";

export const followingFeedSchema = z.object({
  query: z.object({
    limit: z.string().optional(),
    offset: z.string().optional(),
    search: z.string().optional(),
  }),
});

export const followUserSchema = z.object({
  params: z.object({
    userId: z.string({ required_error: "O ID do Usuário é Obrigatório!" }),
  }),
});

export type FollowingFeedType = z.infer<typeof followingFeedSchema>;
export type FollowUserType = z.infer<typeof followUserSchema>;
