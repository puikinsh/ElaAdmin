// Simple DataTable implementation for tables-data.html
class SimpleDataTable {
  constructor(tableId, options = {}) {
    this.table = document.getElementById(tableId);
    if (!this.table) return;
    
    this.options = {
      searchable: options.searchable !== false,
      sortable: options.sortable !== false,
      perPage: options.perPage || 10,
      perPageOptions: options.perPageOptions || [5, 10, 25, 50],
      ...options
    };
    
    this.currentPage = 1;
    this.sortColumn = -1;
    this.sortDirection = 'asc';
    this.searchTerm = '';
    
    this.init();
  }
  
  init() {
    // Store original data
    this.originalRows = Array.from(this.table.querySelector('tbody').querySelectorAll('tr'));
    this.filteredRows = [...this.originalRows];
    
    // Create wrapper
    this.createWrapper();
    
    // Add controls
    if (this.options.searchable) this.createSearch();
    if (this.options.perPageOptions) this.createPerPageSelector();
    
    // Add sorting
    if (this.options.sortable) this.addSorting();
    
    // Create pagination
    this.createPagination();
    
    // Initial render
    this.render();
  }
  
  createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.className = 'datatable-wrapper';
    
    const topControls = document.createElement('div');
    topControls.className = 'd-flex justify-content-between align-items-center mb-3';
    topControls.innerHTML = `
      <div class="datatable-left d-flex align-items-center gap-3"></div>
      <div class="datatable-right"></div>
    `;
    
    const bottomControls = document.createElement('div');
    bottomControls.className = 'd-flex justify-content-between align-items-center mt-3';
    bottomControls.innerHTML = `
      <div class="datatable-info"></div>
      <div class="datatable-pagination"></div>
    `;
    
    // Wrap table
    this.table.parentNode.insertBefore(wrapper, this.table);
    wrapper.appendChild(topControls);
    wrapper.appendChild(this.table);
    wrapper.appendChild(bottomControls);
    
