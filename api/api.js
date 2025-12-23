// api/stats.js
export default async function handler(req, res) {
  // 1. 配置信息
  const CONFIG = {
    baseUrl: 'https://umami.zhang-wentao.cn',
    token: 'SoeORJvt3pxNeaiD5cyttdZWAfXNP7SFAB9niQE/HWpOZxUMmK+Nc3pDsG1FODL/kilItut1sysFmvdh5Yp8RJ0NSMeQ+EYiE3OmDXE+xpcDZAYige93byrrqBd+Je0LIibcpE7MsAb/fof7i/xkxjSE/aTOuITIqVs37NkirFgcPQpuJwfcsBR9la3JOgEOiadXwlnoCeMa6BNs/3fPYUelQuCu+WVv31ATa67PE2itHaeQkzBujNPb2UOnwcoO+/hILjQKBKTeU0xaQf6ZY8e0lv36z7hnBMmBa2uh2YxDgvKB3YolpuL0CQ2jlaf2QQvs0tcnYEg8Md+zdqllT1dDoaVTzOd8uucOrzyptTAX8whIA4uDeUu/evCF',
    websiteId: '17d8d22d-5c41-42af-86f0-8475924be01d'
  };

  // 2. 时间配置逻辑 (保持不变)
  const TIME_CONFIGS = {
    today: () => {
      const now = new Date();
      return { start: new Date(now.getFullYear(), now.getMonth(), now.getDate()), end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1), unit: 'hour' };
    },
    yesterday: () => {
      const now = new Date();
      return { start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1), end: new Date(now.getFullYear(), now.getMonth(), now.getDate()), unit: 'day' };
    },
    lastMonth: () => {
      const now = new Date();
      return { start: new Date(now.getFullYear(), now.getMonth() - 1, 1), end: new Date(now.getFullYear(), now.getMonth(), 1), unit: 'month' };
    },
    total: () => ({ start: new Date(2000, 0, 1), end: new Date(), unit: 'year' }),
    now: () => {
      const now = new Date();
      return { start: new Date(now.getTime() - 15 * 60 * 1000), end: now, unit: 'hour' };
    }
  };

  // 3. 内部获取数据函数
  async function fetchStats(timeRange) {
    const config = TIME_CONFIGS[timeRange]();
    const params = new URLSearchParams({
      startAt: Math.floor(config.start.getTime()),
      endAt: Math.floor(config.end.getTime()),
      unit: config.unit
    });
    const url = `${CONFIG.baseUrl}/api/websites/${CONFIG.websiteId}/stats?${params.toString()}`;
    
    try {
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${CONFIG.token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      const extractMetric = (key) => {
        if (timeRange === 'now' && data.comparison?.[key]) return parseInt(data.comparison[key]) || 0;
        if (data[key] !== undefined) return typeof data[key] === 'object' ? (data[key].value || 0) : parseInt(data[key]) || 0;
        return 0;
      };
      return { visits: extractMetric('visits'), pageviews: extractMetric('pageviews') };
    } catch (e) { return { visits: 0, pageviews: 0 }; }
  }

  // 4. 处理跨域与并发请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const timeRanges = ['today', 'yesterday', 'lastMonth', 'total', 'now'];
    const statsResults = await Promise.all(timeRanges.map(range => fetchStats(range)));
    const stats = Object.fromEntries(timeRanges.map((range, i) => [range, statsResults[i]]));

    res.status(200).json({
      today_uv: stats.today.visits,
      today_pv: stats.today.pageviews,
      online_users: stats.now.visits,
      yesterday_uv: stats.yesterday.visits,
      yesterday_pv: stats.yesterday.pageviews,
      last_month_pv: stats.lastMonth.pageviews,
      total_uv: stats.total.visits,
      total_pv: stats.total.pageviews
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
