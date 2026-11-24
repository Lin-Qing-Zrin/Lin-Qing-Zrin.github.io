/**
 * 首页「PRACTICE / 在做什么」区。一行一个方向：大字英文 + 小字中文 + 一句说明。
 * 文案按「它是什么」写，不写具体作品名。
 * `img` 用于悬停时在右侧浮现的代表图。
 */
export type Practice = {
  no: string;
  en: string;
  cn: string;
  note: string;
  href: string;
  img: string;
};

export const practice: Practice[] = [
  {
    no: '01',
    en: 'Game',
    cn: '游戏开发',
    note: 'UE5 · 一关武侠 · 场景与战斗自己搭',
    href: '/work/game/',
    img: '/images/game/concept.webp',
  },
  {
    no: '02',
    en: 'Vibe Video',
    cn: 'AI 视频 · MV 与人物',
    note: '生成 → 分镜 → 剪辑 → 调色',
    href: '/work/film/',
    img: '/images/film/mv-winter.webp',
  },
  {
    no: '03',
    en: 'Self-media',
    cn: '自媒体 · 七个系列',
    note: '选题 · 出图 · 剪辑 · 发布，共 47 条',
    href: '/work/tiktok/',
    img: '/images/tiktok/s6/01.webp',
  },
  {
    no: '04',
    en: 'Product UI',
    cn: '交互设计',
    note: '双端联动 · 手势与反馈分开设计',
    href: '/work/ui/',
    img: '/images/ui/weather.webp',
  },
  {
    no: '05',
    en: 'Design',
    cn: '设计',
    note: '字标 · 规范 · 印刷稿',
    href: '/work/identity/',
    img: '/images/identity/lumin.webp',
  },
];
