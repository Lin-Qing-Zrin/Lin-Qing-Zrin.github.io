/**
 * 作品大类：和 F:\学校\个人作品集图片 下的文件夹一一对应。
 * status = 'open' 表示这一类已经能点进去看；'soon' 先占位，别做成死链。
 */
export type Category = {
  no: string;
  slug: string;
  en: string;
  cn: string;
  count: number;
  status: 'open' | 'soon';
  blurb?: string;
};

export const categories: Category[] = [
  {
    no: '01',
    slug: 'tiktok',
    en: 'TikTok',
    cn: '抖音帐号',
    count: 47,
    status: 'open',
    blurb: '七个系列，47 条影像。',
  },
  {
    no: '02',
    slug: 'ai-film',
    en: 'AI Film',
    cn: 'AI 影像',
    count: 3,
    status: 'soon',
    blurb: '王阳明、苏轼、一支 MV。',
  },
  { no: '03', slug: 'game', en: 'Game', cn: '游戏开发', count: 1, status: 'soon' },
  { no: '04', slug: 'vfx', en: '3D & VFX', cn: '特效', count: 2, status: 'soon' },
  { no: '05', slug: 'ui', en: 'Product UI', cn: '交互设计', count: 2, status: 'soon' },
  { no: '06', slug: 'identity', en: 'Identity', cn: '品牌设计', count: 1, status: 'soon' },
  { no: '07', slug: 'poster', en: 'Poster', cn: '海报', count: 19, status: 'soon' },
];
