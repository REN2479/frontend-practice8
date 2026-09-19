// ============ 自习室查询模块（复用课堂五的筛选模式，数据写死在JS数组） ============
const rooms = [
    { name: '一楼东侧自习室', floor: 1, status: '开放', seats: 120 },
    { name: '一楼西侧自习室', floor: 1, status: '满员', seats: 80 },
    { name: '二楼研讨自习室', floor: 2, status: '开放', seats: 60 },
    { name: '二楼安静自习室', floor: 2, status: '关闭', seats: 100 },
    { name: '三楼考研自习室', floor: 3, status: '开放', seats: 90 },
    { name: '三楼通宵自习室', floor: 3, status: '满员', seats: 50 }
];

const roomList = document.querySelector('#room-list');
const floorSelect = document.querySelector('#floor-filter');
const roomTip = document.querySelector('#room-tip');

// render前先清空容器，防止筛选切换后残留旧结果
function renderRooms() {
    roomList.innerHTML = '';
    const floor = floorSelect.value;
    const shown = rooms.filter(r => floor === 'all' || r.floor === Number(floor));

    if (shown.length === 0) {
        roomTip.textContent = '该楼层暂无自习室';
        return;
    }
    roomTip.textContent = '';

    shown.forEach(r => {
        const div = document.createElement('div');
        div.className = 'room-item';
        // 状态用文字+徽章表示，不只靠颜色提示
        const badge = r.status === '开放' ? 'success' : (r.status === '满员' ? 'warning text-dark' : 'secondary');
        div.innerHTML = `<strong>${r.name}</strong> <span class="badge text-bg-${badge}">${r.status}</span><br><small class="text-muted">座位数：${r.seats}</small>`;
        roomList.appendChild(div);
    });
}

floorSelect.addEventListener('change', renderRooms);
renderRooms();

// ============ 使用统计模块（复用课堂六的图表代码） ============
async function loadChart() {
    const chartTip = document.querySelector('#chart-tip');
    try {
        const res = await fetch('data/data.json');
        if (!res.ok) throw new Error('数据文件不存在');
        const list = await res.json();
        if (!Array.isArray(list) || list.length === 0) {
            chartTip.textContent = '暂无自习室使用数据';
            return;
        }
        const chart = echarts.init(document.querySelector('#chart'));
        chart.setOption({
            title: { text: '各自习室本周使用时长（单位：小时）' },
            tooltip: {},
            xAxis: {
                data: list.map(i => i.name),
                axisLabel: { interval: 0, rotate: 30 }
            },
            yAxis: {},
            series: [{ type: 'bar', data: list.map(i => i.hours) }]
        });
    } catch (e) {
        chartTip.textContent = '数据加载失败，请检查网络或数据文件';
    }
}

loadChart();
