---
title: Git 常用工作流
description: 个人项目中查看、提交和同步代码的基础步骤
---

# Git 常用工作流

## 开始工作前

```bash
git status
git pull --ff-only
```

先确认当前分支和未提交修改，再同步远端更新。`--ff-only` 可以避免意外产生合并提交。

## 查看修改

```bash
git status --short
git diff
git diff --staged
```

| 命令 | 查看内容 |
| --- | --- |
| `git diff` | 尚未暂存的修改 |
| `git diff --staged` | 已暂存、将进入提交的修改 |
| `git log --oneline -10` | 最近 10 次提交 |

## 创建提交

```bash
git add docs/notes/python/basics.md
git commit -m "docs: update Python basics notes"
```

提交信息应描述修改目的。只暂存本次工作相关文件，避免把无关改动混在同一提交里。

## 临时分支

```bash
git switch -c notes/add-asyncio
# 完成并提交修改
git switch main
```

::: warning 删除前先确认
删除分支、丢弃修改和强制推送都可能导致数据丢失。执行前应确认目标，并确保重要工作已经提交或备份。
:::
