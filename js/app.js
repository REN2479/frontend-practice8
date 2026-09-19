// ============ 藏书管理模块（整合课堂四、五的交互成果） ============
const form = document.querySelector('#book-form');
const listDom = document.querySelector('#book-list');
const tipDom = document.querySelector('#tip');
const nameInput = document.querySelector('#name');
const authorInput = document.querySelector('#author');
const yearInput = document.querySelector('#year');
const filterSelect = document.querySelector('#filter');

// 从本地存储读取藏书
let bookList = JSON.parse(localStorage.getItem('books') || '[]');

const save = () => localStorage.setItem('books', JSON.stringify(bookList));

// 渲染列表：render前先清空容器，防止筛选后残留旧数据
function render() {
    listDom.innerHTML = '';
    const filter = filterSelect.value;
    const shown = bookList.filter(b => {
        if (filter === 'all') return true;
        if (filter === '2000') return b.year >= 2000;
        if (filter === '1990') return b.year >= 1990 && b.year < 2000;
        return b.year < 1990;
    });

    if (shown.length === 0) {
        listDom.innerHTML = '<p class="text-muted">没有符合条件的藏书</p>';
        return;
    }

    shown.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-item';
        div.textContent = `书名：${book.name}，作者：${book.author}，出版年份：${book.year}`;

        const delBtn = document.createElement('button');
        delBtn.textContent = '删除';
        delBtn.className = 'btn btn-sm btn-outline-danger';
        delBtn.onclick = function () {
            bookList = bookList.filter(b => b !== book);
            save();
            render();
        };
        div.appendChild(delBtn);
        listDom.appendChild(div);
    });
}

// 添加图书：按"正常→边界→非法输入"做校验
form.addEventListener('submit', (e) => {
    e.preventDefault();
    tipDom.textContent = '';
    const name = nameInput.value.trim();
    const author = authorInput.value.trim();
    const year = yearInput.value.trim();

    if (!name || !author || !year) {
        tipDom.textContent = '所有字段不能为空！';
        return;
    }
    if (Number(year) < 1000 || Number(year) > 2026) {
        tipDom.textContent = '出版年份填写不合理！';
        return;
    }

    bookList.push({ name, author, year: Number(year) });
    save();
    form.reset();
    render();
});

filterSelect.addEventListener('change', render);

// 导航当前项高亮
document.querySelectorAll('#main-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('#main-nav .active').classList.remove('active');
        link.classList.add('active');
    });
});

render();

// ============ 统计模块（整合课堂六的可视化成果） ============
// 内置同款数据：直接双击打开时浏览器限制fetch读取本地文件，回退使用
const fallbackData = [
    { name: '呐喊', author: '鲁迅', year: 1923 },
    { name: '小王子', author: '圣埃克苏佩里', year: 1943 },
    { name: '围城', author: '钱钟书', year: 1947 },
    { name: '百年孤独', author: '加西亚·马尔克斯', year: 1967 },
    { name: '平凡的世界', author: '路遥', year: 1986 },
    { name: '活着', author: '余华', year: 1993 },
    { name: '白夜行', author: '东野圭吾', year: 1999 },
    { name: '三体', author: '刘慈欣', year: 2008 },
    { name: '解忧杂货店', author: '东野圭吾', year: 2012 },
    { name: '人类简史', author: '尤瓦尔·赫拉利', year: 2012 }
];

async function loadChart() {
    const chartTip = document.querySelector('#chart-tip');
    let list;
    try {
        const res = await fetch('data/data.json');
        if (!res.ok) throw new Error('数据文件不存在');
        list = await res.json();
    } catch (e) {
        // 读取失败（如双击打开受浏览器限制）时回退到内置数据，页面不空白
        list = fallbackData;
        chartTip.className = 'text-muted';
        chartTip.textContent = '未能读取 data/data.json，当前显示内置演示数据（用本地服务器打开可读取完整数据）';
    }
    if (!Array.isArray(list) || list.length === 0) {
        chartTip.className = 'text-danger';
        chartTip.textContent = '暂无藏书数据';
        return;
    }
    // 按年代分组统计
    const counts = {};
    list.forEach(b => {
        const decade = Math.floor(b.year / 10) * 10 + '年代';
        counts[decade] = (counts[decade] || 0) + 1;
    });
    const chart = echarts.init(document.querySelector('#chart'));
    chart.setOption({
        title: { text: '各年代藏书量（单位：本）' },
        tooltip: {},
        xAxis: { data: Object.keys(counts) },
        yAxis: {},
        series: [{ type: 'bar', data: Object.values(counts) }]
    });
}

loadChart();
