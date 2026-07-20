---
title: VitePress 使用记录
description: 理解本站的目录、路由和配置方式
---

# VitePress 使用记录

VitePress 会把 Markdown 编译成静态 HTML，并在浏览器中提供快速的页面切换体验。它很适合技术文档和个人知识库。

## 目录约定

```text
docs/
├── .vitepress/
│   ├── config.mts
│   └── theme/
├── index.md
├── guide/
└── notes/
```

- `.vitepress/config.mts`：站点标题、导航、侧边栏和搜索配置。
- `.vitepress/theme/`：对默认主题进行轻量扩展。
- 其他 Markdown 文件：自动成为内容页面。

## 文件路由

| Markdown 文件 | 页面地址 |
| --- | --- |
| `docs/index.md` | `/` |
| `docs/about.md` | `/about` |
| `docs/notes/python/basics.md` | `/notes/python/basics` |

## 常用 Frontmatter

```yaml
---
title: 页面标题
description: 页面摘要
outline: [2, 3]
---
```

首页使用 `layout: home`，并可配置 `hero`、`actions` 和 `features`。

## 本地工作流

```bash
npm run dev      # 启动开发服务器
npm run build    # 生成静态网站并检查链接
npm run preview  # 预览构建结果
```

::: info 构建目录
构建结果默认位于 `docs/.vitepress/dist`，它是生成内容，不需要手动修改。
:::
