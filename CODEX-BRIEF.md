# CODEX-BRIEF.md — 交给 Codex 的任务书

> 用法：在 `F:\deepseek\test2\portfolio` 目录里启动 Codex，把下面「任务」整段粘进去。
> 前提：先读同目录的 `AGENTS.md`（项目地图、8 条设计约定、反模式、验证方式）。

---

## 任务

这是一个已经完成度较高的个人作品集站点（Astro 5 + 纯手写 CSS/JS，暗场仪器风格）。**不要重做设计，不要改结构，不要换配色。**

我要你在**不破坏现有语言**的前提下，补 2~3 个"让人没预料到、但不烦人"的交互细节。每一个都必须满足：

1. **发现成本低**：不需要说明文字，用户正常浏览就会撞上。
2. **信息增量**：它让人多知道一件事（进度、来源、结构、时间），而不是纯粹的装饰。
3. **可撤**：出问题能单独 revert 掉，不影响其他部分。
4. **代码量 ≤ 80 行**，不引任何新依赖。
5. 遵守 `AGENTS.md` 第 3 节全部 8 条约定（尤其：只动 transform/opacity/filter、必须尊重 `prefers-reduced-motion`、只允许一个 rAF 循环、scoped style 必须写在 `<style>` 内）。

### 可以碰的地方

- `src/layouts/Base.astro`（五层仪器与唯一的 `frame()` 循环）
- `src/styles/global.css`（末尾追加，不要改动已有规则）
- `src/pages/index.astro`（首屏 / PRACTICE / PIPELINE）
- `src/pages/work/*.astro`（各类目的陈列）
- `src/components/*.astro`

### 不要碰

- `src/content/works/*.md`、`src/data/tiktok.json`、`src/data/practice.ts`、`src/data/categories.ts` 里的**内容数据**（名字、年份、图片路径都是用户核对过的）
- `public/` 里的图片与图标
- `astro.config.mjs` 的 `site` / `base`
- 任何 `package.json` 依赖

### 已经被否掉的方向（别做）

- 卡片网格、大缩略图铺满（用户讨厌"图墙像 PPT"）
- 滚轮缩放画布（要的是滚轮=上下平移）
- 首屏 sticky 钉住 + 内容淡出（会留一整屏空场）
- 用字母/色块替代品牌图标
- 自我介绍里出现"AI 是我的方向"这类表述

### 候选参考（任选，也可以自己想，但要符合上面 5 条）

- 首页地球：点一下把视角转到某个作品实际拍摄/搭建的城市，同时右侧 HUD 的经纬度跟着走字
- 类别目录：鼠标扫过某一行时，左侧序号被"曝光"成一行细密刻度（像取景器的对焦标尺）
- 作品图滚动视差：图片比容器慢 6~10%，出画时轻微去饱和
- PRACTICE 行悬停：进度条式的极细线从行首扫到行尾，暗示这一类的产出量
- 时间码：滚动时帧数加速跳动（已有定格彩蛋，不要动它）

---

## 交付要求

1. **在分支上做**：`git switch -c codex/effects`（不要直接改 main）
2. **一个效果一个 commit**，message 用英文，格式 `<type>: <what>`
3. 每个效果做完，本地必须自测并贴证据：
   ```pwsh
   pnpm run build
   node F:\deepseek\test2\shots\shot.mjs 1440 950 "http://localhost:4321/" out-1440.png viewport
   node F:\deepseek\test2\shots\shot.mjs 390 844 "http://localhost:4321/" out-390.png viewport
   node F:\deepseek\test2\shots\audit.mjs
   ```
   `audit.mjs` 必须输出 `overflow: 0`，且控制台无新增报错。
4. 最后给我一份 `CODEX-NOTES.md`：每个效果 —— 改了什么文件、触发条件、为什么符合"信息增量"、以及你觉得最可能被用户否掉的地方是什么。

## 验收清单（你自己先过一遍）

- [ ] 1440 与 390 两种宽度都不横向溢出
- [ ] 打开 DevTools 的 "Emulate prefers-reduced-motion: reduce"，所有新动效静止且页面可用
- [ ] 连点/快速移动鼠标 30 秒，CPU 不飙、无内存增长（说明没有新开 rAF 或监听器）
- [ ] 首屏、PRACTICE、PIPELINE、七个类目页、About、Contact 全部仍然正常
- [ ] `pnpm run build` 通过，19 个页面全部生成
