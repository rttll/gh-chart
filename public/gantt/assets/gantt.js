const canvas = document.getElementById('ganttChart');
const ctx = canvas.getContext('2d');

const chartData = window.chartData;

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: chartData.map((data) => `${data.label} (${data.timeSpan})`),
    datasets: [
      {
        label: 'Project Duration',
        data: chartData.map((data) => data.duration),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barPercentage: 0.5,
        categoryPercentage: 1,
      },
    ],
  },
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          // Customize as needed to display weeks
          callback: function (value, index, ticks) {
            return `Week ${index + 1}`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const projectInfo = chartData[context.dataIndex];
            return `${projectInfo.label}: ${projectInfo.timeSpan}`;
          },
        },
      },
    },
  },
});
