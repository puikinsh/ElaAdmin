import Chart from 'chart.js/auto';
import { formatNumber, formatCurrency } from '../main.js';

// Dashboard module loaded

// Dashboard initialization - run immediately and on DOM ready
function initializeDashboard() {
  // Initialize dashboard components

  initializeSalesChart();
  initializeTrafficChart();
  initializeCounters();
}

// Run now if DOM is already loaded, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
  initializeDashboard();
}

// Initialize sales chart
function initializeSalesChart() {
  const ctx = document.getElementById('sales-chart');
  if (!ctx) {
    // Sales chart element not found
    return;
  }
  // Initialize sales chart

  // Destroy existing chart if it exists
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    // Destroy existing chart
    existingChart.destroy();
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Sales',
          data: [
            12500, 15000, 14500, 18200, 19500, 22100, 24500, 23500, 25000, 26500, 27800, 29000,
          ],
          borderColor: '#03a9f3',
          backgroundColor: 'rgba(3, 169, 243, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Revenue',
          data: [8500, 10200, 9800, 12500, 13200, 15100, 16800, 16200, 17500, 18200, 19100, 20000],
          borderColor: '#00c292',
          backgroundColor: 'rgba(0, 194, 146, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += formatCurrency(context.parsed.y);
              return label;
            },
          },
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
          ticks: {
            callback: function (value) {
              return formatCurrency(value);
            },
          },
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
    },
  });
}

// Initialize traffic chart
function initializeTrafficChart() {
  const ctx = document.getElementById('doughnut-chart');
  if (!ctx) {
    // Traffic chart element not found
    return;
  }
  // Initialize traffic chart

  // Destroy existing chart if it exists
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    // Destroy existing chart
    existingChart.destroy();
  }

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Direct', 'Social', 'Referral', 'Organic', 'Email'],
      datasets: [
        {
          data: [35, 25, 20, 15, 5],
          backgroundColor: ['#03a9f3', '#00c292', '#fb9678', '#ab8ce4', '#66bb6a'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ': ' + context.parsed + '%';
            },
          },
        },
      },
      cutout: '70%',
    },
  });
}

// Initialize animated counters
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-value');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px',
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Animate counter
function animateCounter(element) {
  const text = element.innerText;
  const isPercentage = text.includes('%');
  const isCurrency = text.includes('$');

  // Extract number from text
  let target = parseFloat(text.replace(/[^0-9.]/g, ''));
  if (isNaN(target)) return;

  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    let displayValue = Math.floor(current);
    if (isPercentage) {
      element.innerText = displayValue.toFixed(1) + '%';
    } else if (isCurrency) {
      element.innerText = formatCurrency(displayValue);
    } else {
      element.innerText = formatNumber(displayValue);
    }
  }, 16);
}

// Real-time data simulation
setInterval(() => {
  updateRandomStat();
}, 5000);

function updateRandomStat() {
  const stats = document.querySelectorAll('.stat-value');
  if (stats.length === 0) return;

  const randomStat = stats[Math.floor(Math.random() * stats.length)];
  const text = randomStat.innerText;
  const isPercentage = text.includes('%');
  const isCurrency = text.includes('$');

  let value = parseFloat(text.replace(/[^0-9.]/g, ''));
  const change = (Math.random() - 0.5) * 0.1 * value;
  value += change;

  if (isPercentage) {
    randomStat.innerText = value.toFixed(1) + '%';
  } else if (isCurrency) {
    randomStat.innerText = formatCurrency(Math.floor(value));
  } else {
    randomStat.innerText = formatNumber(Math.floor(value));
  }

  // Update change indicator
  const changeElement = randomStat.parentElement.querySelector('.stat-change');
  if (changeElement) {
    const isPositive = change > 0;
    changeElement.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
    changeElement.innerHTML = `<i class="fa-solid fa-arrow-${isPositive ? 'up' : 'down'}"></i> ${Math.abs((change / value) * 100).toFixed(1)}%`;
  }
}
