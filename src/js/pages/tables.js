// Tables page specific functionality
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import jszip from 'jszip';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Set up pdfMake fonts
pdfmake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jszip;

export function initializeTablesPage() {
  // Initialize basic DataTable
  const basicTable = document.getElementById('dataTable');
  if (basicTable) {
    new DataTable(basicTable, {
      pageLength: 10,
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records...',
      },
    });
  }

  // Initialize export DataTable
  const exportTable = document.getElementById('exportTable');
  if (exportTable) {
    new DataTable(exportTable, {
      pageLength: 10,
      responsive: true,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'copyHtml5',
          className: 'btn btn-sm btn-flat-color-1',
          text: '<i class="fa fa-copy"></i> Copy',
        },
        {
          extend: 'csvHtml5',
          className: 'btn btn-sm btn-flat-color-2',
          text: '<i class="fa fa-file-csv"></i> CSV',
        },
        {
          extend: 'excelHtml5',
          className: 'btn btn-sm btn-flat-color-3',
          text: '<i class="fa fa-file-excel"></i> Excel',
        },
        {
          extend: 'pdfHtml5',
          className: 'btn btn-sm btn-flat-color-4',
          text: '<i class="fa fa-file-pdf"></i> PDF',
        },
        {
          extend: 'print',
          className: 'btn btn-sm btn-flat-color-5',
          text: '<i class="fa fa-print"></i> Print',
        },
      ],
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search products...',
      },
    });
  }

  // Initialize any other datatables on the page
  const allTables = document.querySelectorAll('.datatable:not(#dataTable):not(#exportTable)');
  allTables.forEach(table => {
    new DataTable(table, {
      pageLength: 10,
      responsive: true,
    });
  });
}
