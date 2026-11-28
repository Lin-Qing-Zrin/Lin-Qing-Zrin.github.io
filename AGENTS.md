# AGENTS.md — 给 AI 协作者的上下文

这是一个**个人作品集站点**（Astro 5，纯静态，无框架运行时）。设计语言是「暗场仪器」：近黑底、单一强调色、五层叠加的仪器感。**先读这一页，再动代码。**

主人：**Tupo_小满**（网名，站上只用这个；不要写成真名）。签名句：**何须多虑盈亏事，终归小满胜完全**。

---

## 1. 技术栈与运行

- Astro 5（`astro.config.mjs`，静态输出），部署到 GitHub Pages：<https://lin-qing-zrin.github.io>
- 依赖只有 `astro` 和 `lenis`。**不要引新依赖**（GSAP / three / tailwind 一律不加）
- 字体走 Google Fonts：`Inter Tight` + `Inter` + `JetBrains Mono` + `Noto Sans SC` + `Noto Serif SC`(900) + `Archivo Black`
- `astro.config.mjs` 里 `build.inlineStylesheets: 'always'` —— **别改回 auto**：GitHub Pages 换哈希时会有几十秒「HTML 还在、CSS 404」的裸页窗口

```pwsh
$env:PATH = "F:\deepseek\test2\.tooling;" + $env:PATH
& "F:\deepseek\test2\.tooling\node.exe" "<pnpm 路径>" run dev     # http://localhost:4321
& "F:\deepseek\test2\.tooling\node.exe" "<pnpm 路径>" run build   # 产物在 dist/
```

> **编辑前必须先停 dev server**，否则 Windows 上会报 `ReplaceFileW EIO (Win32 32)`：
> `Get-Process -Name node | Where-Object { $_.Path -like "*test2*" } | ForEach-Object { Stop-Process -Id $_.Id -Force }`

---

## 2. 目录结构

```
src/
  layouts/Base.astro        全站外壳：head、五层仪器（grain / field / veil / HUD / cursor）、
                            唯一的 rAF 循环、所有 init*()（含开场 preloader、毛片模式、控制台留言）
  components/
    Header.astro  Footer.astro  Cursor.astro  Hud.astro
    Dial.astro               首屏的「节气盘」：24 节气 canvas 表盘，小满钉在正上方，
                             指针指今天，可拖拽/惯性/点小满那盏灯去 About
    Globe.astro              （旧）点阵地球，已从首页移除，留着备用，别再挂回去
    Field.astro              背景等宽乱码数据场（每列独立速度向下流动）
    GhostWord.astro          背景幽灵大字（fitGhost() 按字数估宽）
    WorkRows.astro           旧版作品行，保留备用
  pages/
    index.astro             首页：hero（TUPO_ + 小满 + 签名句）+ PRACTICE 列表 + PIPELINE
    about.astro             自我介绍 + 工具图标墙（public/logos/*.svg）
    contact.astro
    secrets.astro           彩蛋目录（5 个隐藏交互的清单，只给提示不给答案）
    work/index.astro        七个大类的目录
    work/{tiktok,film,game,vfx,ui,identity,poster}.astro   每类一套独立陈列
    work/tiktok/gallery.astro   全屏画布页（滚轮上下平移、移动视差、按住缩小拖拽）
  data/
    categories.ts           大类目录（slug / 中英名 / 件数 / open|soon）
    practice.ts             首页五个方向（含悬停预览图 img）
    tiktok.json             47 条抖音作品
  content/works/*.md        6 件单件作品（详情页 /work/<slug>/）
  styles/global.css         全站样式（≈2600 行，分层写在末尾注释里）
public/
  images/...                webp 图片
  videos/*.mp4              AI Film 三个可播放的视频（960×540，CRF31）
  logos/*.svg               工具与 AI 品牌图标（官方矢量）
```

---

## 3. 设计约定（改动前必须遵守）

