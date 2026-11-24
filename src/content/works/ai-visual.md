---
title: 共生 Symbiosis — AI 视觉实验
category: AI Visual
year: 2023
cover: /images/works/ai-visual.svg
ratio: "16:10"
tools: ["ComfyUI", "Stable Diffusion", "Photoshop"]
role: Concept · Prompt · Post
summary: 一组共 12 张的 AI 生成视觉实验，探索同一角色在不同材质与光线下的风格一致性。
order: 3
---

用 ComfyUI 搭的一条简化生产管线：**参考图 → 角色一致性 → 材质替换 → 批量出图 → 人工筛选修图**。

## 我解决的问题

AI 出图最容易崩的地方是"一致性"。我的做法是先锁定一张基准图，用 IP-Adapter + 固定 seed 区间控制面部，再用 ControlNet 的 depth 锁定姿态，材质则靠 prompt 分段替换。12 张里最终留下 8 张，其余进废片库。

## 学到什么

- 一致性 80% 靠输入控制，20% 靠 prompt
- 批量出图的瓶颈不在生成，在**筛选**：200 张里能用的通常 6–10 张
- 后期修图只修结构错误，不修风格——一修就露馅
