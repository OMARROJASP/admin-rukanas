"use client";

type Columns<T> = {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Columns<T>[];
  rowKey: keyof T;
};

export default function Table<T>({
  data,
  rowKey,
  columns  
}: TableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className=" min-w-full  border border-gray-200 rounded-lg">
            <thead>
  <tr className="bg-gray-100">
    {columns.map((col) => (
      <th key={String(col.key)} className="px-4 py-2 text-left border-b">
        {col.header}
      </th>
    ))}
  </tr>
</thead>
<tbody>
  {data.map((row) => (
    <tr key={String(row[rowKey])} className="border-b hover:bg-gray-50">
      {columns.map((col) => (
        <td key={`${String(row[rowKey])}-${String(col.key)}`} className="px-4 py-2">
          {col.render ? col.render(row) : String(row[col.key])}
        </td>
      ))}
    </tr>
  ))}
</tbody>

    </table>
            
        </div>
    
    );
}
