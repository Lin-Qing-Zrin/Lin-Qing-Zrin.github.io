/**
 * 首页「日志」区。按时间倒序，一行一条。
 * 写新的就往数组最前面插一条；href 指到对应分类页。
 */
export type LogEntry = {
  date: string;
  title: string;
  note: string;
  href: string;
};

export const log: LogEntry[] = [
  {
    date: '2026.11',
    title: '竹林古寺',
    note: '竹林入口能走满了，山门遭遇战在排期',
    href: '/work/game/',
  },
  {
    date: '2026.10',
    title: '此心光明',
    note: '80 秒王阳明，三幕结构，画面全部生成',
    href: '/work/film/',
  },
  {
    date: '2026.09',
    title: '慢帧 Slomo',
    note: '第七个系列开更，账号累计 47 条',
    href: '/work/tiktok/gallery/',
  },
  {
    date: '2026.08',
    title: '枕边气象站',
    note: '双端联动跑通：手表点一下，桌面落一场雨',
    href: '/work/ui/',
  },
  {
    date: '2026.06',
    title: '明序工作室',
    note: '日月字标定稿，规范页整理完',
    href: '/work/identity/',
  },
];
