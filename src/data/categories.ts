/**
 * 作品大类：和 F:\学校\个人作品集图片 下的文件夹一一对应。
 * status = 'open' 表示这一类已经能点进去看；'soon' 先占位，别做成死链。
 * 每个 open 的类都要在 src/pages/work/ 下有同名页面。
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
    blurb: '七个系列，47 条影像。片单 + 可推拉画布。',
  },
  {
    no: '02',
    slug: 'film',
    en: 'AI Film',
    cn: 'AI 影像',
    count: 3,
    status: 'open',
    blurb: '王阳明、苏轼、一支 MV。竖着滚的片盘。',
  },
  {
    no: '03',
    slug: 'game',
    en: 'Game',
    cn: '游戏开发',
    count: 2,
    status: 'open',
    blurb: '一个能直接玩的小游戏，加一关还在搭的虚幻引擎关卡。',
  },
  {
    no: '04',
    slug: 'vfx',
    en: '3D & VFX',
    cn: '特效',
    count: 3,
    status: 'open',
    blurb: '粒子、体积、角色渲染。会跟着鼠标歪的一面墙。',
  },
  {
    no: '05',
    slug: 'ui',
    en: 'Product UI',
    cn: '交互设计',
    count: 2,
    status: 'open',
    blurb: '双端联动与一条可以拖的对比线。',
  },
  {
    no: '06',
    slug: 'identity',
    en: 'Identity',
    cn: '品牌设计',
    count: 3,
    status: 'open',
    blurb: '日月几何字标、不偏书签文创，以及四张印刷稿。',
  },
  {
    no: '07',
    slug: 'poster',
    en: 'Poster',
    cn: '海报',
    count: 18,
    status: 'open',
    blurb: '18 张印刷稿，四组，一张张摊开看。',
  },
];
