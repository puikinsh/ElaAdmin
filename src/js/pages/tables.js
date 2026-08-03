// Tables page specific functionality (DataTables 3 + Buttons 4)
import DataTable from 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';

/**
 * Excel and PDF export pull in JSZip (~100 kB) and pdfmake (~2 MB).
 * They are loaded on demand so pages that never export stay lightweight,
 * and are registered through the Buttons 4 setters rather than globals.
 */
let exportLibs;

function loadExportLibs() {
  exportLibs ??= (async () => {
    const [jszip, pdfmake, vfs] = await Promise.all([
      import('jszip'),
      import('pdfmake/build/pdfmake'),
      import('pdfmake/build/vfs_fonts'),
    ]);

    const JSZip = jszip.default ?? jszip;
    const pdfMake = pdfmake.default ?? pdfmake;
    const fonts = vfs.default ?? vfs;

    // pdfmake 0.2 nested the file table under `.pdfMake.vfs`; 0.3 exports it directly.
    pdfMake.vfs = fonts?.pdfMake?.vfs ?? fonts;

    DataTable.Buttons.jszip(JSZip);
    DataTable.Buttons.pdfMake(pdfMake);
  })();

  return exportLibs;
}

const baseConfig = {
  pageLength: 10,
  responsive: true,
  language: {
    search: '_INPUT_',
    searchPlaceholder: 'Search records...',
  },
};

const exportButtons = [
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
];

export async function initializeTablesPage() {
  // Basic DataTable
  const basicTable = document.getElementById('dataTable');
  if (basicTable) {
    new DataTable(basicTable, baseConfig);
  }

  // Any other tables marked up for DataTables
  document.querySelectorAll('.datatable:not(#dataTable):not(#exportTable)').forEach(table => {
    new DataTable(table, { pageLength: 10, responsive: true });
  });

  // Export-enabled DataTable — needs JSZip/pdfmake registered before init so
  // that Buttons' `available()` checks pass and the buttons render.
  const exportTable = document.getElementById('exportTable');
  if (!exportTable) return;

  await loadExportLibs();

  new DataTable(exportTable, {
    ...baseConfig,
    // DataTables 3 removed the `dom` option in favour of `layout`.
    layout: {
      topStart: 'buttons',
      topEnd: 'search',
      bottomStart: 'info',
      bottomEnd: 'paging',
    },
    buttons: exportButtons,
    language: {
      search: '_INPUT_',
      searchPlaceholder: 'Search products...',
    },
  });
}
