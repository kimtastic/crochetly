// Cheat Sheet Generator for Crochet Abbreviations - React Component Version
// This component provides an interactive tool for generating bilingual cheat sheets

import { useState, useEffect } from 'react';

export default function CheatSheetGenerator() {
  // Available languages
  const availableLanguages = [
    { code: 'us', name: 'US English' },
    { code: 'uk', name: 'UK English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'jp', name: 'Japanese' }
  ];
  
  // State management
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [abbreviations, setAbbreviations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [exportInProgress, setExportInProgress] = useState(false);

  // Parse markdown table based on language type
  const parseMarkdownTable = (content, languageCode) => {
    const lines = content.split('\n');
    const abbreviations = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line.startsWith('|')) continue;
      if (line.includes('---')) continue;
      
      const cells = line.split('|')
        .map(cell => cell.trim())
        .filter(cell => cell !== '');
      
      if (cells.length >= 2) {
        const abbr = cells[0].replace(/`/g, '').trim();
        
        // Handle US/UK format: | Abbreviation | Description |
        if ((languageCode === 'us' || languageCode === 'uk') && cells.length >= 2) {
          const desc = cells[1].trim();
          if (abbr && desc) {
            abbreviations.push({
              sourceAbbr: abbr,
              sourceTerm: desc,
              targetAbbr: abbr,
              targetTerm: desc,
              description: desc
            });
          }
        }
        // Handle foreign language format: | Abbreviation | Foreign Term | Description | English Equivalent |
        else if (cells.length >= 4) {
          const term = cells[1].trim();
          const desc = cells[2].trim();
          const englishEq = cells[3].trim();
          
          if (abbr && (term || desc)) {
            abbreviations.push({
              sourceAbbr: abbr,
              sourceTerm: term || desc,
              targetAbbr: englishEq || abbr,
              targetTerm: englishEq || desc,
              description: desc
            });
          }
        }
      }
    }
    
    return abbreviations;
  };

  // Load abbreviation data for a single language
  const loadLanguageData = async (languageCode) => {
    try {
      const response = await fetch(`/abbreviations/crochet-abbreviations-${languageCode}/index.md`);
      if (!response.ok) {
        throw new Error(`Failed to load ${languageCode} abbreviations`);
      }
      const content = await response.text();
      return parseMarkdownTable(content, languageCode);
    } catch (error) {
      console.error(`Error loading ${languageCode}:`, error);
      return [];
    }
  };

  // Create bilingual mapping
  const createBilingualMapping = (sourceData, targetData) => {
    const bilingual = [];
    const targetLookup = new Map();
    
    // Create lookup for target language
    targetData.forEach(item => {
      targetLookup.set(item.sourceAbbr.toLowerCase(), item);
    });
    
    // Map source to target
    sourceData.forEach(sourceItem => {
      const targetItem = targetLookup.get(sourceItem.sourceAbbr.toLowerCase());
      
      if (targetItem) {
        bilingual.push({
          sourceAbbr: sourceItem.sourceAbbr,
          sourceTerm: sourceItem.sourceTerm,
          targetAbbr: targetItem.sourceAbbr,
          targetTerm: targetItem.targetTerm,
          description: sourceItem.description
        });
      } else {
        // Fallback to same abbreviation
        bilingual.push({
          sourceAbbr: sourceItem.sourceAbbr,
          sourceTerm: sourceItem.sourceTerm,
          targetAbbr: sourceItem.sourceAbbr,
          targetTerm: sourceItem.targetTerm || sourceItem.sourceTerm,
          description: sourceItem.description
        });
      }
    });
    
    return bilingual;
  };

  // Load abbreviations when languages change
  useEffect(() => {
    if (sourceLanguage && targetLanguage) {
      loadAbbreviations();
    } else {
      setAbbreviations([]);
    }
  }, [sourceLanguage, targetLanguage]);

  const loadAbbreviations = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const [sourceData, targetData] = await Promise.all([
        loadLanguageData(sourceLanguage),
        loadLanguageData(targetLanguage)
      ]);
      
      const bilingual = createBilingualMapping(sourceData, targetData);
      setAbbreviations(bilingual.slice(0, 50)); // Limit to 50 for preview
    } catch (error) {
      setError('Failed to load abbreviation data. Please try again.');
      console.error('Error loading abbreviations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Export functionality
  const exportToPNG = () => {
    if (!abbreviations.length) {
      setError('No data to export. Please select languages first.');
      return;
    }

    setExportInProgress(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const cellWidth = 200;
      const cellHeight = 40;
      const rows = abbreviations.length + 1; // +1 for header
      const cols = 2; // Source and Target columns
      
      canvas.width = cols * cellWidth;
      canvas.height = rows * cellHeight;
      
      // Set font
      ctx.font = '12px sans-serif';
      
      // Draw headers
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
      
      // Draw data rows
      ctx.font = '11px sans-serif';
      
      abbreviations.forEach((item, index) => {
        const y = (index + 1) * cellHeight;
        
        // Background
        ctx.fillStyle = index % 2 === 0 ? '#ffffff' : '#f9fafb';
        ctx.fillRect(0, y, canvas.width, cellHeight);
        
        // Border
        ctx.strokeStyle = '#d1d5db';
        ctx.strokeRect(0, y, canvas.width, cellHeight);
        
        // Source column
        ctx.fillStyle = '#111827';
        ctx.textAlign = 'left';
        ctx.fillText(item.sourceAbbr, 10, y + 10);
        
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#6b7280';
        const sourceTerm = item.sourceTerm.length > 25 ? 
          item.sourceTerm.substring(0, 22) + '...' : item.sourceTerm;
        ctx.fillText(sourceTerm, 10, y + 25);
        
        // Target column
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#111827';
        ctx.fillText(item.targetAbbr, cellWidth + 10, y + 10);
        
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#6b7280';
        const targetTerm = item.targetTerm.length > 25 ? 
          item.targetTerm.substring(0, 22) + '...' : item.targetTerm;
        ctx.fillText(targetTerm, cellWidth + 10, y + 25);
      });
      
      // Download
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-8 px-6 rounded-xl mb-8">
        <p className="text-lg opacity-90">
          Generate quick reference guides for crochet abbreviations in any language combination.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          {error}
        </div>
      )}

      {/* Language Selection */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Language
          </label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Select source language...</option>
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Language
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Select target language...</option>
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Preview Section */}
      {sourceLanguage && targetLanguage && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Preview</h3>
            <button
              onClick={exportToPNG}
              disabled={exportInProgress || isLoading || !abbreviations.length}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {exportInProgress ? 'Exporting...' : 'Export to PNG'}
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="text-2xl mb-2">⏳</div>
              <p className="text-gray-600">Loading abbreviation data...</p>
            </div>
          )}

          {!isLoading && abbreviations.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-4 bg-gray-100">
                        {availableLanguages.find(l => l.code === sourceLanguage)?.name || 'Source'}
                      </th>
                      <th className="text-left py-3 px-4 bg-gray-100">
                        {availableLanguages.find(l => l.code === targetLanguage)?.name || 'Target'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {abbreviations.slice(0, 10).map((item, index) => (
                      <tr 
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 border-b border-gray-200'}
                      >
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{item.sourceAbbr}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {item.sourceTerm.length > 30 ? item.sourceTerm.substring(0, 27) + '...' : item.sourceTerm}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{item.targetAbbr}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {item.targetTerm.length > 30 ? item.targetTerm.substring(0, 27) + '...' : item.targetTerm}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {abbreviations.length > 10 && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Showing 10 of {abbreviations.length} abbreviations. Export to PNG for complete list.
                </p>
              )}
            </div>
          )}

          {!isLoading && abbreviations.length === 0 && (
            <div className="text-center py-8">
              <div className="text-2xl mb-2">📋</div>
              <p className="text-gray-600">No abbreviations found for this language combination.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}