/* =========================================================
   内容数据 —— 这是你最常编辑的文件 ✏️
   ---------------------------------------------------------
   所有网站内容都放在 window.PORTFOLIO_DATA 里。
   双击 index.html 即可读取，无需任何服务器或构建步骤。

   想替换成你自己的内容？
   · 摄影作品  → 改 photos 数组
   · 小插件    → 改 plugins 数组
   · 公众号文章 → 改 articles 数组（按时间倒序，date 用 YYYY-MM-DD）
   · 关于我    → 改 about 对象
   具体字段含义见每个数组上方的注释。
   ========================================================= */

window.PORTFOLIO_DATA = {
  /* 站点级信息（顶部品牌名、hero 区、页脚） */
  site: {
    name: "hp的小屋",
    title: "摄影 / 写作 / 小工具",
    bio: "这里收集我的摄影作品、写过的小工具，以及平时记录的一些文字与想法。随手捕捉光线，也偶尔写代码。",
    footer: "用纯 HTML/CSS/JS 打造 · 无框架 · 加载飞快"
  },

  /* ---------------------------------------------------------
     1) 摄影作品（画廊网格，点击可灯箱预览）
     · title       : 照片标题
     · description : 简短说明
     · location    : 拍摄地点（可选，留空不显示）
     · date        : 拍摄日期 YYYY-MM-DD（可选）
     · src         : 图片路径
     —— 想加照片？在数组里加一个对象即可。
  --------------------------------------------------------- */
  photos: [
    {
      id: "ph1",
      title: "蚕",
      description: "木桌上的两只蚕，纹理与光影的安静瞬间。",
      location: "",
      date: "2026-07-09",
      src: "assets/photography/silkworms.jpg"
    },
    {
      id: "ph2",
      title: "晚霞",
      description: "湖边日落，建筑剪影与水面倒影。",
      location: "镇江",
      date: "2026-07-09",
      src: "assets/photography/sunset.jpg"
    }
  ],

  /* ---------------------------------------------------------
     2) 小插件 / 工具
     · demoUrl     : 在线演示或下载地址
     · previewType : "link"   → 按钮新标签打开（最稳，默认）
                      "iframe" → 卡片内联预览（站点拒绝嵌入时自动降级）
     · scenarios   : 使用场景说明
  --------------------------------------------------------- */
  plugins: [
    {
      id: "pl1",
      name: "Markdown 表格生成器",
      description: "粘贴 CSV，立刻得到 Markdown 表格代码，一键复制。",
      scenarios: "写技术文档、公众号排版、GitHub README 时快速生成表格。",
      demoUrl: "https://example.com/tools/md-table",
      previewType: "link",
      screenshot: "assets/plugins/md-table.png"
    },
    {
      id: "pl2",
      name: "JSON 美化 / 压缩",
      description: "实时格式化与压缩 JSON，支持折叠与路径高亮。",
      scenarios: "调试接口返回、阅读配置文件、比对差异时非常顺手。",
      demoUrl: "https://example.com/tools/json",
      previewType: "iframe",
      screenshot: "assets/plugins/json.png"
    },
    {
      id: "pl3",
      name: "二维码生成器",
      description: "输入文字或链接，实时生成可下载的二维码。",
      scenarios: "做海报、分享 Wi-Fi、活动打卡等需要快速出码的场景。",
      demoUrl: "https://example.com/tools/qrcode",
      previewType: "link",
      screenshot: "assets/plugins/qrcode.png"
    },
    {
      id: "pl4",
      name: "色板提取器",
      description: "上传图片自动提取主色调，导出为 CSS 变量。",
      scenarios: "做网页配色、设计稿还原、品牌色整理时省时省力。",
      demoUrl: "https://example.com/tools/palette",
      previewType: "iframe",
      screenshot: "assets/plugins/palette.png"
    }
  ],

  /* ---------------------------------------------------------
     3) 公众号文章（手动导入，按 time 倒序展示）
     · title   : 标题
     · summary : 摘要（最多显示两行）
     · date    : 发布日期 YYYY-MM-DD
     · url     : 原文链接（点击整卡跳转）
     —— 想加文章？在数组最前面加一个对象即可。
  --------------------------------------------------------- */
  articles: [
    {
      id: "a-baijiu",
      title: "中国白酒市场十年演变与全球高档酿造酒格局研究",
      summary: "十年量价演变（产量降约74%、CR6 利润占86%）、六档价格带分层，以及全球800元以上高档酿造酒格局的对照研究，附数据缺口与口径说明。",
      date: "2026-07-11",
      url: "articles/2026-07-11-baijiu.html"
    },
    {
      id: "a0o",
      title: "光收发模块行业周报 ｜ 2026.07.01–07.10",
      summary: "AI 算力基建驱动需求高景气，板块高位震荡、估值分化加剧。本周聚焦 800G/1.6T 迭代、硅光与 CPO 技术进展，以及「易中天」资金大进大出与光迅科技涨停。",
      date: "2026-07-10",
      url: "articles/2026-07-10.html"
    },
    {
      id: "a0",
      title: "AI 周报 ｜ 2026.07.02–07.09",
      summary: "本周 AI 圈主线：从「能力秀肌肉」转向「把能力真正用起来」。国产算力跑通开源基础模型、推理芯片融资创新高、人形机器人冲刺 A 股、头部厂商集体强化 Agent。",
      date: "2026-07-09",
      url: "articles/2026-07-09.html"
    },
    {
      id: "a0b",
      title: "篮球周报 ｜ 2026.07.01–07.09",
      summary: "休赛期比赛季还热闹：CBA 杜锋离任、同曦甩卖主力；NBA 字母哥改换门庭、詹姆斯去向成谜，中美两侧权力版图同步重塑。",
      date: "2026-07-09",
      url: "articles/2026-07-09-basketball.html"
    },
    {
      id: "a0z",
      title: "《塞尔达传说》最新动态汇总 ｜ 近 1 个月",
      summary: "时之笛重制版官宣登陆 Switch 2、旷野之息史低、ZELDA NOTES 联动、无双封印战记更新——10 条动态带可靠性标注。",
      date: "2026-07-09",
      url: "articles/2026-07-09-zelda.html"
    },
    {
      id: "a1",
      title: "我是如何用周末写出一个剪贴板工具",
      summary: "从「复制又丢」的痛点出发，记录 ClipMaster 从想法到上线的全过程，附性能优化与打包踩坑。",
      date: "2026-06-28",
      url: "https://mp.weixin.qq.com/s/example1"
    },
    {
      id: "a2",
      title: "纯静态个人网站，为什么我选择零框架",
      summary: "聊聊为什么放弃 React，回归原生 HTML/CSS/JS，以及它带来的加载速度与可维护性红利。",
      date: "2026-05-15",
      url: "https://mp.weixin.qq.com/s/example2"
    },
    {
      id: "a3",
      title: "把重复劳动交给脚本：我的 5 个提效小工具",
      summary: "盘点日常高频重复操作，以及如何用几行脚本把它们彻底自动化，每天省下半小时。",
      date: "2026-04-02",
      url: "https://mp.weixin.qq.com/s/example3"
    },
    {
      id: "a4",
      title: "前端也要懂一点的色彩理论",
      summary: "从对比度、饱和度到色彩心理学，帮你的界面既好看又读得清楚。",
      date: "2026-02-19",
      url: "https://mp.weixin.qq.com/s/example4"
    },
    {
      id: "a5",
      title: "独立开发者的第一年的 7 个教训",
      summary: "关于专注、发布、反馈与坚持——一些没人告诉你但很重要的真实体会。",
      date: "2025-12-30",
      url: "https://mp.weixin.qq.com/s/example5"
    }
  ],

  /* ---------------------------------------------------------
     4) 关于我 / 联系方式
     · bio        : 个人介绍（支持多段，用数组，每段一个字符串）
     · contacts   : 邮箱 / GitHub / 公众号名
     · qr         : 公众号二维码图片路径（缺失自动占位）
  --------------------------------------------------------- */
  about: {
    bio: [
      "你好，我是一名独立开发者，平时喜欢把重复的劳动自动化，也爱捣鼓各种小而美的桌面工具。",
      "比起宏大的系统，我更着迷于「解决一个具体的小麻烦」——哪怕只是让复制粘贴更顺手一点。",
      "业余时间我会把踩过的坑、学到的小技巧写成公众号文章，希望也能帮到你。"
    ],
    contacts: {
      email: "hello@example.com",
      github: "https://github.com/example",
      wechatOfficial: "hp的小屋"
    },
    qr: "assets/qr/official-account.png"
  }
};
