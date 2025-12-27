/**
 * 2025 Next.js GitHub Pages 部署配置
 */

// 1. 自动跳过 T3 Stack 的环境变量验证，防止 CI 构建因缺少生产环境 Key 而失败
process.env.SKIP_ENV_VALIDATION = 'true';

await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  // 2. [关键] 开启静态导出模式
  // 这会让 pnpm build 生成一个包含 HTML/CSS/JS 的 'out' 目录
  output: 'export',

  // 3. [关键] 禁用图片优化服务器
  // GitHub Pages 是纯静态托管，不支持 Next.js 的动态图片缩放功能
  images: {
    unoptimized: true,
  },

  // 4. [可选] 路径适配
  // 如果你的 URL 是 https://<username>.github.io/<repo-name>/
  // 则取消下方注释并填写你的仓库名
  // basePath: '/CloudBLOG',

  // 5. 保持你原有的配置
  env: {},
  
  // 6. 建议：对于静态站点，禁用压缩以交给托管方（如 Cloudflare）处理
  compress: false,
};

export default config;

