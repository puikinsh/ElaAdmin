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
  initializeSearch();
  initializeTooltips();
  initializePopovers();
  initializeNotifications();
  initializeHeaderDropdowns();
});

// Sidebar toggle functionality
function initializeSidebar() {
  const leftPanel = document.getElementById('left-panel');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const body = document.body;

  // Only apply saved collapsed state on desktop
  if (window.innerWidth > 991) {
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed && leftPanel) {
      leftPanel.classList.add('collapsed');
    }
  }

  // Create overlay element if it doesn't exist
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    body.appendChild(overlay);
  }

  // Toggle sidebar
  if (sidebarToggle && leftPanel) {
    sidebarToggle.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      if (window.innerWidth <= 991) {
        // Mobile behavior - slide in/out
        const isOpen = leftPanel.classList.contains('mobile-open');
        
        if (isOpen) {
          // Close sidebar
          leftPanel.classList.remove('mobile-open');
          overlay.classList.remove('show');
          body.style.overflow = ''; // Re-enable scrolling
        } else {
          // Open sidebar
          leftPanel.classList.add('mobile-open');
          overlay.classList.add('show');
          body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
        }
      } else {
        // Desktop behavior - collapse/expand
        leftPanel.classList.toggle('collapsed');
        const collapsed = leftPanel.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', collapsed);
      }
    });
  }

  // Close mobile sidebar when clicking overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        leftPanel?.classList.remove('mobile-open');
        overlay.classList.remove('show');
        body.style.overflow = '';
      }
    });
  }

  // Initialize dropdown functionality
  initializeDropdowns();

  // Set active nav item based on current page
  setActiveNavItem();

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 991) {
        // Remove mobile classes on desktop
        leftPanel?.classList.remove('mobile-open');
        document.querySelector('.sidebar-overlay')?.classList.remove('show');
      }
    }, 250);
  });
}

// Handle dropdown toggles
function initializeDropdowns() {
  const navLinks = document.querySelectorAll('.has-submenu > .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const parent = link.closest('.has-submenu');
      const isOpen = parent.classList.contains('open');

      // Close all other dropdowns
      document.querySelectorAll('.has-submenu.open').forEach(item => {
        if (item !== parent) {
          item.classList.remove('open');
        }
      });

      // Toggle current dropdown
      parent.classList.toggle('open', !isOpen);
    });
  });

  // Handle submenu link clicks
  document.querySelectorAll('.submenu-link').forEach(link => {
    link.addEventListener('click', e => {
      // Remove active class from all submenu links
      document.querySelectorAll('.submenu-link').forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      link.classList.add('active');
    });
  });
}

// Set active navigation item
function setActiveNavItem() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Handle main nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');

      // If it's a submenu item, open parent dropdown
      const parent = link.closest('.has-submenu');
      if (parent) {
        parent.classList.add('open');
      }
    } else if (href === '#') {
      // Check submenu items
      const parent = link.closest('.has-submenu');
      if (parent) {
        const hasActiveChild = parent.querySelector(`.submenu-link[href="${currentPath}"]`);
        if (hasActiveChild) {
          parent.classList.add('open');
          hasActiveChild.classList.add('active');
        }
      }
    }
  });

  // Handle submenu links
  document.querySelectorAll('.submenu-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
      // Open parent dropdown
      const parent = link.closest('.has-submenu');
      if (parent) {
        parent.classList.add('open');
      }
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
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Format numbers with commas
export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format dates
export function formatDate(date, format = 'short') {
  const options =
    format === 'short'
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

// Initialize expandable search
function initializeSearch() {
  const searchToggle = document.getElementById('search-toggle');
  const searchContainer = document.querySelector('.search-container');
  const closeSearch = document.getElementById('close-search');
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.querySelector('.search-suggestions');

  if (searchToggle && searchContainer) {
    // Open search box
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isVisible = searchContainer.style.display !== 'none';
      searchContainer.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        searchInput?.focus();
        // Show suggestions when opening
        if (searchSuggestions) {
          searchSuggestions.style.display = 'block';
        }
      }
    });

    // Close search box
    closeSearch?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchContainer.style.display = 'none';
      searchInput.value = '';
    });

    // Close on Escape key
    searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchContainer.style.display = 'none';
        searchInput.value = '';
      }
    });

    // Handle search input
    searchInput?.addEventListener('input', (e) => {
      // Show/hide suggestions based on input
      if (searchSuggestions) {
        searchSuggestions.style.display = e.target.value.trim() ? 'none' : 'block';
      }
    });

    // Handle search submission
    searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
          // Process search term
          // Add your search logic here
        }
      }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target) && !searchToggle.contains(e.target)) {
        searchContainer.style.display = 'none';
      }
    });
  }
}

// Initialize header dropdowns with smooth positioning
function initializeHeaderDropdowns() {
  // Add custom click handlers for action buttons in dropdowns
  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Handle specific actions here if needed
      const action = this.textContent.trim();
      
      // Example: Handle logout
      if (action === 'Logout') {
        e.preventDefault();
        // Handle logout
        // Add logout logic here
      }
      
      // Example: Handle clear all notifications
      if (this.textContent.includes('Clear all')) {
        e.preventDefault();
        // Clear notifications
        // Add clear logic here
      }
    });
  });

  // Simple dropdown positioning fix
  document.addEventListener('show.bs.dropdown', function(e) {
    const dropdownMenu = e.target.nextElementSibling;
    if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
      const rect = e.target.getBoundingClientRect();
      
      // Position dropdown to the left of the button with proper spacing
      dropdownMenu.style.position = 'fixed';
      dropdownMenu.style.top = (rect.bottom + 2) + 'px';
      dropdownMenu.style.left = (rect.right - 300) + 'px'; // Assume 300px width, position to left
      dropdownMenu.style.right = 'auto';
      dropdownMenu.style.transform = 'none';
      dropdownMenu.style.margin = '0';
      
      // Ensure it doesn't go off screen
      if (parseInt(dropdownMenu.style.left) < 10) {
        dropdownMenu.style.left = '10px';
      }
    }
  });
  
  // Clean up on hide
  document.addEventListener('hide.bs.dropdown', function(e) {
    const dropdownMenu = e.target.nextElementSibling;
    if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
      setTimeout(() => {
        dropdownMenu.style.position = '';
        dropdownMenu.style.top = '';
        dropdownMenu.style.left = '';
        dropdownMenu.style.right = '';
        dropdownMenu.style.transform = '';
        dropdownMenu.style.margin = '';
      }, 150);
    }
  });

  // Add animation classes when dropdowns are shown
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('show.bs.dropdown', function() {
      const menu = this.querySelector('.dropdown-menu');
      if (menu) {
        menu.style.animation = 'fadeIn 0.2s ease-in-out';
      }
    });
  });
}

// Export for use in other modules
export { bootstrap };
