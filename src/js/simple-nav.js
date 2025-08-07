// Ultra Simple Working Navigation

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const body = document.body;

  // Create overlay for mobile
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  body.appendChild(overlay);

  // Menu toggle functionality
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        // Mobile behavior
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
      } else {
        // Desktop behavior
        sidebar.classList.toggle('hidden');
        body.classList.toggle('sidebar-hidden');
      }
    });
  }

  // Close sidebar when clicking overlay
  overlay.addEventListener('click', function () {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
  });

  // Sidebar dropdown functionality
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      const isOpen = parent.classList.contains('open');

      // Close all other dropdowns
      document.querySelectorAll('.has-dropdown').forEach(item => {
        item.classList.remove('open');
      });

      // Toggle current dropdown
      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });

  // Set active navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.simple-nav a');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Handle window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('show');
      overlay.classList.remove('show');
    }
  });
});

// Simple navigation loaded
