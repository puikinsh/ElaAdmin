// Import styles
import '@scss/main.scss';

// Import Bootstrap 5
import * as bootstrap from 'bootstrap';

// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.css';

// Make Bootstrap available globally for legacy code
window.bootstrap = bootstrap;

// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
  initializeSidebar();
  initializeTooltips();
  initializePopovers();
  initializeNotifications();
});

// Sidebar toggle functionality
function initializeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mainContent = document.querySelector('.main-content');
  const header = document.getElementById('header');
  
  if (sidebarToggle && sidebar) {
    // Load saved state from localStorage
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
      sidebar.classList.add('collapsed');
      mainContent?.classList.add('collapsed');
      header?.classList.add('collapsed');
    }
    
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      mainContent?.classList.toggle('collapsed');
      header?.classList.toggle('collapsed');
      
      // Save state to localStorage
      const collapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', collapsed);
    });
  }
  
  // Mobile sidebar toggle
  if (window.innerWidth <= 991) {
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'sidebar-overlay';
    document.body.appendChild(mobileOverlay);
    
    sidebarToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('show');
      mobileOverlay.classList.toggle('show');
    });
    
    mobileOverlay.addEventListener('click', () => {
      sidebar?.classList.remove('show');
      mobileOverlay.classList.remove('show');
    });
  }
  
  // Set active nav item based on current page
  setActiveNavItem();
}

// Set active navigation item
function setActiveNavItem() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/index.html')) {
      link.classList.add('active');
      
      // Expand parent dropdown if exists
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const dropdownToggle = parentDropdown.querySelector('[data-bs-toggle="collapse"]');
        const dropdownMenu = parentDropdown.querySelector('.collapse');
        if (dropdownToggle && dropdownMenu) {
          dropdownMenu.classList.add('show');
          dropdownToggle.setAttribute('aria-expanded', 'true');
        }
      }
    } else {
      link.classList.remove('active');
    }
  });
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Initialize Bootstrap popovers
function initializePopovers() {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverTriggerList.forEach(popoverTriggerEl => {
    new bootstrap.Popover(popoverTriggerEl);
  });
}

// Initialize notification system
function initializeNotifications() {
  // Check for notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    // You can request permission here if needed
  }
}

// Utility function for API calls
export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Format numbers with commas
export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Format dates
export function formatDate(date, format = 'short') {
  const options = format === 'short' 
    ? { year: 'numeric', month: 'short', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

// Add loading state to element
export function setLoading(element, isLoading = true) {
  if (isLoading) {
    element.classList.add('loading');
    element.setAttribute('disabled', 'disabled');
  } else {
    element.classList.remove('loading');
    element.removeAttribute('disabled');
  }
}

// Debounce function for search inputs
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export for use in other modules
export { bootstrap };