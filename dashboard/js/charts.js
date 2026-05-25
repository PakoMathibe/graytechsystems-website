// ========== CHART INITIALIZATION ==========

let usageChart, dailyUsageChart, historicalChart;

function initCharts() {
    // Usage Line Chart (Overview)
    const ctx1 = document.getElementById('usageChart').getContext('2d');
    usageChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: appData.usage.dailyLabels,
            datasets: [{
                label: 'Data Used (GB)',
                data: appData.usage.daily,
                borderColor: '#06A3DA',
                backgroundColor: 'rgba(6, 163, 218, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#06A3DA',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'top', labels: { font: { size: 11 } } },
                tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} GB` } }
            },
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Data (GB)', font: { size: 11 } } }, x: { title: { display: true, text: 'Day', font: { size: 11 } } } }
        }
    });

    // Daily Usage Bar Chart (Usage Section)
    const ctx2 = document.getElementById('dailyUsageChart').getContext('2d');
    dailyUsageChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: appData.usage.dailyLabels,
            datasets: [{
                label: 'Data Used (GB)',
                data: appData.usage.daily,
                backgroundColor: '#06A3DA',
                borderRadius: 8,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} GB` } } },
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Data (GB)' } } }
        }
    });
}

function updateCharts() {
    if (usageChart) {
        usageChart.data.datasets[0].data = appData.usage.daily;
        usageChart.update();
    }
    if (dailyUsageChart) {
        dailyUsageChart.data.datasets[0].data = appData.usage.daily;
        dailyUsageChart.update();
    }
}