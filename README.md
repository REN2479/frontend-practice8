# 个人图书收藏与统计中心

《软件开发综合实践》课堂作业八整合练习，作为期末大作业的原型。

## 项目简介

整合页面结构、样式与响应式、JavaScript 交互、数据加载与可视化四个模块的单页作品，含统一导航：

- 首页：Bootstrap 卡片介绍各模块入口
- 藏书管理：添加/删除图书、按年代筛选，数据保存在 localStorage
- 使用统计：ECharts 柱状图展示各年代藏书量（数据来自 data/data.json）

## 运行方法

由于浏览器安全限制，直接双击 index.html 无法用 fetch 读取本地 JSON 文件，需要通过本地服务器运行：

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
