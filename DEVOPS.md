# GitHub Pages DevOps 说明

## 1. 目标与范围

本工程只负责自动化部署链路，不新增业务功能。`docs/` 是项目三 VitePress 学习笔记的部署副本，`.github/workflows/deploy-pages.yml` 是核心交付。

完整链路为：

1. `main` 分支发生 `push`，或用户手动触发工作流。
2. GitHub 托管的 Ubuntu Runner 检出仓库。
3. 安装 Node.js 24，并使用 npm 缓存加速后续构建。
4. `npm ci` 严格按照 `package-lock.json` 安装依赖。
5. `npm run build` 将 Markdown 构建到 `docs/.vitepress/dist`。
6. 构建目录被封装为 GitHub Pages Artifact。
7. 独立部署任务通过 OIDC 将 Artifact 发布到 `github-pages` 环境。
8. 部署成功后，网站通过 GitHub Pages 公网地址访问。

## 2. 仓库配置

仓库地址：<https://github.com/Huanghu-H/vitepress-learning-notes>

推荐配置：

- Visibility：Public
- Default branch：`main`
- Settings → Pages → Build and deployment → Source：GitHub Actions
- Settings → Actions → General → Workflow permissions：默认只读即可；工作流使用文件中声明的 Pages 最小权限

如果需要手动确认 Pages 来源：

1. 打开仓库 **Settings**。
2. 选择左侧 **Pages**。
3. 在 **Build and deployment** 的 **Source** 中选择 **GitHub Actions**。

## 3. 密钥与权限

本项目无需创建 Repository Secret。

工作流使用 GitHub 内置凭据：

- `contents: read`：读取仓库源码。
- `pages: write`：创建 GitHub Pages 部署。
- `id-token: write`：获取一次性 OIDC 身份令牌，证明部署来自当前工作流。

`GITHUB_TOKEN` 由 GitHub 为每次任务临时签发，任务结束后失效。不要在 YAML、Markdown 或源码中放置 GitHub 密码和 Personal Access Token。

## 4. 项目三源码对接

项目四初始版本已复制项目三的 `docs/`、`package.json` 和锁文件，并对 `.vitepress/config.mts` 增加 GitHub Pages 子路径处理：

```ts
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS === 'true' && repositoryName
  ? `/${repositoryName}/`
  : '/'
```

因此：

- 本地开发地址仍从 `/` 开始。
- Actions 构建时自动使用 `/vitepress-learning-notes/`。
- CSS、JavaScript、搜索索引和页面链接都能在项目型 Pages 地址下正确加载。

后续更新项目三内容：

```powershell
cd C:\Magus\A3_test\project_04_github_pages_cicd
.\scripts\sync-project3.ps1
npm ci
npm run build
```

同步脚本不会覆盖项目四的 Pages 专用配置。

## 5. 工作流配置说明

工作流文件：`.github/workflows/deploy-pages.yml`

### 触发器

```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
```

- `push`：代码提交到 `main` 后自动运行。
- `workflow_dispatch`：允许在 Actions 页面手动运行，用于演示和排错。

### Build 任务

Build 任务依次执行 checkout、Node 环境安装、`npm ci`、Pages 配置、VitePress 构建和 Artifact 上传。任一步骤失败都会终止流水线，不会发布不完整页面。

### Deploy 任务

Deploy 使用 `needs: build`，只有 Build 成功后才运行。它发布固定名称的 Pages Artifact，并将输出网址登记到 `github-pages` Environment。

### 并发控制

`concurrency.group: github-pages` 保证同一时间只有一条 Pages 发布链路。`cancel-in-progress: false` 避免正在发布的生产版本被新提交中途取消。

## 6. 流水线触发测试

### 自动触发

修改一篇 Markdown：

```powershell
git add docs
git commit -m "docs: verify automatic deployment"
git push
```

随后打开：<https://github.com/Huanghu-H/vitepress-learning-notes/actions>

最新一条 **Deploy VitePress to GitHub Pages** 应依次完成：

```text
Build static site → Deploy to GitHub Pages
```

### 手动触发

```powershell
gh workflow run deploy-pages.yml --repo Huanghu-H/vitepress-learning-notes
```

查看最近运行：

```powershell
gh run list --repo Huanghu-H/vitepress-learning-notes --workflow deploy-pages.yml
```

查看指定运行详情：

```powershell
gh run view RUN_ID --repo Huanghu-H/vitepress-learning-notes
```

## 7. 部署结果查看

流水线成功后可以从三个位置确认：

1. Actions 运行详情中的 `Deploy to GitHub Pages` 为绿色。
2. 仓库首页右侧 **Deployments** 显示 `github-pages` 为 Active。
3. 访问 <https://huanghu-h.github.io/vitepress-learning-notes/>，首页、侧边栏、搜索和深浅色切换正常。

首次开通 Pages 时，部署完成到公网可访问可能存在短暂缓存延迟。

## 8. 常见故障

### npm ci 报锁文件错误

本地修改依赖后先运行 `npm install` 更新 `package-lock.json`，然后同时提交 `package.json` 和锁文件。

### configure-pages 提示 Pages 未启用

进入 Settings → Pages，将 Source 设置为 GitHub Actions，然后重新运行失败任务。

### 页面打开后没有样式或跳转 404

检查 `docs/.vitepress/config.mts` 中是否保留了基于 `GITHUB_REPOSITORY` 的动态 `base`。项目型 Pages 不能始终使用 `/` 作为生产基础路径。

### deploy-pages 权限错误

确认工作流包含 `pages: write` 和 `id-token: write`，部署任务使用 `github-pages` Environment，仓库 Actions 没有被组织策略禁用。

### 查看失败日志

```powershell
gh run list --repo Huanghu-H/vitepress-learning-notes
gh run view RUN_ID --repo Huanghu-H/vitepress-learning-notes --log-failed
```

修复后重新提交即可触发新的自动部署；无需手工上传 `dist`。
