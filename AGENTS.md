# AGENTS.md — 给 AI 协作者的上下文

这是一个**个人作品集站点**（Astro 5，纯静态，无框架运行时）。设计语言是「暗场仪器」：近黑底、单一强调色、五层叠加的仪器感。**先读这一页，再动代码。**

---

## 1. 技术栈与运行

- Astro 5（`astro.config.mjs`，`output` 默认静态），部署目标是 GitHub Pages，域名 `https://lin-qing-zrin.github.io`
- 没有任何 UI 框架、没有 GSAP / three.js / Lenis 之外的重依赖（Lenis 已在 `package.json`）
- 字体走 Google Fonts：`Inter Tight` + `Inter` + `JetBrains Mono` + `Noto Sans SC`

```pwsh
# 本机开发（Windows，pnpm 通过独立 node 跑）
$env:PATH = "F:\deepseek\test2\.tooling;" + $env:PATH
& "F:\deepseek\test2\.tooling\node.exe" "<pnpm 路径>" run dev     # http://localhost:4321
& "F:\deepseek\test2\.tooling\node.exe" "<pnpm 路径>" run build   # 静态产物在 dist/
```

> **编辑前必须先停 dev server**，否则 Windows 上会报 `ReplaceFileW EIO (Win32 32)`：
> `Get-Process -Name node | Where-Object { $_.Path -like "*test2*" } | ForEach-Object { Stop-Process -Id $_.Id -Force }`

---

## 2. 目录结构

```
src/
  layouts/Base.astro        全站外壳：head、五层仪器（grain / field / veil / HUD / cursor）、
                            以及唯一的 rAF 渲染循环和各种 init*()
  components/
    Header.astro  Footer.astro  Cursor.astro  Hud.astro
    Globe.astro              canvas 正交投影地球（无 three.js），可拖拽、会自转
    Field.astro              背景等宽乱码数据场
    GhostWord.astro          背景幽灵大字（由 fitGhost() 按字数估宽）
    WorkRows.astro           旧版作品行（分类页已被 gallery/list 取代，保留备用）
  pages/
    index.astro             首页：hero + PRACTICE 列表 + PIPELINE + 预览带
    about.astro             自我介绍 + 工具图标墙（public/logos/*.svg）
    contact.astro
    work/index.astro        七个大类的目录
    work/{tiktok,film,game,vfx,ui,identity,poster}.astro   每个大类一套独立陈列
    work/tiktok/gallery.astro   独立的全屏画布页（滚轮上下平移、移动视差、按住缩小拖拽）
  data/
    categories.ts           大类目录（slug / 中英名 / 件数 / open|soon）
    practice.ts             首页五个方向（含悬停预览图 img）
    tiktok.json             47 条抖音作品（serie / title / src / w / h）
  content/works/*.md        6 件单件作品（详情页 /work/<slug>/）
  styles/global.css         全站样式（≈2300 行，机构分层写在末尾注释里）
public/
  images/{works,film,game,ui,identity,poster,tiktok/}     图片（webp）
  logos/*.svg              工具与 AI 品牌图标（官方矢量）
```

---

## 3. 设计约定（改动前必须遵守）

1. **底色近黑** `--bg #0c0c0c`，**只有一个强调色** `--accent #d7ff3f`，红色 `--pin #ff3b1f` 只给地球针脚和时间码红点。
2. **花活只能进已有的五层**（`.grain` 颗粒 / `.field` 数据场 / `.ghost-word` 幽灵大字 / `.hud` 读数 / `.veil` 切页）。想加新效果，先问它属于哪一层；不属于任何一层就别加。
3. **文案分工**：英文是主语气（标题/导航/按钮/读数标签），中文只做第二行解释（`.cn`）。内容层（作品正文、summary）保持中文。
4. **动效纪律**：只动 `transform` / `opacity` / `filter`；缓动统一 `var(--ease)`（`cubic-bezier(.16,1,.3,1)`）；`prefers-reduced-motion` 下必须全部关闭；不要 `scroll-jacking`，不要超过 700ms 的入场。
5. **一个 rAF 循环**：所有逐帧动画都挂在 `Base.astro` 的 `frame()` 里，不要再开新的 `requestAnimationFrame` 循环或新的 `pointermove` 监听（会叠加泄漏）。
6. **Astro scoped style 只能写在 `<style>` 里**：写在 `</style>` 之后会被当文本解析，报 `Expected "}" but found ":"`。
7. **绝对定位元素量不出文字宽度**：算幽灵大字尺寸请用 `fitGhost()` 的按字数估算，别用 `scrollWidth`。
8. **不要引新依赖**（GSAP / three / framer-motion / tailwind 一律不加）。要效果就手写，代码量 ≤ 80 行/个。

---

## 4. 反模式（上一轮已经被否掉的）

- ❌ 卡片网格放大缩略图当"作品集"（用户明确讨厌）
- ❌ 把平铺画布和列表做成同一页的视图切换（要独立页面）
- ❌ 滚轮缩放画布（用户要滚轮 = 上下平移）
- ❌ 首屏 sticky 钉住 + 内容全淡出（会留一整屏空场）
- ❌ 用字母色块代替品牌图标（用户要求官方图标）
- ❌ 自我介绍里写"AI 是我的方向"这类话；也不要写出学校全名

---

## 5. 验证方式

改完必须自己截图核对，不要凭感觉：

```pwsh
# CDP 截图（Edge 已用 --remote-debugging-port=9222 启动）
& "F:\deepseek\test2\.tooling\node.exe" F:\deepseek\test2\shots\shot.mjs 1440 950 "http://localhost:4321/" out.png viewport
& "F:\deepseek\test2\.tooling\node.exe" F:\deepseek\test2\shots\shot.mjs 1440 950 "http://localhost:4321/" out.png full
```

- 每个页面都要看 1440 宽 + 390 宽两种
- `F:\deepseek\test2\shots\audit.mjs` 会跑九个路由查横向溢出与控制台报错
- 交互类改动要用 CDP 派发真实的 `pointermove` / `wheel` 再断言 DOM 状态（注意：第一次 `mouseMoved` 不会触发 handler，必须先发一次"进入"）
