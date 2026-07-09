# 个人作品集网站

一个**纯 HTML / CSS / JS** 打造的个人作品展示站，零框架、零构建、零依赖。
双击 `index.html` 即可打开，也可以丢到任意静态空间托管。

## 目录结构

```
.
├── index.html          # 页面骨架（导航 + 4 个板块 + 引入样式/脚本）
├── css/styles.css     # 全部样式（主题变量、响应式、明/暗主题）
├── js/
│   ├── data.js        # ★ 你最常改的文件：所有内容都在这里
│   └── app.js        # 渲染与交互逻辑（一般不用动）
├── assets/
│   ├── photography/   # 摄影作品原图
│   ├── plugins/       # 插件预览图
│   ├── charts/        # 文章内嵌图表
│   └── qr/            # 公众号二维码
└── README.md          # 本文件
```

## 怎么看效果

- **最简单**：直接双击 `index.html`。
- **本地服务器**（推荐，行为更接近线上）：在目录里执行
  ```bash
  python3 -m http.server 8000
  ```
  然后浏览器打开 `http://localhost:8000`。

## 怎么换成你自己的内容

所有内容都在 **`js/data.js`** 的 `window.PORTFOLIO_DATA` 里，改完刷新即可。

| 想改什么 | 改哪里 | 说明 |
|---|---|---|
| 站点名 / 头图文案 | `site` | `name`、`title`、`bio`、`footer` |
| 摄影作品 | `photos` 数组 | 每个对象：`title` 标题、`description` 说明、`location` 拍摄地(可空)、`date` 日期、`src` 图片路径。新增照片只需在数组加一个对象，灯箱与网格自动生成 |
| 小插件 | `plugins` 数组 | `name`、`description`、`scenarios` 使用场景、`demoUrl` 演示地址、`previewType`：`"link"` 新标签打开（最稳）/ `"iframe"` 卡片内联预览、`screenshot` 预览图 |
| 公众号文章 | `articles` 数组 | `title`、`summary` 摘要、`date` 发布日期(`YYYY-MM-DD`，会自动按倒序展示)、`url` 原文链接（点卡片跳转） |
| 关于我 | `about` | `bio` 个人介绍(字符串数组，每段一个)、`contacts.email`/`contacts.github`/`contacts.wechatOfficial`、`qr` 二维码图片路径 |

> 💡 摄影画廊采用「统一比例(4:5) + 偶数列下沉」的编辑式错落布局，新增任意数量照片都保持节奏一致；灯箱支持键盘 ← / → 切换、ESC 关闭。

## 怎么换图片

把图片放到对应目录（`assets/photography/`、`assets/plugins/`、`assets/charts/`、`assets/qr/`），
然后在 `data.js` 里把路径填对即可。

**还没放图片？没关系** —— 缺图会自动显示一块渐变占位图，页面不会破版。

## 怎么换配色 / 主题

打开 `css/styles.css`，最顶上的 `:root` 里改变量：

```css
:root {
  --primary: #9a6a4d;   /* 点缀色（克制的陶土），改成你喜欢的颜色即可 */
  --bg: #f4f1ea;        /* 页面背景（暖米白） */
  --surface: #fffdf8;    /* 卡片背景（纸白） */
  --text: #2a2620;       /* 正文（暖炭灰） */
  --font-serif: …;        /* 衬线标题字体 */
  /* …其余变量见文件 */
}
```

深色主题由 `[data-theme="dark"]` 控制，页面右上角的按钮可手动切换，
选择会被记住；首次访问跟随系统的明/暗偏好。

## 小贴士

- 文章是**手动导入**的：想加一篇，就在 `articles` 数组最前面加一个对象。
- 想用 iframe 内联预览插件，但对方网站可能拒绝被嵌入（X-Frame-Options / CSP），
  此时卡片上的「在线试用 ↗」按钮始终可用，作为降级方案。
- 整站无任何外部请求（连字体都用系统字体栈），所以加载飞快、可离线打开。
