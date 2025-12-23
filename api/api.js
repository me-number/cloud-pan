/**
 * Umami 统计数据转发器 - Vercel 版
 * 适配 2025 年最新 Node.js ESM 环境
 */

export default async function handler(req, res) {
  // Cloudflare Worker for Umami Statistics
// 网站名称: CloudBLOG (zhang-wentao.cn)
// 网站ID: 17d8d22d-5c41-42af-86f0-8475924be01d
// 生成时间: 2025/12/21 21:13:39

const CONFIG = {
  baseUrl: 'https://umami.zhang-wentao.cn',
  token: 'SoeORJvt3pxNeaiD5cyttdZWAfXNP7SFAB9niQE/HWpOZxUMmK+Nc3pDsG1FODL/kilItut1sysFmvdh5Yp8RJ0NSMeQ+EYiE3OmDXE+xpcDZAYige93byrrqBd+Je0LIibcpE7MsAb/fof7i/xkxjSE/aTOuITIqVs37NkirFgcPQpuJwfcsBR9la3JOgEOiadXwlnoCeMa6BNs/3fPYUelQuCu+WVv31ATa67PE2itHaeQkzBujNPb2UOnwcoO+/hILjQKBKTeU0xaQf6ZY8e0lv36z7hnBMmBa2uh2YxDgvKB3YolpuL0CQ2jlaf2QQvs0tcnYEg8Md+zdqllT1dDoaVTzOd8uucOrzyptTAX8whIA4uDeUu/evCF',
  websiteId: '17d8d22d-5c41-42af-86f0-8475924be01d'
};

// 时间范围配置
const TIME_CONFIGS = {
  today: () => {
    const now = new Date();
    return {
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      unit: 'hour'
    };
  },
  yesterday: () => {
    const now = new Date();
    return {
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      unit: 'day'
    };
  },
  lastMonth: () => {
    const now = new Date();
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      end: new Date(now.getFullYear(), now.getMonth(), 1),
      unit: 'month'
    };
  },
  total: () => {
    return {
      start: new Date(2000, 0, 1),
      end: new Date(),
      unit: 'year'
    };
  },
  now: () => {
    const now = new Date();
    return {
      start: new Date(now.getTime() - 15 * 60 * 1000), // 最近15分钟
      end: now,
      unit: 'hour'
    };
  }
};

// 获取统计数据
async function fetchStats(timeRange) {
  const config = TIME_CONFIGS[timeRange]();
  if (!config) return { visits: 0, pageviews: 0 };
  
  const params = new URLSearchParams({
    startAt: Math.floor(config.start.getTime()),
    endAt: Math.floor(config.end.getTime()),
    unit: config.unit
  });
  
  const url = CONFIG.baseUrl + '/api/websites/' + CONFIG.websiteId + '/stats?' + params.toString();
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + CONFIG.token,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('HTTP错误！状态码: ' + response.status);
    }
    
    const data = await response.json();
    
    // 提取访问数据（兼容不同API返回格式）
    const extractMetric = (key) => {
      // 对于实时数据，特殊处理：即使主数据字段为0，也检查comparison字段
      if (timeRange === 'now' && data.comparison?.[key]) {
        const comparisonValue = parseInt(data.comparison[key]) || 0;
        if (comparisonValue > 0) {
          return comparisonValue;
        }
      }
      
      // 主数据字段
      if (data[key] !== undefined && data[key] !== null) {
        return typeof data[key] === 'object' ? (data[key].value || data[key].count || 0) : parseInt(data[key]) || 0;
      }
      
      // 指标字段
      if (data.metrics?.[key]) {
        return data.metrics[key].value || data.metrics[key].count || 0;
      }
      
      // 比较数据字段
      if (data.comparison?.[key]) {
        return parseInt(data.comparison[key]) || 0;
      }
      
      return 0;
    };
    
    return {
      visits: extractMetric('visits'),
      pageviews: extractMetric('pageviews')
    };
  } catch (error) {
    console.error('获取统计数据失败: ' + error.message);
    return { visits: 0, pageviews: 0 };
  }
}

// 处理请求
async function handleRequest(request) {
  try {
    // 设置CORS头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
    };
    
    // 处理OPTIONS请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // 并行获取所有统计数据
    const timeRanges = ['today', 'yesterday', 'lastMonth', 'total', 'now'];
    const statsData = await Promise.all(timeRanges.map(range => fetchStats(range)));
    
    // 构建统计数据对象
    const stats = Object.fromEntries(timeRanges.map((range, index) => [range, statsData[index]]));
    
    // 返回统计数据
    const responseData = {
      today_uv: stats.today.visits,
      today_pv: stats.today.pageviews,
      online_users: stats.now.visits,
      yesterday_uv: stats.yesterday.visits,
      yesterday_pv: stats.yesterday.pageviews,
      last_month_pv: stats.lastMonth.pageviews,
      total_uv: stats.total.visits,
      total_pv: stats.total.pageviews
    };
    
    return new Response(JSON.stringify(responseData), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// 注册事件监听器
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
}
