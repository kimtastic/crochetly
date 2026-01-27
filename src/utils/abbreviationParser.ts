// Utility for parsing crochet abbreviation data from markdown files
// Handles different table formats across language files

export interface Abbreviation {
  sourceAbbr: string;
  sourceTerm?: string;
  targetAbbr: string;
  targetTerm?: string;
  description?: string;
  category?: string;
}

export interface LanguageData {
  code: string;
  name: string;
  filename: string;
  abbreviations: Abbreviation[];
}

/**
 * Parse markdown table rows into array of objects
 */
export function parseMarkdownTable(markdown: string): string[][] {
  const lines = markdown.split('\n');
  const tableRows: string[][] = [];
  let inTable = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip if not a table row
    if (!line.startsWith('|')) continue;
    
    // Skip header separator line (|---|---|)
    if (line.includes('---')) continue;
    
    // Parse table row
    const cells = line.split('|')
      .map(cell => cell.trim())
      .filter(cell => cell !== '');
    
    if (cells.length > 1) {
      tableRows.push(cells);
    }
  }
  
  return tableRows;
}

/**
 * Extract abbreviations from US/UK English files
 */
export function parseEnglishAbbreviations(markdown: string): Abbreviation[] {
  const rows = parseMarkdownTable(markdown);
  const abbreviations: Abbreviation[] = [];
  
  rows.forEach(row => {
    if (row.length >= 2) {
      const abbr = row[0].replace(/`/g, '').trim();
      const desc = row[1].trim();
      
      abbreviations.push({
        sourceAbbr: abbr,
        sourceTerm: desc,
        targetAbbr: abbr,
        targetTerm: desc,
        description: desc
      });
    }
  });
  
  return abbreviations;
}

/**
 * Extract abbreviations from French/Spanish files
 */
export function parseForeignAbbreviations(markdown: string): Abbreviation[] {
  const rows = parseMarkdownTable(markdown);
  const abbreviations: Abbreviation[] = [];
  
  rows.forEach(row => {
    if (row.length >= 4) {
      const abbr = row[0].replace(/`/g, '').trim();
      const term = row[1].trim();
      const desc = row[2].trim();
      const englishEq = row[3].trim();
      
      abbreviations.push({
        sourceAbbr: abbr,
        sourceTerm: term,
        targetAbbr: englishEq,
        targetTerm: englishEq,
        description: desc
      });
    }
  });
  
  return abbreviations;
}

/**
 * Extract abbreviations from Japanese files
 */
export function parseJapaneseAbbreviations(markdown: string): Abbreviation[] {
  const rows = parseMarkdownTable(markdown);
  const abbreviations: Abbreviation[] = [];
  
  rows.forEach(row => {
    if (row.length >= 4) {
      const symbol = row[0].replace(/`/g, '').trim();
      const japanese = row[1].trim();
      const romaji = row[2].trim();
      const englishEq = row[3].trim();
      const usAbbr = row[4]?.replace(/`/g, '').trim() || '';
      
      abbreviations.push({
        sourceAbbr: symbol,
        sourceTerm: `${japanese} (${romaji})`,
        targetAbbr: usAbbr || englishEq,
        targetTerm: englishEq,
        description: romaji
      });
    }
  });
  
  return abbreviations;
}

/**
 * Extract cross-reference data from multilingual file
 */
export function parseMultilingualCrossReference(markdown: string): Record<string, Record<string, string>> {
  const rows = parseMarkdownTable(markdown);
  const crossRef: Record<string, Record<string, string>> = {};
  
  rows.forEach(row => {
    if (row.length >= 6) {
      const concept = row[0].trim();
      const us = row[1].trim();
      const uk = row[2].trim();
      const japanese = row[3].trim();
      const spanish = row[4].trim();
      const french = row[5].trim();
      
      crossRef[concept] = {
        us,
        uk,
        japanese,
        spanish,
        french
      };
    }
  });
  
  return crossRef;
}

/**
 * Determine file type and parse accordingly
 */
export function parseAbbreviationFile(filename: string, content: string): Abbreviation[] {
  if (filename.includes('multilingual')) {
    return []; // Handle separately for cross-reference
  }
  
  if (filename.includes('-jp') || filename.includes('-japanese')) {
    return parseJapaneseAbbreviations(content);
  }
  
  if (filename.includes('-fr') || filename.includes('-french') || 
      filename.includes('-es') || filename.includes('-spanish')) {
    return parseForeignAbbreviations(content);
  }
  
  // Default to English format
  return parseEnglishAbbreviations(content);
}

/**
 * Detect available abbreviation files and their languages
 */
export function detectAvailableLanguages(): LanguageData[] {
  const languages: LanguageData[] = [
    { code: 'us', name: 'US English', filename: 'crochet-abbreviations-us.md', abbreviations: [] },
    { code: 'uk', name: 'UK English', filename: 'crochet-abbreviations-uk.md', abbreviations: [] },
    { code: 'fr', name: 'French', filename: 'crochet-abbreviations-fr.md', abbreviations: [] },
    { code: 'es', name: 'Spanish', filename: 'crochet-abbreviations-es.md', abbreviations: [] },
    { code: 'jp', name: 'Japanese', filename: 'crochet-abbreviations-jp.md', abbreviations: [] }
  ];
  
  return languages;
}

/**
 * Filter abbreviations by category
 */
export function filterByCategory(abbreviations: Abbreviation[], categories: string[]): Abbreviation[] {
  if (categories.length === 0) return abbreviations;
  
  return abbreviations.filter(abbrev => {
    if (!abbrev.category) return true; // Include uncategorized items
    return categories.includes(abbrev.category);
  });
}

/**
 * Create bilingual abbreviation mapping between two languages
 */
export function createBilingualMapping(
  sourceLang: Abbreviation[], 
  targetLang: Abbreviation[]
): Abbreviation[] {
  const bilingual: Abbreviation[] = [];
  
  // Create lookup for target language
  const targetLookup = new Map<string, Abbreviation>();
  targetLang.forEach(item => {
    targetLookup.set(item.sourceAbbr.toLowerCase(), item);
  });
  
  // Map source to target
  sourceLang.forEach(sourceItem => {
    const targetItem = targetLookup.get(sourceItem.sourceAbbr.toLowerCase());
    
    if (targetItem) {
      bilingual.push({
        sourceAbbr: sourceItem.sourceAbbr,
        sourceTerm: sourceItem.sourceTerm,
        targetAbbr: targetItem.sourceAbbr,
        targetTerm: targetItem.sourceTerm,
        description: sourceItem.description
      });
    } else {
      // No direct match found, use English fallback
      bilingual.push({
        sourceAbbr: sourceItem.sourceAbbr,
        sourceTerm: sourceItem.sourceTerm,
        targetAbbr: sourceItem.sourceAbbr, // Fallback to same
        targetTerm: sourceItem.targetTerm || sourceItem.sourceTerm,
        description: sourceItem.description
      });
    }
  });
  
  return bilingual;
}