import { defineConfig } from 'astro/config';

// 本地开发：base 留空，访问 http://localhost:4321/
// 部署到 GitHub Pages 的 <user>.github.io/<repo>/ 时，取消下面两行注释：
//   site: 'https://<user>.github.io',
//   base: '/<repo>',
export default defineConfig({
  site: 'https://example.github.io',
  build: {
    inlineStylesheets: 'auto',
  },
});
