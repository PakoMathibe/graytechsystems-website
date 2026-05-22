let usageChart, dailyUsageChart;

function initCharts() {
  const ctx1 = document.getElementById('usageChart').getContext('2d');
  usageChart = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Data Used (GB)',
          data: window.appData.usage.daily,
          borderColor: '#06A3DA',
          backgroundColor: 'rgba(6, 163, 218, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: true },
  });

  const ctx2 = document.getElementById('dailyUsageChart').getContext('2d');
  dailyUsageChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Data Used (GB)',
          data: window.appData.usage.daily,
          backgroundColor: '#06A3DA',
          borderRadius: 8,
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: true },
  });
}
