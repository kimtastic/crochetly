import React, { useState, useRef } from 'react';

// Helper to normalize RGB to HEX
function rgbToHex(rgb) {
  if (!rgb.startsWith('rgb')) return rgb; // already hex
  const rgbValues = rgb
    .match(/\d+/g)
    .map((v) => parseInt(v).toString(16).padStart(2, '0'));
  return `#${rgbValues.join('')}`;
}

export default function GridTool() {
  const gridRef = useRef(null);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [patternColor, setPatternColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  const resetGrid = () => {
    const cells = gridRef.current?.querySelectorAll('.cell');
    cells?.forEach(cell => {
      cell.style.backgroundColor = bgColor;
    });
  };

  const exportAsPNG = async () => {
    if (!gridRef.current) return;
    
    // Create a temporary canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Calculate canvas size
    const cellSize = 20;
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
    
    // Draw the grid
    const cells = gridRef.current.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = col * cellSize;
      const y = row * cellSize;
      
      // Fill cell with its background color
      ctx.fillStyle = cell.style.backgroundColor || bgColor;
      ctx.fillRect(x, y, cellSize, cellSize);
      
      // Draw border
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellSize, cellSize);
    });
    
    // Download the image
    const link = document.createElement('a');
    link.download = 'crochet-pattern.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const exportAsCsv = () => {
    if (!gridRef.current) return;

    const rows = Array.from(gridRef.current.children);
    const csvContent = rows.map((row) =>
      Array.from(row.children).map((cell) => {
        const bgColor = rgbToHex(cell.style.backgroundColor || 'rgb(255, 255, 255)');
        return bgColor === '#ffffff' ? '0' : '1'; // adjust logic if needed
      }).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'crochet-pattern.csv';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsHTML = () => {
    if (!gridRef.current) return;

    const htmlContent = `
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Crochet Grid Export</title>
        <style>
          .grid { display: flex; flex-direction: column; }
          .row { display: flex; }
          .cell {
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
          }
        </style>
      </head>
      <body>
        <div class="grid">
          ${Array.from(gridRef.current.children).map(row =>
            `<div class="row">${Array.from(row.children).map(cell =>
              `<div class="cell" style="background-color: ${cell.style.backgroundColor};"></div>`
            ).join('')}</div>`
          ).join('')}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(url);
    const link = document.createElement('a');
    link.download = 'crochet-pattern.html';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateGrid = () => {
    const cells = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push(
          <div
            key={`${r}-${c}`}
            className="cell"
            style={{ backgroundColor: bgColor }}
            onClick={(e) => {
              const currentColor = rgbToHex(e.target.style.backgroundColor);
              const isPattern = currentColor.toLowerCase() === patternColor.toLowerCase();
              e.target.style.backgroundColor = isPattern ? bgColor : patternColor;
            }}
          />
        );
      }
      cells.push(
        <div key={r} className="row">
          {row}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="grid-tool-wrapper">
      <div className="grid-tool">
        <aside className="controls">
          <h3>Mosaic Controls</h3>

          <div className="input-group">
            <label htmlFor="rows">Rows:</label>
            <input 
              id="rows"
              type="number" 
              value={rows} 
              onChange={(e) => setRows(Number(e.target.value))} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="cols">Columns:</label>
            <input 
              id="cols"
              type="number" 
              value={cols} 
              onChange={(e) => setCols(Number(e.target.value))} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="pattern-color">Pattern Color:</label>
            <input 
              id="pattern-color"
              type="color" 
              value={patternColor} 
              onChange={(e) => setPatternColor(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="bg-color">Background Color:</label>
            <input 
              id="bg-color"
              type="color" 
              value={bgColor} 
              onChange={(e) => setBgColor(e.target.value)} 
            />
          </div>

          <div className="button-group">
            <button className="btn btn-secondary" onClick={resetGrid}>
              Reset Grid
            </button>
            <button className="btn btn-primary" onClick={exportAsPNG}>
              Export to PNG
            </button>
            <button className="btn btn-success" onClick={exportAsHTML}>
              Export to HTML
            </button>
            <button className="btn btn-purple" onClick={exportAsCsv}>
              Export to CSV
            </button>
          </div>
        </aside>

        <div className="grid-container">
          <div className="grid" ref={gridRef}>
            {generateGrid()}
          </div>
        </div>
      </div>

      <style>{`
        /* Root variables for light/dark mode */
        .grid-tool-wrapper {
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-tertiary: #f1f5f9;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --border-color: #e2e8f0;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --input-bg: #ffffff;
          --input-border: #d1d5db;
              padding: 3rem;
    display: flex;
    justify-content: center;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .grid-tool-wrapper {
            --bg-primary: #1e293b;
            --bg-secondary: #334155;
            --bg-tertiary: #475569;
            --text-primary: #f8fafc;
            --text-secondary: #cbd5e1;
            --border-color: #475569;
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
            --input-bg: #374151;
            --input-border: #6b7280;
                padding: 3rem;
    display: flex;
    justify-content: center;
          }
        }


        .grid-tool {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 2rem;
          background-color: var(--bg-primary);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: var(--shadow);
          transition: background-color 0.3s ease;
        }

        .controls {
          flex: 0 0 200px;
          background-color: var(--bg-tertiary);
          padding: 1.5rem;
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }

        .controls h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1.5rem 0;
          color: var(--text-primary);
        }

        .input-group {
          margin-bottom: 1rem;
        }

        .input-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .input-group input[type="number"] {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid var(--input-border);
          border-radius: 6px;
          background-color: var(--input-bg);
          color: var(--text-primary);
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .input-group input[type="number"]:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .input-group input[type="color"] {
          width: 100%;
          height: 40px;
          border: 1px solid var(--input-border);
          border-radius: 6px;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .btn {
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .btn:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        .btn-secondary {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background-color: var(--bg-tertiary);
        }

        .btn-primary {
          background-color: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background-color: #2563eb;
        }

        .btn-success {
          background-color: #10b981;
          color: white;
        }

        .btn-success:hover {
          background-color: #059669;
        }

        .btn-purple {
          background-color: #8b5cf6;
          color: white;
        }

        .btn-purple:hover {
          background-color: #7c3aed;
        }

        .grid-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 1rem;
        }

        .grid {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin: 0;
          padding: 0;
        }

        .row {
          display: flex;
          gap: 0;
          margin: 0;
          padding: 0;
        }

        .cell {
          width: 20px;
          height: 20px;
          cursor: pointer;
          border: 1px solid #ccc;
          box-sizing: border-box;
          margin: 0;
          transition: opacity 0.1s ease;
        }

        .cell:hover {
          opacity: 0.8;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .grid-tool-wrapper {
            padding: 1rem;
          }
          
          .grid-tool {
            flex-direction: column;
            padding: 1rem;
          }
          
          .controls {
            flex: none;
          }
          
          .button-group {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          .btn {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  );
}