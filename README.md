# 个人图书收藏与统计中心

《软件开发综合实践》课堂作业八整合练习，作为期末大作业的原型。

## 项目简介

整合页面结构、样式与响应式、JavaScript 交互、数据加载与可视化四个模块的单页作品，含统一导航：

- 首页：Bootstrap 卡片介绍各模块入口
- 藏书管理：添加/删除图书、按年代筛选，数据保存在 localStorage
- 使用统计：ECharts 柱状图展示各年代藏书量（数据来自 data/data.json）

## 运行方法

双击 index.html 即可浏览大部分功能，此时统计图表自动使用内置演示数据。
若要读取 data/data.json 完整数据（浏览器安全限制，双击打开时 fetch 无法读取本地文件），请通过本地服务器运行：

```bash
python -m http.server 8000
```

然后浏览器打开 http://localhost:8000（或使用 VS Code 的 Live Server 插件）。

## 目录说明

```
index.html      统一入口（导航 + 三个区块）
css/style.css   自定义样式（在 Bootstrap 之后引入，保证可覆盖）
js/app.js       藏书管理交互与图表加载逻辑
data/data.json  示例藏书数据
```

## 技术与资源来源

- Bootstrap 5.3.3（CDN）：布局、导航与卡片组件
- ECharts 5.5.0（CDN）：柱状图
- 图书信息为手工整理的公开出版信息，仅作演示数据

## integration/（课堂案例复现：迷你版校园信息中心）

跟随实践指南八复现的整合骨架：

```
integration/
├── index.html          统一入口（首页卡片、自习室查询、使用统计）
├── css/style.css       自定义样式
├── js/app.js           自习室楼层筛选交互与柱状图加载
├── data/data.json      各自习室本周使用时长（演示数据）
└── three-d/scene.html  校园三维导览（A-Frame 1.5.0，可从导航进入并返回）
```

运行方式与主作品相同（本地服务器）。其中三维页 three-d/scene.html 不读取本地文件，双击也可打开。
