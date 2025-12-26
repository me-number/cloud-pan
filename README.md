# 🚀 CloudBLOG - 极简视频博客主题

CloudBLOG 是一款专为 [Jekyll](https://jekyllrb.com) 打造的极简、高性能博客主题，特别针对**视频内容创作者**和创意博主设计。它极致轻量，完美支持移动端阅读。

---

## 📖 目录
- [Jekyll 简介](#-jekyll-简介)
- [核心功能](#-核心功能)
- [适用场景](#-适用场景)
- [快速部署教程](#-快速部署教程)
- [内容发布指南](#-内容发布指南)

---

## 🛠 Jekyll 简介

Jekyll 是一个基于 Ruby 语言开发的开源静态站点生成器（SSG）。
- **专注内容**：支持 Markdown 编写，自动转化为美观的 HTML。
- **Liquid 引擎**：强大的模板语言，灵活渲染动态内容。
- **无缝集成**：与 GitHub Pages 深度绑定，一键部署。
- **高性能**：生成纯静态文件，加载极速，安全性极高。

## ✨ 核心功能

- 📹 **原生视频支持**：内置集成方案，可在页面顶部生成响应式的视频播放区域。
- 🌓 **双色模式切换**：支持 **深色 (Dark)** 和 **浅色 (Light)** 模式，适配 2025 年主流视觉偏好。
- ⚡ **极致轻量**：移除冗余脚本，精简代码结构，确保极致的加载速度与 SEO 表现。
- 📂 **GitHub Pages 优化**：完美兼容，推送到 GitHub 即可自动完成部署与托管。

## 🎯 适用场景

- **创意视频博客**：适合创作者同步视频内容，增加文字描述与搜索权重。
- **个人作品集**：直观展示动态演示视频或项目混剪。
- **极简主义者**：界面纯净，让读者完全聚焦于内容本身。

---

## 🚀 快速部署教程

### 1. 导入仓库
1. 登录 GitHub，点击右上角 **+**，选择 **Import repository**。
2. 在 "Your old repository's clone URL" 输入：`https://github.com/me-number/CloudBLOG.git`。
3. 命名你的新仓库（如 `my-blog`），设为 **Public**，点击 **Begin import**。

### 2. 配置站点信息
在仓库根目录找到 `_data/settings.yml` 文件并编辑：
- **url**: 修改为 `https://<你的用户名>.github.io`
- **baseurl**: 若仓库名为 `my-blog`，则填 `"/my-blog"`；若仓库名直接是 `<用户名>.github.io`，则保持为空 `""`。
- 点击 **Commit changes** 提交。

### 3. 激活 GitHub Actions 部署
1. 进入仓库顶部的 **Settings > Pages**。
2. 在 **Build and deployment > Source** 下，选择 **GitHub Actions**。
3. 点击页面中出现的 **Configure** 按钮（针对 "Deploy Jekyll site to Pages"）。
4. 在跳转后的 `.yml` 编辑页面直接点击右上角 **Commit changes**。

### 4. 查看上线状态
1. 点击仓库顶部的 **Actions** 选项卡，确认最近的任务图标变绿（Success）。
2. 回到 **Settings > Pages**，点击预览链接即可访问你的博客。

---

## 📝 内容发布指南

你无需下载代码，可直接在 GitHub 网页端快速发布：

1. 进入 `_posts` 文件夹。
2. 点击 **Add file > Create new file**。
3. 文件名必须遵循格式：`2025-12-27-hello-world.md`（日期-标题）。
4. **文章配置示例**：
```markdown
---
layout: post
title: "我的第一篇视频博客"
video_id: "这里填写视频ID"
video_type: "youtube"  # 或 vimeo
---
这里开始编写你的文章正文内容...
