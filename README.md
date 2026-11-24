# Portfolio — Astro skeleton

暗场「仪器」风格的个人作品集：近黑底色 + 巨型字 + 实时数据读数（本地时间 / 经纬度 / 24fps 时间码）
+ 转动的线框地球（苏州打点）+ 胶片齿孔边 + 作品行列表（hover 光标跟随预览）。
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
│  │  ├─ Globe.astro         # 线框地球（canvas 正交投影，可拖拽）
│  │  └─ WorkRows.astro      # 作品行列表 + 光标跟随预览
│  ├─ data/land.json         # 地球用的陆地轮廓（world-atlas land-110m 解码后，65KB）
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

- [x] `src/components/Header.astro` — 左上角名字（刘启征）
- [x] `src/pages/index.astro` — H1 名字、两段自我介绍、eyebrow
- [x] `src/pages/about.astro` — 学校 / 专业 / 城市（苏州健雄职业技术学院 · Digital Media Technology · 苏州）
- [x] `src/pages/contact.astro` + `src/components/Footer.astro` — 邮箱 Linqingzhu0420@gmail.com、抖音 39490590044、GitHub Lin-Qing-Zrin
- [x] `astro.config.mjs` — `site: https://lin-qing-zrin.github.io`（仓库名必须是 `Lin-Qing-Zrin.github.io`）
- [x] `public/images/og.png` — 分享卡片图（已用中文名重做）
- [x] 配色 — 暗场 `--bg #0c0c0c` + 一个强调色 `--accent #d7ff3f`（荧光黄绿），红点 `--pin #ff3b1f`
- [ ] `src/components/Globe.astro` — 想把红点换到别的城市，改第 5 行的 `pin = { lon, lat }`
- [ ] **4 个作品仍是占位图**（`poster-01.svg` / `douyin.svg` / `ai-visual.svg` / `short-film.svg`），换成真图后才算完成

### 时钟

页脚 "Local time" 固定按 **Asia/Shanghai** 显示（`src/layouts/Base.astro` 的 `initClock`），
访客在哪个国家看到的都是北京时间，不会变成他自己的。

### 地球

`src/components/Globe.astro`，纯 canvas，没有 three.js / 没有依赖：

- 投影是正交投影，`state.lon0 / lat0` 是视角中心；静止时自动自转约 4.5°/s。
- 鼠标能在球上拖动（`pointerdown/move/up`），松手有惯性；hover 时暂停自转。
- 陆地数据在 `src/data/land.json`（`world-atlas` 的 `land-110m` 解码来的经纬环，126 条环）。
- **只描海岸线，不填充陆地**：正交投影下填充多边形会在球缘用一条直弦闭合，
  出现横切整个球面的色带；线框反而更干净，也更符合这套「仪器」语言。
  要改颜色就改 `drawLand()` 里的 `strokeStyle` 和 `draw()` 里的 `createRadialGradient` 三段色。
- 换了城市要把 `Globe.astro` 顶部的 `pin` 和 `src/pages/index.astro` 里的
  `Lat` / `Lon` 读数一起改，三处对不上会显得假。

### 时间码

`Base.astro` 的 `initTimecode()` 把 24fps 的 `HH:MM:SS:FF` 写进所有 `[data-tc]`。
想在第几屏出现，给那个元素加 `data-tc` 就行；`prefers-reduced-motion` 下固定显示 `00:00:00:00`。

### 预览框比例

作品行 hover 时跟随鼠标的预览框会按 frontmatter 里的 `ratio` 自动换尺寸：
`4:5` → 300×375 / `16:10` → 356×222 / `9:16` → 238×423。
新增比例时在 `global.css` 里补一条 `.preview[data-ratio='…']` 即可，JS 不用改。

## 6. 设计约定（别破坏它）

- 一屏只有一个巨型标题；正文最大 62ch。
- 底色是近黑 `--bg #0c0c0c`，只有**一个**强调色 `--accent #d7ff3f` + 一个信号红 `--pin #ff3b1f`。
- 数字/读数/元信息一律用等宽字体（`.mono`、`--font-mono`，大写 + 0.14em 字距）。
- 动效只动 `transform / opacity`，时长 150–700ms，缓动统一 `var(--ease)`。
- 所有动效都必须在 `prefers-reduced-motion: reduce` 下失效（已写好）。
- 作品列表是**行**，不是卡片网格；缩略图只通过光标跟随出现（移动端才显示行内缩略图）。
- 彩色作品直接放在暗底上，**不要把页面底色改成彩色**，也不要在作品周围加光晕。
- 花活只允许三处：左上数据读数、地球、REC 时间码。别再加第四个。

## 7. 字体

目前用 Google Fonts 的 Inter + Inter Tight（正文/标题）+ JetBrains Mono（读数/编号）（`Base.astro` 里的 `<link>`）。
国内访问 Google Fonts 可能慢，换成自托管：

1. 从 https://fontsource.org 或 https://www.fontshare.com 下载 woff2。
2. 放进 `public/fonts/`。
3. 在 `global.css` 顶部写 `@font-face`，然后删掉 `Base.astro` 里的 Google Fonts `<link>`。
