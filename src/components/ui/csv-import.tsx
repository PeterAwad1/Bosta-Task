import { useRef, useState } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export default function CSVImport() {
  const [importedData, setImportedData] = useState<string[][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          parseCSV(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (text: string) => {
    try {
      const rows = text.split('\n');
      const parsedData = rows.map((row) =>
        row.split(',').map((cell) => cell.trim()),
      );
      setImportedData(parsedData);
    } catch (err) {
      toast.error("Error parsing CSV file. Please make sure it's a valid CSV.");
      setImportedData([]);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='mx-auto max-w-md p-4'>
      <input
        type='file'
        accept='.csv'
        onChange={handleFileChange}
        ref={fileInputRef}
        className='hidden'
      />
      <Button onClick={handleImportClick}>Import CSV</Button>

      {importedData.length > 0 && (
        <div className='mt-4'>
          <h2 className='mb-2 text-lg font-semibold'>Imported Data:</h2>
          <div className='max-h-60 overflow-auto rounded-md bg-gray-100 p-4'>
            <table className='min-w-full'>
              <tbody>
                {importedData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className='border px-2 py-1'
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
