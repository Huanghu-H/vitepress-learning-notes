---
title: 终端速查表
description: PowerShell 常用目录和文件操作命令
---

# 终端速查表

## 目录操作

```powershell
Get-Location                         # 当前目录
Get-ChildItem -Force                # 列出文件，包括隐藏文件
Set-Location C:\path\to\project     # 切换目录
New-Item -ItemType Directory notes  # 创建目录
```

## 查找内容

```powershell
Get-ChildItem -Recurse -Filter *.md
Select-String -Path .\docs\*.md -Pattern 'VitePress'
```

如果已经安装 ripgrep，可以更快地搜索：

```powershell
rg "VitePress" docs
rg --files docs
```

## 查看进程与端口

```powershell
Get-Process node
Get-NetTCPConnection -LocalPort 5173
```

## npm 项目

```powershell
npm install
npm run dev
npm run build
```

::: tip 命令帮助
PowerShell 可以通过 `Get-Help 命令名称 -Examples` 查看示例，例如 `Get-Help Get-ChildItem -Examples`。
:::
