# Portfolio — Astro skeleton

一个按「巨型字体 + 作品行列表 + 光标跟随预览」风格搭的个人作品集骨架。
静态站，构建产物是纯 HTML/CSS/JS，可以直接丢到 GitHub Pages。

---

## 1. 目录结构

```
portfolio/
├─ public/
│  ├─ favicon.svg
│  └─ images/
│     ├─ og.png              # 分享卡片图 1200×630
│     └─ works/              # 作品图（现在是占位 SVG，换成你的真图）
├─ src/
│  ├─ components/
│  │  ├─ Header.astro        # 顶栏（mix-blend-mode: difference）
│  │  ├─ Footer.astro        # 页脚「Let's work together.」
│  │  ├─ Cursor.astro        # 自定义光标
│  │  └─ WorkRows.astro      # 作品行列表 + 光标跟随预览
│  ├─ content/
│  │  ├─ works/*.md          # ← 你的作品，一篇 md = 一个作品
│  ├─ content.config.ts      # 作品的字段定义（schema）
│  ├─ layouts/Base.astro     # head / 预加载 / 光标 / 动效脚本
│  ├─ pages/
│  │  ├─ index.astro         # 首页
│  │  ├─ work/index.astro    # 作品列表
│  │  ├─ work/[...slug].astro# 作品详情
│  │  ├─ about.astro
│  │  ├─ contact.astro
│  │  └─ 404.astro
│  └─ styles/global.css      # 全部样式 + 设计 token
└─ astro.config.mjs
```

## 2. 加一个作品（这是你以后唯一要重复做的事）

1. 把图丢进 `public/images/works/`，例如 `my-poster.jpg`。
2. 在 `src/content/works/` 新建 `my-poster.md`：

```md
---
title: "城市噪音 City Noise"
category: "Poster Series"
year: 2024
cover: "/images/works/my-poster.jpg"
ratio: "4:5"          # 4:5 | 16:10 | 9:16
tools: ["Illustrator", "Photoshop"]
role: "Design · Direction"
summary: "一句话说明这个作品在做什么。"
order: 1              # 数字越小越靠前
featured: true        # 是否出现在首页「Recent work」
---

正文用 Markdown 写：背景、做法、结果。可以插多张图。
```

3. 提交、推送，线上 1 分钟后自动更新。

> 图片建议：长边 1600px 以内、单张 ≤ 400KB、格式 WebP 或 JPG。
> 竖版作品（9:16）在详情页会自动限制高度，不会被拉成一条长条。

## 3. 本地开发

本机没有全局 node，用自带的：

```powershell
$env:PATH = "F:\deepseek\test2\.tooling;" + $env:PATH
node "C:\Users\liuqi\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs" run dev
```

打开 http://localhost:4321 。改文件会热更新。

构建：

```powershell
pnpm run build      # 产物在 dist/
pnpm run preview    # 本地预览 dist
```

## 4. 部署到 GitHub Pages

```powershell
git init
git add -A
git commit -m "init portfolio"
git branch -M main
git remote add origin https://github.com/<你的账号>/<仓库名>.git
git push -u origin main
```

然后：
1. 仓库 Settings → Pages → Source 选 **GitHub Actions**。
2. 新建 `.github/workflows/deploy.yml`（Astro 官方模板，或直接搜 "astro github pages action"）。
3. **如果仓库名不是 `<你的账号>.github.io`**，站点会挂在 `/<仓库名>/` 子路径下，必须：
   - 在 `astro.config.mjs` 里打开 `base: '/<仓库名>'`；
   - 并把站内链接改成带 `BASE_URL` 的写法（或改用自定义域名 / 用 `<账号>.github.io` 仓库名，就不用改）。
4. 域名不买也能用 `https://<账号>.github.io/<仓库名>/` 访问。

## 5. 换成你自己的信息（checklist）

- [ ] `src/components/Header.astro` — 左上角名字
- [ ] `src/pages/index.astro` — H1 名字、两段自我介绍、eyebrow
- [ ] `src/pages/about.astro` — 【学校】【专业】【城市】
- [ ] `src/pages/contact.astro` + `src/components/Footer.astro` — 邮箱、电话、社交链接
- [ ] `astro.config.mjs` — `site` 改成你的线上地址
- [ ] `public/images/og.png` — 分享卡片图
- [ ] `src/styles/global.css` 的 `:root` — 想换强调色改 `--blue`

## 6. 设计约定（别破坏它）

- 一屏只有一个巨型标题；正文最大 62ch。
- 只用一个强调色（现在是 `#1a3cff` 蓝），其余全是黑白灰。
- 动效只动 `transform / opacity`，时长 150–700ms，缓动统一 `var(--ease)`。
- 所有动效都必须在 `prefers-reduced-motion: reduce` 下失效（已写好）。
- 作品列表是**行**，不是卡片网格；缩略图只通过光标跟随出现（移动端才显示行内缩略图）。
- 彩色作品放在中性底色上即可，**不要把页面底色改成彩色**。

## 7. 字体

目前用 Google Fonts 的 Inter + Inter Tight（`Base.astro` 里的 `<link>`）。
国内访问 Google Fonts 可能慢，换成自托管：

1. 从 https://fontsource.org 或 https://www.fontshare.com 下载 woff2。
2. 放进 `public/fonts/`。
3. 在 `global.css` 顶部写 `@font-face`，然后删掉 `Base.astro` 里的 Google Fonts `<link>`。
