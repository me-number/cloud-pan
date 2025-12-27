/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift('babel-plugin-react-compiler');
      },
    }),
  ],
  html: {
    title: '张文涛',
    // 修复方案：设置 HTML 的 lang 属性
    // 这将解决 Lighthouse/SEO 检查中的 [lang] 属性缺失问题
    templateParameters: {
      lang: 'zh-CN',
    },
    meta: {
      description: "一位正在努力钻研技术的全栈开发者，在 0 与 1 之间构建梦想!",
    },
  },
  output: {
    // 针对 GitHub Pages 的部署路径优化
    // 如果是 https://<username>.github.io/CloudBLOG/，请确保 assetPrefix 正确
    assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '/',
  },
});

