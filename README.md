# 项目四：VitePress + GitHub Pages 自动化部署

[![Deploy VitePress to GitHub Pages](https://github.com/Huanghu-H/vitepress-learning-notes/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Huanghu-H/vitepress-learning-notes/actions/workflows/deploy-pages.yml)

本项目复用项目三的 VitePress 学习笔记源码，通过 GitHub Actions 完成依赖安装、静态构建、产物上传和 GitHub Pages 发布。每次向 `main` 分支推送代码都会自动触发，无需手工上传构建结果。

- GitHub 仓库：<https://github.com/Huanghu-H/vitepress-learning-notes>
- Pages 网站：<https://huanghu-h.github.io/vitepress-learning-notes/>
- Actions 流水线：<https://github.com/Huanghu-H/vitepress-learning-notes/actions>
- 详细 DevOps 说明：[DEVOPS.md](./DEVOPS.md)

## 自动化流程

```mermaid
flowchart LR
    A[推送 main] --> B[GitHub Actions]
    B --> C[npm ci]
    C --> D[VitePress 构建]
    D --> E[上传 Pages Artifact]
    E --> F[部署 GitHub Pages]
    F --> G[公网访问]
```

## 本地验证

要求 Node.js 24 或以上版本：

```powershell
cd C:\Magus\A3_test\project_04_github_pages_cicd
npm ci
npm run build
npm run preview
```

## 触发部署

修改任意文档并推送到 `main`：

```powershell
git add docs
git commit -m "docs: update learning notes"
git push
```

也可以在仓库的 **Actions** 页面选择 **Deploy VitePress to GitHub Pages**，点击 **Run workflow** 手动触发。

## 项目三内容同步

本地同时保留项目三时，可运行：

```powershell
.\scripts\sync-project3.ps1
```

脚本只同步 Markdown 内容和主题，不覆盖项目四中负责 GitHub Pages 子路径的 `config.mts`。同步后执行本地构建，再提交推送。

## 关键文件

```text
project_04_github_pages_cicd/
├── .github/workflows/deploy-pages.yml # 完整 CI/CD 流水线
├── docs/                              # 项目三 VitePress 源码
├── scripts/sync-project3.ps1          # 项目三内容同步脚本
├── package.json                       # 依赖和构建命令
├── package-lock.json                  # CI 锁定依赖版本
├── DEVOPS.md                          # 配置、测试和排错说明
└── README.md                          # 快速使用说明
```

## 安全说明

流水线使用 GitHub 自动签发的 `GITHUB_TOKEN` 和 OIDC 身份令牌，不需要配置账号密码、Bot Token 或 Personal Access Token。不要把任何凭据写入仓库或 Actions 文件。