1. **底色近黑** `--bg #0c0c0c`；**只有一个强调色** `--accent #2b52ff`（蓝）。`--pin #ff3b1f` 只留给时间码红点。
2. **花活只能进已有的五层**（`.grain` 颗粒 / `.field` 数据场 / `.ghost-word` 幽灵大字 / `.hud` 读数 / `.veil` 切页）。想加新效果，先问它属于哪一层；不属于任何一层就别加。
3. **字体分工**：英文大字用 `var(--font-black)`（Archivo Black）；中文大字用 `var(--font-serif)`（Noto Serif SC 900，首屏名字是**空心描边** `-webkit-text-stroke`）；读数/标签用等宽。
4. **文案分工**：英文是主语气（标题/导航/按钮/读数标签），中文只做第二行解释（`.cn`）。内容层（作品正文、summary）保持中文。
5. **动效纪律**：只动 `transform` / `opacity` / `filter`；缓动统一 `var(--ease)`；`prefers-reduced-motion` 下必须全部关闭；不要 scroll-jacking；入场 ≤ 700ms。
6. **一个 rAF 循环**：逐帧动画都挂在 `Base.astro` 的 `frame()` 里，不要新开 rAF 循环或 pointermove 监听（会叠加泄漏）。
7. **Astro scoped style 只能写在 `<style>` 内**；写在 `</style>` 之后会被当文本解析，报 `Expected "}" but found ":"`。
8. **绝对定位元素量不出文字宽度**：幽灵大字用 `fitGhost()` 按字数估，别用 `scrollWidth`。
9. **首屏入场要等开场黑场散场**：`initHero()` 会等 `ds:preloaded` 事件再起播，别绕开它，否则动画在黑层背后演完。

---

## 4. 反模式（都被真人否过）

- ❌ 卡片网格放大缩略图当"作品集"
- ❌ 把平铺画布和列表做成同一页的视图切换（要独立页面）
- ❌ 滚轮缩放画布（滚轮 = 上下平移）
- ❌ 首屏 sticky 钉住 + 内容全淡出（留一整屏空场）
- ❌ 字母色块代替品牌图标（要官方 SVG）
- ❌ 再画一个"地球 / 大洲 / 城市灯"（那是参考别人的东西，已经换掉了）
- ❌ 自我介绍写"AI 是我的方向"，或写出学校全名

---

## 5. 验证方式

改完必须自己截图核对，不要凭感觉：

```pwsh
& "F:\deepseek\test2\.tooling\node.exe" F:\deepseek\test2\shots\shot.mjs 1440 950 "http://localhost:4321/" out.png viewport
& "F:\deepseek\test2\.tooling\node.exe" F:\deepseek\test2\shots\shot.mjs 1440 950 "http://localhost:4321/" out.png full
```

- 每页看 1440 与 390 两个宽度
- `F:\deepseek\test2\shots\audit.mjs` 跑九个路由，查横向溢出与控制台报错
- 交互类改动用 CDP 派发真实事件再断言 DOM（注意：第一次 `mouseMoved` 不触发 handler，要先发一次"进入"；CDP 鼠标事件有时受焦点影响，可改用 `element.dispatchEvent(new PointerEvent(...))` 验证逻辑）
- 线上核对一律加 `?v=<随机>` 破缓存

---

## 6. 隐藏层（改代码时别踩坏）

五个彩蛋，记录在 `localStorage` 的 `tupo.found`，由 `Base.astro` 的 `markFound()` / `window.dsFound()` 记账，`/secrets` 负责展示进度：

| id | 触发 | 实现位置 |
| --- | --- | --- |
| `console` | 打开控制台 | `initConsoleNote()` |
| `raw` | 连打 `t u p o` | `initRawMode()` → `html.is-raw` |
| `pin` | 点节气盘上小满那盏灯 | `Dial.astro` 的 `hitsPin()` |
| `note` | 点页脚跑马灯 | `initTickerNote()` |
| `tc` | 点 REC 时间码 | `initTimecode()` |

改名字、改快捷键时，`/secrets` 里的提示文案也要同步改。
