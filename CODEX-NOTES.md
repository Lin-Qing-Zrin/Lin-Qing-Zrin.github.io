# Codex 本轮改进与自检

- 分支：`codex/2026-11-27`（11 月 27 日开工，11 月 28 日完成）。
- 基线：`d5ff7ee4cafa6108ecf14ebd91b9b3d671f4d761`；main 保持在该提交。
- 已完整阅读 AGENTS.md、CODEX-BRIEF.md；本轮完成两个效果，各自独立提交。未 push、未合并，等待 review。

## 1. 节气盘日期读数

`2021bc1` — `feat: show the Shanghai calendar date on the solar dial`

- 在原有盘面说明行增加 `MM.DD` 日期，不新增装饰层或布局。
- 日期采用 Asia/Shanghai（UTC+08:00），与站点 Local / Zone 时钟一致；`time` 元素保留完整日期和可访问标签。
- 复用 initClock 的现有刷新，不增加计时器、rAF、pointermove 或入场动画。
- 范围：src/components/Dial.astro、src/layouts/Base.astro；10 行新增、1 行删除。
- 自检：本项单独构建 20 页通过；1440、390 截图已目视核对；CDP 将浏览器时区设为 America/Denver，确认日期仍与上海时区一致。两种宽度 × reduce/no-preference 四组断言通过，首页无横向溢出；Astro 页面返回后日期可用。
- 取舍：日期放在现有说明行，不跟随旋转指针运动；在移动端与 reduced-motion 下保持稳定可读。

## 2. 作品分类键盘导航与 HUD

`6a27b3a` — `feat: add keyboard category navigation with HUD feedback`

- 焦点在 /work/ 分类链接内时支持 ↑ / ↓；Home / End 到首尾，首尾不循环。
- 保留原生 Tab、Enter 和链接语义；带 Alt/Ctrl/Meta/Shift 的组合键不接管；仅收集有 href 且非 aria-disabled 的链接。
- HUD 显示焦点分类的编号 / 英文名称 / 件数。焦点离开目录时清空，页面切换后重新绑定，并用节点标记防止重复绑定。
- 通过 opacity 区分选中项，保留浏览器原生焦点轮廓。键盘反馈即时；reduced-motion 下标题和 HUD 无 transform 运动、无过渡。
- 沿用现有移动端隐藏 HUD 的设计；手机宽度仍保留焦点轮廓和全部键盘行为。
- 范围：src/layouts/Base.astro、src/styles/global.css；40 行新增、1 行删除，包含原 CSS 文件尾换行修正，低于 80 行上限。
- 自检：本项构建和最终修正后构建均为 20 页通过。CDP 真实按键覆盖方向键、首尾边界、Home/End、Tab、Enter 跳转、HUD 清理、Astro 往返后再次导航；1440/390 × reduce/no-preference 四组通过，运行时异常为 0。断言分类焦点和 HUD 的 transitionDuration 为 0s；reduce 下标题 transform 为 none。

## 共用自检与证据

- 现有 shots/audit.mjs 的九个路由在 1440 宽度检查通过；同脚本仅改设备尺寸的副本在 390 宽度通过。所有路由横向溢出为 0，控制台错误为 none。
- 首页与分类页两种宽度、两种动态偏好均有截图；分类页另补拍入场动画结束后的焦点状态并目视核对。
- `git diff --check` 通过；变更仅涉及上述三个源码文件和本说明。
- public/、src/content/、src/data/、astro.config.mjs、package.json、pnpm-lock.yaml、README、五个彩蛋逻辑均未修改；没有新依赖、新 rAF 或 pointermove 监听，没有新增 console.log。
- 构建使用现有 Node 与 pnpm，预览使用 Astro preview；编辑期间没有运行 dev server。

证据保存在仓库外：`F:\codex\前端UI\outputs\portfolio-review-2026-11-27\`。

| 文件 | 用途 |
| --- | --- |
| build-final.txt | 最终 20 页构建日志 |
| date-checks.json | 第一项四组日期断言 |
| interaction-checks.json | 最终四组交互、日期和异常结果 |
| audit-1440.txt / audit-390.txt | 九路由溢出与控制台检查 |
| date-home-1440.png / date-home-390.png | 第一项桌面与手机完整页面截图 |
| home-1440-reduce.png / home-390-reduce.png | 最终首页静态模式截图 |
| work-1440-reduce.png / work-390-reduce.png | 分类焦点静态模式截图 |
| work-settled-1440.png / work-settled-390.png | 正常模式入场结束后截图 |
| verify.mjs | 无依赖 CDP 交互复测脚本 |

复现构建：

```powershell
cd F:\deepseek\test2\portfolio
$env:PATH = 'F:\deepseek\test2\.tooling;' + $env:PATH
& 'F:\deepseek\test2\.tooling\node.exe' 'C:\Users\liuqi\AppData\Roaming\npm\node_modules\pnpm\bin\pnpm.cjs' run build
```

复现交互需要本机静态预览 4321 端口、隔离的 Chromium CDP 9222 端口；运行证据目录下 verify.mjs。不要同时运行其它切换标签页的审计：第一次并行复测曾因测试标签页后台化触发浏览器 Document hidden 的 View Transition 错误。独占前台后全部通过。脚本等待实际初始化，并使用 clientWidth 排除系统滚动条宽度。

## 已有问题与验证边界

- 原代码并非文档描述的单一 rAF：Base 的 Lenis、Dial 与首页效果均存在独立循环；本轮未新增或重构它们。
- 原节气名称基于固定月日表，且盘面使用浏览器本地日期；原首页 Solar term 事件与 Astro 路由生命周期存在读数不同步迹象（盘面“小雪”，数据行“小满”）。本轮只增加明确的 UTC+08 日期读数，没有改动原节气算法、旋转逻辑和事件链。
- 全站 reduced-motion 的旧逻辑未做全面重构；验证结论限于本轮新增功能静止且可用，不代表全站所有历史动效已完成审计。
- 九路由脚本仅等待固定 1.7 秒，旧桌面日志的首页时钟曾尚为占位符；最终功能测试等待初始化后日期/时钟链路可用。
- 未做真机或真人测试；没有访问线上部署或触发发布。

本说明另作 docs 提交，便于两个效果分别 revert。停止在当前分支，交由站长 review。
