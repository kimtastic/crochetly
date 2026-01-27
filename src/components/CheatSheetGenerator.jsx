import React, { useState, useEffect } from 'react';

export default function CheatSheetGenerator() {
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const availableLanguages = [
    { code: 'us', name: 'US English' },
    { code: 'uk', name: 'UK English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'jp', name: 'Japanese' }
  ];

  const sampleData = {
    'fr-to-us': [
      { sourceAbbr: 'ml', sourceTerm: 'maille en l\'air', targetAbbr: 'ch', targetTerm: 'chain' },
      { sourceAbbr: 'mc', sourceTerm: 'maille coulée', targetAbbr: 'sl st', targetTerm: 'slip stitch' },
      { sourceAbbr: 'ms', sourceTerm: 'maille serrée', targetAbbr: 'sc', targetTerm: 'single crochet' }
    ],
    'es-to-us': [
      { sourceAbbr: 'cad', sourceTerm: 'cadena', targetAbbr: 'ch', targetTerm: 'chain' },
      { sourceAbbr: 'pb', sourceTerm: 'punto bajo', targetAbbr: 'sc', targetTerm: 'single crochet' }
    ]
  };

  const [abbreviations, setAbbreviations] = useState([]);
  const [exportInProgress, setExportInProgress] = useState(false);

  useEffect(() => {
    if (sourceLanguage && targetLanguage) {
      const key = `${sourceLanguage}-to-${targetLanguage}`;
      const data = sampleData[key] || [];
      setAbbreviations(data);
    } else {
      setAbbreviations([]);
    }
  }, [sourceLanguage, targetLanguage]);

  const exportToPNG = () => {
    if (!abbreviations.length) {
      setError('No data to export. Please select languages first.');
      return;
    }

    setExportInProgress(true);
    setError('');
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const cellWidth = 200;
      const cellHeight = 40;
      const rows = abbreviations.length + 1;
      const cols = 2;
      
      canvas.width = cols * cellWidth;
      canvas.height = rows * cellHeight;
      
      ctx.font = '12px sans-serif';
      
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, cellWidth, cellHeight);
      ctx.fillRect(cellWidth, 0, cellWidth, cellHeight);
      
      ctx.strokeStyle = '#d1d5db';
      ctx.strokeRect(0, 0, canvas.width, cellHeight);
      
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const sourceName = availableLanguages.find(l => l.code === sourceLanguage)?.name || sourceLanguage;
      const targetName = availableLanguages.find(l => l.code === targetLanguage)?.name || targetLanguage;
      
      ctx.fillText(sourceName, cellWidth / 2, cellHeight / 2);
      ctx.fillText(targetName, cellWidth * 1.5, cellHeight / 2);
      
      ctx.font = '11px sans-serif';
      
      abbreviations.forEach((item, index) => {
        const y = (index + 1) * cellHeight;
        
        ctx.fillStyle = index % 2 === 0 ? '#ffffff' : '#f9fafb';
        ctx.fillRect(0, y, canvas.width, cellHeight);
        
        ctx.strokeStyle = '#d1d5db';
        ctx.strokeRect(0, y, canvas.width, cellHeight);
        
        ctx.fillStyle = '#111827';
        ctx.textAlign = 'left';
        ctx.fillText(item.sourceAbbr, 10, y + 10);
        
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#6b7280';
        const sourceTerm = item.sourceTerm.length > 25 ? 
          item.sourceTerm.substring(0, 22) + '...' : item.sourceTerm;
        ctx.fillText(sourceTerm, 10, y + 25);
        
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#111827';
        ctx.fillText(item.targetAbbr, cellWidth + 10, y + 10);
        
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#6b7280';
        const targetTerm = item.targetTerm.length > 25 ? 
          item.targetTerm.substring(0, 22) + '...' : item.targetTerm;
        ctx.fillText(targetTerm, cellWidth + 10, y + 25);
      });
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `crochet-abbreviations-${sourceLanguage}-to-${targetLanguage}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
      
    } catch (error) {
      setError('Failed to export image. Please try again.');
      console.error('Export error:', error);
    } finally {
      setExportInProgress(false);
    }
  };

  return React.createElement('div', { className: 'max-w-4xl mx-auto p-6' }, [
    React.createElement('div', { 
      className: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12 px-6 rounded-xl mb-8'
    }, [
      React.createElement('h1', { className: 'text-4xl font-bold mb-4' }, 'Cheat Sheet Generator'),
      React.createElement('p', { className: 'text-lg opacity-90' }, 
        'Generate quick reference guides for crochet abbreviations in any language combination.'
      )
    ]),

    error && React.createElement('div', { 
      className: 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md' 
    }, error),

    React.createElement('div', { className: 'grid md:grid-cols-2 gap-8 mb-8' }, [
      React.createElement('div', { className: 'space-y-4' }, [
        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 
          'Source Language'
        ),
        React.createElement('select', {
          value: sourceLanguage,
          onChange: (e) => setSourceLanguage(e.target.value),
          className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500'
        }, [
          React.createElement('option', { value: '' }, 'Select source language...'),
          ...availableLanguages.map(lang => 
            React.createElement('option', { key: lang.code, value: lang.code }, lang.name)
          )
        ])
      ]),

      React.createElement('div', { className: 'space-y-4' }, [
        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 
          'Target Language'
        ),
        React.createElement('select', {
          value: targetLanguage,
          onChange: (e) => setTargetLanguage(e.target.value),
          className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500'
        }, [
          React.createElement('option', { value: '' }, 'Select target language...'),
          ...availableLanguages.map(lang => 
            React.createElement('option', { key: lang.code, value: lang.code }, lang.name)
          )
        ])
      ])
    ]),

    sourceLanguage && targetLanguage && React.createElement('div', { className: 'space-y-4' }, [
      React.createElement('div', { className: 'flex justify-between items-center mb-4' }, [
        React.createElement('h3', { className: 'text-xl font-semibold text-gray-800' }, 'Preview'),
        React.createElement('button', {
          onClick: exportToPNG,
          disabled: exportInProgress || isLoading || !abbreviations.length,
          className: 'bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors'
        }, exportInProgress ? 'Exporting...' : 'Export to PNG')
      ]),

      isLoading && React.createElement('div', { className: 'text-center py-8' }, [
        React.createElement('div', { className: 'text-2xl mb-2' }, '⏳'),
        React.createElement('p', { className: 'text-gray-600' }, 'Loading abbreviation data...')
      ]),

      !isLoading && abbreviations.length > 0 && React.createElement('div', {
        className: 'bg-gray-50 rounded-lg p-6 border border-gray-200'
      }, [
        React.createElement('div', { className: 'overflow-x-auto' }, [
          React.createElement('table', { className: 'w-full text-sm' }, [
            React.createElement('thead', {}, [
              React.createElement('tr', { className: 'border-b border-gray-300' }, [
                React.createElement('th', { className: 'text-left py-3 px-4 bg-gray-100' }, 
                  availableLanguages.find(l => l.code === sourceLanguage)?.name || 'Source'
                ),
                React.createElement('th', { className: 'text-left py-3 px-4 bg-gray-100' }, 
                  availableLanguages.find(l => l.code === targetLanguage)?.name || 'Target'
                )
              ])
            ]),
            React.createElement('tbody', {}, 
              abbreviations.slice(0, 10).map((item, index) => 
                React.createElement('tr', { 
                  key: index,
                  className: index % 2 === 0 ? 'bg-white' : 'bg-gray-50 border-b border-gray-200'
                }, [
                  React.createElement('td', { className: 'py-3 px-4' }, [
                    React.createElement('div', { className: 'font-medium text-gray-900' }, item.sourceAbbr),
                    React.createElement('div', { className: 'text-xs text-gray-600 mt-1' }, 
                      item.sourceTerm.length > 30 ? item.sourceTerm.substring(0, 27) + '...' : item.sourceTerm
                    )
                  ]),
                  React.createElement('td', { className: 'py-3 px-4' }, [
                    React.createElement('div', { className: 'font-medium text-gray-900' }, item.targetAbbr),
                    React.createElement('div', { className: 'text-xs text-gray-600 mt-1' }, 
                      item.targetTerm.length > 30 ? item.targetTerm.substring(0, 27) + '...' : item.targetTerm
                    )
                  ])
                ])
              )
            )
          ])
        ]),
        abbreviations.length > 10 && React.createElement('p', { 
          className: 'text-center text-sm text-gray-500 mt-4' 
        }, `Showing 10 of ${abbreviations.length} abbreviations. Export to PNG for complete list.`)
      ])
    ])
  ]);
}