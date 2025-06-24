import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

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
    const canvas = await html2canvas(gridRef.current);
    const link = document.createElement('a');
    link.download = 'crochet-pattern.png';
    link.href = canvas.toDataURL();
    link.click();
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
    const url = URL.createObjectURL(blob);
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
          <h3>Mosaic Generator</h3>

          <label>
            Rows:
            <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
          </label>

          <label>
            Columns:
            <input type="number" value={cols} onChange={(e) => setCols(Number(e.target.value))} />
          </label>

          <label>
            Pattern Color:
            <input type="color" value={patternColor} onChange={(e) => setPatternColor(e.target.value)} />
          </label>

          <label>
            Background Color:
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </label>

          <button onClick={resetGrid}>Reset Grid</button>
          <button onClick={exportAsPNG}>Export to PNG</button>
          <button onClick={exportAsHTML}>Export to HTML</button>
        </aside>

        <div className="grid" ref={gridRef}>
          {generateGrid()}
        </div>
      </div>

      <style>{`
  .grid-tool-wrapper {
    font-family: 'Inter', sans-serif;
    background-color: #f9fafb;
    padding: 3rem;
    display: flex;
    justify-content: center;
  }

  .grid-tool {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .controls {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

    .controls h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .controls label {
    font-size: 0.95rem;
    display: flex;
    flex-direction: column;
    color: #333;
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
  }

  input[type="number"] {
    width: 60px;
    margin-left: 0.5rem;
  }

  input[type="color"] {
    margin-left: 0.5rem;
  }

  button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: 1px solid #666;
    background: #eee;
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  button:hover {
    background-color: #2563eb;
  }
`}</style>
    </div>
  );
}
