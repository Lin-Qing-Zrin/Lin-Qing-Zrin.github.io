import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 作品集合：一个 .md 文件 = 一个作品。
 * 加作品 = 丢一个 md + 一张封面图 + git push，站点自动重新构建。
 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    year: z.number(),
    cover: z.string(),
    /** 图片宽高比：填封面图真实的那个，预览框和详情页都按它来 */
    ratio: z.enum(['4:5', '16:10', '9:16', '16:9', '3:4', '4:3', '1:1']).default('4:5'),
    tools: z.array(z.string()).default([]),
    role: z.string().default(''),
    summary: z.string(),
    order: z.number().default(0),
    /** 是否出现在首页 Recent work */
    featured: z.boolean().default(true),
  }),
});

export const collections = { works };
