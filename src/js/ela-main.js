// ElaAdmin Main JavaScript - Bootstrap 5 Compatible
import * as bootstrap from 'bootstrap';

// Make Bootstrap available globally
window.bootstrap = bootstrap;

document.addEventListener('DOMContentLoaded', function () {
  // Menu Toggle for Sidebar
  const menuToggle = document.getElementById('menuToggle');
  const leftPanel = document.getElementById('left-panel');
  const rightPanel = document.getElementById('right-panel');

  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.toggle('open');

      // For mobile
      if (window.innerWidth <= 991) {
        leftPanel?.classList.toggle('show');
      }
    });
  }

  // Search trigger
  const searchTrigger = document.querySelector('.search-trigger');
  const searchForm = document.querySelector('.search-form');
  const searchClose = document.querySelector('.search-close');
  const headerActions = document.querySelector('.header-actions');

  if (searchTrigger && searchForm) {
    searchTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (headerActions) {
        headerActions.classList.toggle('search-active');
      }
      searchForm.classList.toggle('show');
    });

    if (searchClose) {
      searchClose.addEventListener('click', function (e) {
        e.preventDefault();
        if (headerActions) {
          headerActions.classList.remove('search-active');
        }
        searchForm.classList.remove('show');
      });
    }
  }

  // Initialize all dropdowns (Bootstrap 5)
  const dropdownElementList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
  const dropdownList = [...dropdownElementList].map(
    dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl)
  );

  // Sidebar dropdown menus (Bootstrap 5 compatible)
  const menuDropdowns = document.querySelectorAll('.menu-item-has-children > a');
  menuDropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      const submenu = parent.querySelector('.sub-menu');

      // Toggle current submenu
      parent.classList.toggle('show');
      if (submenu) {
        submenu.classList.toggle('show');
      }

      // Close other submenus
      const siblings = parent.parentElement.querySelectorAll('.menu-item-has-children');
      siblings.forEach(sibling => {
        if (sibling !== parent) {
          sibling.classList.remove('show');
          const siblingSubmenu = sibling.querySelector('.sub-menu');
          if (siblingSubmenu) {
            siblingSubmenu.classList.remove('show');
          }
        }
      });
    });
  });

  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(
    tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Initialize popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(
    popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)
  );

  // Mobile menu overlay
  if (window.innerWidth <= 991) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function () {
      document.body.classList.remove('open');
      leftPanel?.classList.remove('show');
      overlay.classList.remove('active');
    });

    // Show overlay when menu opens
    if (menuToggle) {
      menuToggle.addEventListener('click', function () {
        if (document.body.classList.contains('open')) {
          overlay.classList.add('active');
        } else {
          overlay.classList.remove('active');
        }
      });
    }
  }

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 991) {
        document.body.classList.remove('open');
        leftPanel?.classList.remove('show');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
          overlay.classList.remove('active');
        }
      }
    }, 250);
  });

  // Counter animation for dashboard widgets
  const counters = document.querySelectorAll('.count');
  const speed = 200;

  counters.forEach(counter => {
    const animate = () => {
      const value = +counter.getAttribute('data-value') || +counter.innerText;
      const data = +counter.innerText;
      const time = value / speed;

      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 1);
      } else {
        counter.innerText = value;
      }
    };

    // Only animate if element is visible
    if (counter.offsetParent !== null) {
      counter.innerText = '0';
      counter.setAttribute('data-value', counter.innerText);
      animate();
    }
  });
});

// Export bootstrap for use in other modules
export { bootstrap };
