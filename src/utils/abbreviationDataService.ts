// Data service for loading and processing crochet abbreviation files
// This will be used by the React component in the Astro page

import { 
  parseAbbreviationFile, 
  detectAvailableLanguages, 
  createBilingualMapping,
  type LanguageData,
  type Abbreviation 
} from './abbreviationParser.js';

// Cache for loaded abbreviation data
let abbreviationCache: Map<string, Abbreviation[]> = new Map();

/**
 * Load abbreviation file content from the abbreviations directory
 */
async function loadAbbreviationFile(filename: string): Promise<string> {
  try {
    const response = await fetch(`/src/content/docs/abbreviations/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return '';
  }
}

/**
 * Load abbreviation data for a specific language
 */
export async function loadLanguageData(languageCode: string): Promise<Abbreviation[]> {
  if (abbreviationCache.has(languageCode)) {
    return abbreviationCache.get(languageCode)!;
  }

  const languages = detectAvailableLanguages();
  const language = languages.find(lang => lang.code === languageCode);
  
  if (!language) {
    console.warn(`Language ${languageCode} not found`);
    return [];
  }

  try {
    const content = await loadAbbreviationFile(language.filename);
    const abbreviations = parseAbbreviationFile(language.filename, content);
    
    // Cache the results
    abbreviationCache.set(languageCode, abbreviations);
    
    return abbreviations;
  } catch (error) {
    console.error(`Error loading language data for ${languageCode}:`, error);
    return [];
  }
}

/**
 * Load all available languages
 */
export async function loadAllLanguages(): Promise<LanguageData[]> {
  const languages = detectAvailableLanguages();
  
  // Load data for each language in parallel
  const languagePromises = languages.map(async (language) => {
    const abbreviations = await loadLanguageData(language.code);
    return { ...language, abbreviations };
  });
  
  return Promise.all(languagePromises);
}

/**
 * Get bilingual abbreviation mapping between two languages
 */
export async function getBilingualAbbreviations(
  sourceCode: string, 
  targetCode: string
): Promise<Abbreviation[]> {
  const [sourceData, targetData] = await Promise.all([
    loadLanguageData(sourceCode),
    loadLanguageData(targetCode)
  ]);
  
  return createBilingualMapping(sourceData, targetData);
}

/**
 * Get available language options for dropdowns
 */
export function getLanguageOptions(): { code: string; name: string }[] {
  const languages = detectAvailableLanguages();
  return languages.map(lang => ({
    code: lang.code,
    name: lang.name
  }));
}

/**
 * Preload common language pairs for better performance
 */
export async function preloadCommonLanguages(): Promise<void> {
  const commonLanguages = ['us', 'uk', 'fr', 'es'];
  
  await Promise.all(
    commonLanguages.map(code => loadLanguageData(code))
  );
}

/**
 * Clear the abbreviation cache (useful for testing or updates)
 */
export function clearAbbreviationCache(): void {
  abbreviationCache.clear();
}