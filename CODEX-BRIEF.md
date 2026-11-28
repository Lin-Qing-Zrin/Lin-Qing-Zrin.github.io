# CODEX-BRIEF.md — 交给 Codex 的任务书

> 用法：在 `F:\deepseek\test2\portfolio` 目录里启动 Codex，把下面「粘贴区」整段给它。
> 前提：它必须先读同目录的 `AGENTS.md`（项目地图、9 条设计约定、反模式、验证方式、隐藏层）。

---

## 粘贴区（从这里开始复制）

你在 `F:\deepseek\test2\portfolio`：一个已经上线、完成度较高的个人作品集站点（Astro 5，纯静态，纯手写 CSS/JS，暗场仪器风格）。

**先做两件事，再动任何代码：**
1. 完整读 `AGENTS.md`，按里面 9 条设计约定工作。
2. `git status` 确认工作区干净；然后 `git switch -c codex/<今天的日期>` 开一个分支。**不要直接提交到 main，不要 push**（推 main 会自动部署到线上）。

### 本轮任务

在不改变整体设计语言、不重做结构、不换配色的前提下，做 **2~3 个**能让站点"更像一件作品"的改进。每个都必须满足：

1. **有信息增量**：让人多知道一件事（时间、来源、结构、进度、状态），不是纯装饰。
2. **不打扰**：正常浏览不会被迫等待，不需要读说明文字才懂。
3. **可单独 revert**：一个效果对应一个 commit，标题用英文 conventional commit（`feat: …` / `polish: …` / `fix: …`）。
4. **代码量 ≤ 80 行/个**，不引任何新依赖（不许装 GSAP / three / tailwind）。
5. 遵守 `AGENTS.md` 全部约定，尤其：只动 `transform`/`opacity`/`filter`；必须尊重 `prefers-reduced-motion`；**只允许一个 rAF 循环**（挂在 `Base.astro` 的 `frame()` 里）；Astro scoped style 只能写在 `<style>` 内。

### 候选方向（挑 2~3 个，也可以提你自己的）

- **节气盘的"今天"更明确**：指针末端加一个极小的日期标签（如 `11.22`），或让小满那盏灯的呼吸与今日节气的亮度形成对比。
- **首屏数据行的第四个读数**：目前是 LOCAL / ZONE / LONGITUDE / SOLAR TERM，可以加一个"距下个节气 N 天"的倒数（纯前端算，不联网）。
- **图片的"片门"**：作品图片 hover 时四角出现 1px 裁切标（`.gate` 已有雏形，可统一到分类页的图墙）。
- **键盘可达性**：`/work/` 分类行支持 `↑ ↓ Enter` 键盘导航，并在 HUD 里显示当前选中项。
- **空状态**：分类里没有作品时，给一句像人写的空状态文案（不要 "Coming soon"）。

### 不要碰

- `src/content/works/*.md`、`src/data/tiktok.json`、`src/data/practice.ts`、`src/data/categories.ts` 里的**内容数据**（作品名、年份、图片路径都是人工核对过的）
- `public/` 里的图片、视频、图标
- `astro.config.mjs` 的 `site` / `base` / `build.inlineStylesheets`（最后一个必须是 `'always'`）
- `package.json` 依赖
- `AGENTS.md` 第 6 节的五个彩蛋逻辑（`initConsoleNote` / `initRawMode` / `hitsPin` / `initTickerNote` / `initTimecode`）

### 已被真人否掉的方向（别做）

- 卡片网格、大缩略图铺满（"像 PPT"）
- 滚轮缩放画布（滚轮 = 上下平移）
- 首屏 sticky 钉住 + 内容淡出（留一整屏空场）
- 用字母/色块替代品牌图标
- **再画一个地球 / 大洲 / 城市灯**（原来那个是参考别人的，已经换成节气盘了）

### 每个改动都要自检

```pwsh
$env:PATH = "F:\deepseek\test2\.tooling;" + $env:PATH
& "F:\deepseek\test2\.tooling\node.exe" "<pnpm 路径>" run build        # 必须 20 页全过
```

- 截图 1440 与 390 两种宽度，自己看一眼（`shots/shot.mjs`，用法见 AGENTS.md 第 5 节）
- `prefers-reduced-motion: reduce` 下必须是静止且可用的
- 不要留 `console.log`

### 交付

- 每个效果一个 commit；分支上完成后，把分支名和「每个 commit 做了什么、怎么验证的」写成 `CODEX-NOTES.md`（不要动 README）
- **不要 push、不要合并**。停下来等 review。

## 粘贴区结束

---

## 给站长（Tupo_小满）的操作流程

1. 让 Codex 在 `F:\deepseek\test2\portfolio` 里按上面那份做完（它会开分支、不推）。
2. 做完后告诉他「我看一下」，然后把这些发给我：
   ```pwsh
   cd F:\deepseek\test2\portfolio
   & "C:\Program Files\Git\cmd\git.exe" log --oneline main..codex/<日期>
   & "C:\Program Files\Git\cmd\git.exe" diff main..codex/<日期>
   ```
3. 我负责：跑构建、截图、溢出与控制台检查，逐个效果判断留还是不留，然后合并 + 推送。
4. 合并后线上 1~2 分钟自动更新。
