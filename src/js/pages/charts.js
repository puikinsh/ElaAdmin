// Chart.js v4.5 page functionality
import Chart from 'chart.js/auto';

// Initialize tracking variable at module level
let chartsInitialized = false;

// Charts module initialization

// Initialize charts function
function runChartsInitialization() {
  // Initialize chart components

  initializeCharts();
}

// Run now if DOM is already loaded, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runChartsInitialization);
} else {
  runChartsInitialization();
}

export function initializeCharts() {
  if (chartsInitialized) {
    // Charts already initialized
    return;
  }

  // Initialize all charts
  chartsInitialized = true;

  // Sales Chart (sales-chart)
  const salesChartElement = document.getElementById('sales-chart');
  if (salesChartElement) {
    // Create sales chart
    try {
      // Destroy existing chart if it exists
      const existingChart = Chart.getChart(salesChartElement);
      if (existingChart) {
        // Destroy existing chart
        existingChart.destroy();
      }

      new Chart(salesChartElement, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Sales',
              data: [12000, 19000, 15000, 25000, 22000, 30000],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 2,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Sales ($)',
              },
            },
          },
        },
      });
      // Sales chart created
    } catch (error) {
      console.error('Error creating sales chart:', error);
    }
  } else {
    // Sales chart element not found
  }

  // Team Chart
  const teamChartElement = document.getElementById('team-chart');
  if (teamChartElement) {
    // Create team chart
    try {
      new Chart(teamChartElement, {
        type: 'bar',
        data: {
          labels: ['Developer', 'Designer', 'Marketing', 'Sales', 'Support'],
          datasets: [
            {
              label: 'Team Members',
              data: [12, 8, 6, 9, 5],
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 2,
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 2,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: 'white',
              bodyColor: 'white',
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
          },
        },
      });
      // Team chart created
    } catch (error) {
      console.error('Error creating team chart:', error);
    }
  } else {
    // Team chart element not found
  }

  // Radar Chart
  const radarChartElement = document.getElementById('radar-chart');
  if (radarChartElement) {
    new Chart(radarChartElement, {
      type: 'radar',
      data: {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling', 'Sleeping'],
        datasets: [
          {
            label: 'Person A',
            data: [20, 10, 4, 2, 8],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Person B',
            data: [15, 20, 12, 6, 10],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  // Line Chart
  const lineChartElement = document.getElementById('line-chart');
  if (lineChartElement) {
    new Chart(lineChartElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }

  // Doughnut Chart
  const doughnutChartElement = document.getElementById('doughnut-chart');
  if (doughnutChartElement) {
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(doughnutChartElement);
    if (existingChart) {
      // Destroy existing chart
      existingChart.destroy();
    }

    new Chart(doughnutChartElement, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
          {
            label: 'Dataset',
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  // Pie Chart
  const pieChartElement = document.getElementById('pie-chart');
  if (pieChartElement) {
    new Chart(pieChartElement, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'Dataset',
            data: [300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  // Polar Area Chart
  const polarChartElement = document.getElementById('polar-chart');
  if (polarChartElement) {
    new Chart(polarChartElement, {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [
          {
            label: 'Dataset',
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  // Single Bar Chart (single-bar-chart and singelBarChart)
  const singleBarChartElement =
    document.getElementById('single-bar-chart') || document.getElementById('singelBarChart');
  if (singleBarChartElement) {
    new Chart(singleBarChartElement, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Additional chart mappings for HTML file IDs

  // Bar Chart (barChart)
  const barChartElement = document.getElementById('barChart');
  if (barChartElement) {
    new Chart(barChartElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Dataset',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Radar Chart (radarChart)
  const radarChartElement2 = document.getElementById('radarChart');
  if (radarChartElement2) {
    new Chart(radarChartElement2, {
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 90, 81, 56, 55],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  // Line Chart (lineChart)
  const lineChartElement2 = document.getElementById('lineChart');
  if (lineChartElement2) {
    new Chart(lineChartElement2, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  // Doughnut Chart (doughutChart - note the typo in HTML)
  const doughutChartElement = document.getElementById('doughutChart');
  if (doughutChartElement) {
    new Chart(doughutChartElement, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My Dataset',
            data: [300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  // Pie Chart (pieChart)
  const pieChartElement2 = document.getElementById('pieChart');
  if (pieChartElement2) {
    new Chart(pieChartElement2, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'Dataset',
            data: [300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  // Polar Chart (polarChart)
  const polarChartElement2 = document.getElementById('polarChart');
  if (polarChartElement2) {
    new Chart(polarChartElement2, {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [
          {
            label: 'Dataset',
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}

export default initializeCharts;
