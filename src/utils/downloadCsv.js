/**
 * downloadCsv — reusable CSV export utility
 *
 * @param {Array<{ label: string, format: (row: object) => string }>} columns
 * @param {Array<object>} rows
 * @param {string} filename
 *
 * Usage:
 *   downloadCsv(
 *     [
 *       { label: 'Date',   format: (row) => new Date(row.createdAt).toLocaleDateString() },
 *       { label: 'Amount', format: (row) => `$${row.amount}` },
 *       { label: 'Status', format: (row) => row.status },
 *     ],
 *     transactions,
 *     'withdrawals.csv'
 *   );
 */
export function downloadCsv(columns, rows, filename = 'export.csv') {
  const escape = (val) => {
    const str = val == null ? '' : String(val);
    return str.includes(',') || str.includes('"') || str.includes('\n')
      ? `"${str.replaceAll('"', '""')}"`
      : str;
  };

  const header = columns.map((c) => escape(c.label)).join(',');
  const body   = rows.map((row) =>
    columns.map((c) => escape(c.format(row))).join(',')
  );

  const csv  = [header, ...body].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
