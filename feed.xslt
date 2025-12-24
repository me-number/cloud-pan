---
layout: none
---
<?xml version="1.0" encoding="utf-8"?>
<!-- 1. 修正命名空间 URL -->
<xsl:stylesheet version="1.0" 
    xmlns:xsl="www.w3.org"
    xmlns:atom="www.w3.org">
  <xsl:output method="html" encoding="utf-8" indent="yes" />
  
  <xsl:template match="/">
    <html lang="zh-CN">
    <head>
      <meta charset="utf-8" />
      <title>RSS Feed - {{ site.title }}</title>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; background: #f9f9f9; }
        .container { background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        h1 { color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .item { border-bottom: 1px solid #eee; padding: 20px 0; }
        .item:last-child { border: none; }
        h2 { margin: 0 0 10px 0; font-size: 1.4em; }
        a { color: #3498db; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
        .meta { font-size: 0.85em; color: #888; margin-bottom: 10px; }
        .summary { color: #555; font-size: 0.95em; }
        .notice { background: #eef7fd; border-left: 4px solid #3498db; padding: 15px; margin-bottom: 30px; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>{{ site.title }}</h1>
        <div class="notice">
          这是本站的 <strong>RSS 订阅源</strong>。请将浏览器地址栏中的 URL 复制到你的阅读器（如 Feedly, Reeder, NetNewsWire）中即可完成订阅。
        </div>

        <!-- 2. 修改匹配路径：适配 RSS 2.0 的结构 /rss/channel/item -->
        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <h2>
              <a href="{link}" target="_blank">
                <xsl:value-of select="title" />
              </a>
            </h2>
            <div class="meta">
              <!-- 截取 RSS 格式日期 (Mon, 25 Dec 2025 ...) 的日期部分 -->
              发布于：<xsl:value-of select="substring(pubDate, 5, 12)" />
            </div>
            <div class="summary">
              <!-- 3. 开启转义，允许显示摘要中的 HTML 格式 -->
              <xsl:value-of select="description" disable-output-escaping="yes" />
            </div>
          </div>
        </xsl:for-each>
      </div>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