    this.topLeft = topControls.querySelector('.datatable-left');
    this.topRight = topControls.querySelector('.datatable-right');
    this.bottomLeft = bottomControls.querySelector('.datatable-info');
    this.bottomRight = bottomControls.querySelector('.datatable-pagination');
  }
  
  createSearch() {
    const searchDiv = document.createElement('div');
    searchDiv.className = 'datatable-search';
    searchDiv.innerHTML = `
      <div class="input-group" style="width: 250px;">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
        <input type="text" class="form-control" placeholder="Search...">
      </div>
    `;
    
    const searchInput = searchDiv.querySelector('input');
    searchInput.addEventListener('input', (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.filterRows();
      this.currentPage = 1;
      this.render();
    });
    
    this.topRight.appendChild(searchDiv);
  }
  
  createPerPageSelector() {
    const selectorDiv = document.createElement('div');
    selectorDiv.className = 'd-flex align-items-center gap-2';
    selectorDiv.innerHTML = `
      <label class="mb-0">Show</label>
      <select class="form-select form-select-sm" style="width: auto;">
        ${this.options.perPageOptions.map(opt => 
          `<option value="${opt}" ${opt === this.options.perPage ? 'selected' : ''}>${opt}</option>`
        ).join('')}
      </select>
      <label class="mb-0">entries</label>
    `;
    
    const select = selectorDiv.querySelector('select');
    select.addEventListener('change', (e) => {
      this.options.perPage = parseInt(e.target.value);
      this.currentPage = 1;
      this.render();
    });
    
    this.topLeft.appendChild(selectorDiv);
  }
  
  addSorting() {
    const headers = this.table.querySelectorAll('thead th');
    headers.forEach((header, index) => {
      header.style.cursor = 'pointer';
      header.style.userSelect = 'none';
      header.classList.add('sortable');
      
      // Add sort icon
      const icon = document.createElement('i');
      icon.className = 'fas fa-sort ms-1 text-muted';
      icon.style.fontSize = '0.8em';
      header.appendChild(icon);
      
      header.addEventListener('click', () => {
        this.sort(index);
      });
    });
  }
  
  sort(column) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    // Update sort icons
    const headers = this.table.querySelectorAll('thead th');
    headers.forEach((header, index) => {
      const icon = header.querySelector('i');
      if (index === column) {
        icon.className = `fas fa-sort-${this.sortDirection === 'asc' ? 'up' : 'down'} ms-1 text-primary`;
      } else {
        icon.className = 'fas fa-sort ms-1 text-muted';
      }
    });
    
    // Sort rows
    this.filteredRows.sort((a, b) => {
      const aVal = a.cells[column].textContent.trim();
      const bVal = b.cells[column].textContent.trim();
      
      // Try to parse as number
      const aNum = parseFloat(aVal.replace(/[^0-9.-]/g, ''));
      const bNum = parseFloat(bVal.replace(/[^0-9.-]/g, ''));
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return this.sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      // Sort as string
      if (this.sortDirection === 'asc') {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    });
    
    this.render();
  }
  
  filterRows() {
    if (!this.searchTerm) {
      this.filteredRows = [...this.originalRows];
    } else {
      this.filteredRows = this.originalRows.filter(row => {
        return Array.from(row.cells).some(cell => 
          cell.textContent.toLowerCase().includes(this.searchTerm)
        );
      });
    }
  }
  
  createPagination() {
    // Pagination will be updated in render()
  }
  
  render() {
    const tbody = this.table.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Calculate pagination
    const totalPages = Math.ceil(this.filteredRows.length / this.options.perPage);
    const start = (this.currentPage - 1) * this.options.perPage;
    const end = start + this.options.perPage;
    
    // Show current page rows
    const pageRows = this.filteredRows.slice(start, end);
    pageRows.forEach(row => tbody.appendChild(row.cloneNode(true)));
    
    // Update info
    this.bottomLeft.innerHTML = `
      Showing ${start + 1} to ${Math.min(end, this.filteredRows.length)} 
      of ${this.filteredRows.length} entries
      ${this.searchTerm ? ` (filtered from ${this.originalRows.length} total)` : ''}
    `;
    
    // Update pagination
    this.bottomRight.innerHTML = '';
    if (totalPages > 1) {
      const pagination = document.createElement('nav');
      pagination.innerHTML = `
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="prev">Previous</a>
          </li>
          ${this.generatePageNumbers(totalPages)}
          <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="next">Next</a>
          </li>
        </ul>
      `;
      
      pagination.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.closest('.page-link');
        if (!target) return;
        
        const page = target.dataset.page;
        if (page === 'prev' && this.currentPage > 1) {
          this.currentPage--;
        } else if (page === 'next' && this.currentPage < totalPages) {
          this.currentPage++;
        } else if (page && page !== 'prev' && page !== 'next') {
          this.currentPage = parseInt(page);
        }
        
        this.render();
      });
      
      this.bottomRight.appendChild(pagination);
    }
  }
  
  generatePageNumbers(totalPages) {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(`
          <li class="page-item ${this.currentPage === i ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>
        `);
      }
    } else {
      // Always show first page
      pages.push(`
        <li class="page-item ${this.currentPage === 1 ? 'active' : ''}">
          <a class="page-link" href="#" data-page="1">1</a>
        </li>
      `);
      
      // Add ellipsis if needed
      if (this.currentPage > 3) {
        pages.push('<li class="page-item disabled"><span class="page-link">...</span></li>');
      }
      
      // Show current page and neighbors
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(totalPages - 1, this.currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(`
          <li class="page-item ${this.currentPage === i ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>
        `);
      }
      
      // Add ellipsis if needed
      if (this.currentPage < totalPages - 2) {
        pages.push('<li class="page-item disabled"><span class="page-link">...</span></li>');
      }
      
      // Always show last page
      pages.push(`
        <li class="page-item ${this.currentPage === totalPages ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
        </li>
      `);
    }
    
    return pages.join('');
  }
}

// Export functionality
function exportTableToCSV(tableId, filename = 'export.csv') {
  const table = document.getElementById(tableId);
  if (!table) return;
  
  const rows = table.querySelectorAll('tr');
  const csv = [];
  
  rows.forEach(row => {
    const cells = row.querySelectorAll('td, th');
    const rowData = Array.from(cells).map(cell => {
      // Remove HTML and escape quotes
      let text = cell.textContent.replace(/"/g, '""');
      return `"${text}"`;
    });
    csv.push(rowData.join(','));
  });
  
  // Create download link
  const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize first table
  new SimpleDataTable('dataTable', {
    perPage: 10,
    perPageOptions: [5, 10, 25, 50]
  });
  
  // Initialize export table with export button
  const exportTable = document.getElementById('exportTable');
  if (exportTable) {
    new SimpleDataTable('exportTable', {
      perPage: 5,
      perPageOptions: [5, 10, 25]
    });
    
    // Add export button
    const cardHeader = exportTable.closest('.card').querySelector('.card-header');
    if (cardHeader) {
      const exportBtn = document.createElement('button');
      exportBtn.className = 'btn btn-sm btn-primary float-end';
      exportBtn.innerHTML = '<i class="fas fa-download me-1"></i> Export CSV';
      exportBtn.onclick = () => exportTableToCSV('exportTable', 'products.csv');
      cardHeader.appendChild(exportBtn);
    }
  }
});

export { SimpleDataTable, exportTableToCSV };