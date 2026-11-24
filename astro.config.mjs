import { defineConfig } from 'astro/config';

// 目标：GitHub Pages，仓库名 Lin-Qing-Zrin.github.io（= 用户主页仓库）
// 这种情况下站点直接挂在根路径，不需要 base。
// 如果以后改成普通仓库 <user>/<repo>，再加 base: '/<repo>'，并把站内链接套 BASE_URL。
export default defineConfig({
  site: 'https://lin-qing-zrin.github.io',
  build: {
    inlineStylesheets: 'auto',
  },
  // 开发工具条会挡住页脚，关掉
  devToolbar: { enabled: false },
});
