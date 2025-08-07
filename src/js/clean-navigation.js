// Clean Navigation JavaScript - Bootstrap 5 Compatible
import * as bootstrap from 'bootstrap';

class NavigationManager {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.sidebarToggle = document.getElementById('sidebar-toggle');
    this.searchToggle = document.getElementById('search-toggle');
    this.searchDropdown = document.getElementById('search-dropdown');
    this.searchClose = document.getElementById('search-close');
    this.sidebarOverlay = null;

    this.init();
  }

  init() {
    this.createSidebarOverlay();
    this.bindEvents();
    this.initializeBootstrapComponents();
    this.setActiveNavigation();
  }

  createSidebarOverlay() {
    if (window.innerWidth <= 991) {
      this.sidebarOverlay = document.createElement('div');
      this.sidebarOverlay.className = 'sidebar-overlay';
      document.body.appendChild(this.sidebarOverlay);
    }
  }

  bindEvents() {
    // Sidebar toggle
    if (this.sidebarToggle) {
      this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
    }

    // Search toggle
    if (this.searchToggle) {
      this.searchToggle.addEventListener('click', () => this.toggleSearch());
    }

    // Search close
    if (this.searchClose) {
      this.searchClose.addEventListener('click', () => this.closeSearch());
    }

    // Close search when clicking outside
    document.addEventListener('click', e => {
      if (!e.target.closest('.header-search')) {
        this.closeSearch();
      }
    });

    // Sidebar overlay click
    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
    }

    // Resize handler
    window.addEventListener('resize', () => this.handleResize());

    // Prevent dropdown close when clicking inside
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.addEventListener('click', e => {
        e.stopPropagation();
      });
    });
  }

  toggleSidebar() {
    if (!this.sidebar) return;

    if (window.innerWidth <= 991) {
      // Mobile behavior
      const isOpen = this.sidebar.classList.contains('show');

      if (isOpen) {
        this.closeSidebar();
      } else {
        this.openSidebar();
      }
    } else {
      // Desktop behavior
      this.sidebar.classList.toggle('collapsed');

      // Save state to localStorage
      const isCollapsed = this.sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
    }
  }

  openSidebar() {
    if (!this.sidebar) return;

    this.sidebar.classList.add('show');
    if (this.sidebarOverlay) {
      this.sidebarOverlay.classList.add('show');
    }
    document.body.style.overflow = 'hidden';
  }

  closeSidebar() {
    if (!this.sidebar) return;

    this.sidebar.classList.remove('show');
    if (this.sidebarOverlay) {
      this.sidebarOverlay.classList.remove('show');
    }
    document.body.style.overflow = '';
  }

  toggleSearch() {
    const searchContainer = document.querySelector('.header-search');
    if (!searchContainer) return;

    const isActive = searchContainer.classList.contains('active');

    if (isActive) {
      this.closeSearch();
    } else {
      searchContainer.classList.add('active');
      // Focus on search input
      const input = this.searchDropdown?.querySelector('input');
      if (input) {
        setTimeout(() => input.focus(), 100);
      }
    }
  }

  closeSearch() {
    const searchContainer = document.querySelector('.header-search');
    if (searchContainer) {
      searchContainer.classList.remove('active');
    }
  }

  handleResize() {
    if (window.innerWidth > 991) {
      // Desktop mode
      this.closeSidebar();

      // Restore collapsed state from localStorage
      const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
      if (this.sidebar) {
        this.sidebar.classList.toggle('collapsed', isCollapsed);
      }

      // Remove overlay if it exists
      if (this.sidebarOverlay) {
        this.sidebarOverlay.remove();
        this.sidebarOverlay = null;
      }
    } else {
      // Mobile mode
      if (!this.sidebarOverlay) {
        this.createSidebarOverlay();
        this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
      }

      // Remove collapsed class on mobile
      if (this.sidebar) {
        this.sidebar.classList.remove('collapsed');
      }
    }
  }

  initializeBootstrapComponents() {
    // Initialize all dropdowns
    const dropdownElements = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    dropdownElements.forEach(element => {
      new bootstrap.Dropdown(element);
    });

    // Initialize all collapses for sidebar submenus
    const collapseElements = document.querySelectorAll('[data-bs-toggle="collapse"]');
    collapseElements.forEach(element => {
      new bootstrap.Collapse(element.getAttribute('data-bs-target'), {
        toggle: false,
      });
    });

    // Initialize tooltips if any
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipElements.forEach(element => {
      new bootstrap.Tooltip(element);
    });
  }

  setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    // Remove active classes
    document.querySelectorAll('.sidebar-link, .sidebar-sublink').forEach(link => {
      link.classList.remove('active');
    });

    // Find and set active link
    const activeLink = document.querySelector(`a[href*="${currentPage}"]`);
    if (activeLink) {
      activeLink.classList.add('active');

      // If it's a submenu link, expand the parent
      const parentSubmenu = activeLink.closest('.sidebar-submenu');
      if (parentSubmenu) {
        const parentToggle = document.querySelector(`[data-bs-target="#${parentSubmenu.id}"]`);
        if (parentToggle) {
          parentToggle.setAttribute('aria-expanded', 'true');
          parentSubmenu.classList.add('show');
        }
      }

      // Set parent item as active too
      const parentItem = activeLink.closest('.sidebar-item');
      if (parentItem && !activeLink.classList.contains('sidebar-sublink')) {
        parentItem.classList.add('active');
      }
    }
  }

  // Public methods
  destroy() {
    // Clean up event listeners and elements
    if (this.sidebarOverlay) {
      this.sidebarOverlay.remove();
    }
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.navigationManager = new NavigationManager();
});

// Export for use in other modules
export default NavigationManager;
