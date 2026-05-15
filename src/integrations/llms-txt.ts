import type { AstroIntegration } from 'astro';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative, extname, sep } from 'path';

interface PageEntry {
  title: string;
  description: string;
  slug: string;
  filePath: string;
}

interface SectionInfo {
  name: string;
  label: string;
  description: string;
  directory: string;
}

const SECTIONS: SectionInfo[] = [
  { name: 'guides', label: 'Guides', description: 'Getting started guides and tutorials for crochet', directory: 'guides' },
  { name: 'terms', label: 'Terms and measurements', description: 'Crochet terminology, gauge, blocking, and swatching references', directory: 'terms' },
  { name: 'abbreviations', label: 'Abbreviations', description: 'Crochet abbreviation references in US, UK, French, Spanish, Japanese, and multilingual', directory: 'abbreviations' },
  { name: 'reference', label: 'Reference', description: 'Crochet reference guides including troubleshooting, measurements, yarn selection, and techniques', directory: 'reference' },
  { name: 'style-guide', label: 'Style Guide', description: 'Pattern writing style guidelines covering formatting, conventions, and best practices', directory: 'style guide' },
  { name: 'templates', label: 'Templates', description: 'Reusable templates for writing crochet patterns', directory: 'templates' },
];

function slugFromPath(filePath: string, baseDir: string): string {
  const rel = relative(baseDir, filePath);
  const withoutExt = rel.replace(extname(rel), '');
  const slug = withoutExt
    .split(sep)
    .map(part => part.replace(/\s+/g, '-'))
    .join('/');
  return slug;
}

function parseFrontmatter(filePath: string): { title: string; description: string } {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return { title: '', description: '' };

    const fm = match[1];
    const result: Record<string, string> = {};
    const lines = fm.split('\n');

    for (const line of lines) {
      const kvMatch = line.match(/^(\w+):\s*(.+)$/);
      if (kvMatch) {
        const key = kvMatch[1];
        const value = kvMatch[2];
        if (!value.startsWith('[') && !value.startsWith('#')) {
          result[key] = value.replace(/^['"]|['"]$/g, '').trim();
        }
      }
    }

    return {
      title: result.title || '',
      description: result.description || '',
    };
  } catch {
    return { title: '', description: '' };
  }
}

export default function llmsTxtIntegration(options: { siteUrl: string }): AstroIntegration {
  let distDir: string;

  return {
    name: 'llms-txt',
    hooks: {
      'astro:config:setup': () => {},

      'astro:build:done': async ({ dir, logger }) => {
        distDir = dir.pathname || dir.toString();

        const contentDir = join(process.cwd(), 'src', 'content', 'docs');
        if (!existsSync(contentDir)) {
          logger.warn('Content directory not found at ' + contentDir);
          return;
        }

        const allPages: PageEntry[] = [];

        for (const section of SECTIONS) {
          const sectionDir = join(contentDir, section.directory);
          if (!existsSync(sectionDir)) {
            logger.warn(`Section directory not found: ${section.directory}`);
            continue;
          }

          const entries = collectPages(sectionDir, contentDir);
          allPages.push(...entries);
        }

        // Generate root llms.txt
        const rootLines = [
          `# Crochetly Documentation`,
          `> Free, educational crochet resource covering stitches, techniques, terminology, and pattern design.`,
          ``,
          `This is the root llms.txt for Crochetly. Each section below links to a more detailed llms.txt file.`,
          ``,
          `## Content Sections`,
          ...SECTIONS.map(
            s =>
              `- [${s.label}](${options.siteUrl}/${s.name}/llms.txt): ${s.description}`
          ),
          ``,
          `## Full Content`,
          `- [All pages (single file)](${options.siteUrl}/llms-full.txt): Every documentation page in one file`,
          ``,
        ];

        writeFileSync(join(distDir, 'llms.txt'), rootLines.join('\n'));
        logger.info('Generated /llms.txt');

        // Generate per-section llms.txt files + /index.md fallback
        for (const section of SECTIONS) {
          const sectionDir = join(contentDir, section.directory);
          if (!existsSync(sectionDir)) continue;

          const entries = collectPages(sectionDir, contentDir);

          const sectionLines = [
            `# ${section.label}`,
            `> ${section.description}`,
            ``,
            ...entries.map(
              e =>
                `- [${e.title}](${options.siteUrl}/${e.slug}/index.md): ${e.description}`
            ),
            ``,
          ];

          const sectionDirOut = join(distDir, section.name);
          mkdirSync(sectionDirOut, { recursive: true });
          writeFileSync(join(sectionDirOut, 'llms.txt'), sectionLines.join('\n'));
          logger.info(`Generated /${section.name}/llms.txt (${entries.length} pages)`);

          // Generate /index.md fallback for each page
          for (const entry of entries) {
            const pageDir = join(distDir, entry.slug);
            mkdirSync(pageDir, { recursive: true });
            const mdContent = readFileSync(entry.filePath, 'utf-8');
            writeFileSync(join(pageDir, 'index.md'), mdContent);
          }
        }

        // Generate llms-full.txt
        const fullLines: string[] = [
          `# Crochetly Documentation (Full)`,
          `> Free, educational crochet resource covering stitches, techniques, terminology, and pattern design.`,
          ``,
          `This file contains ALL Crochetly documentation pages concatenated for agents that prefer a single file.`,
          ``,
        ];

        for (const section of SECTIONS) {
          const sectionDir = join(contentDir, section.directory);
          if (!existsSync(sectionDir)) continue;

          const entries = collectPages(sectionDir, contentDir);

          for (const entry of entries) {
            const content = readFileSync(entry.filePath, 'utf-8');
            const body = content.replace(/^---[\s\S]*?---\r?\n?/, '').trim();
            fullLines.push(`---`);
            fullLines.push(`# ${entry.title}`);
            fullLines.push(`Source: ${options.siteUrl}/${entry.slug}/`);
            fullLines.push(``);
            fullLines.push(body);
            fullLines.push(``);
          }
        }

        writeFileSync(join(distDir, 'llms-full.txt'), fullLines.join('\n'));
        logger.info('Generated /llms-full.txt');
      },
    },
  };
}

function collectPages(dir: string, baseDir: string): PageEntry[] {
  const pages: PageEntry[] = [];

  function walk(currentDir: string) {
    if (!existsSync(currentDir)) return;

    for (const entry of readdirSync(currentDir)) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile() && /\.(md|mdx)$/.test(entry)) {
        const fm = parseFrontmatter(fullPath);
        const title = fm.title;
        const description = fm.description;
        if (title) {
          pages.push({
            title,
            description,
            slug: slugFromPath(fullPath, baseDir),
            filePath: fullPath,
          });
        }
      }
    }
  }

  walk(dir);
  return pages.sort((a, b) => a.slug.localeCompare(b.slug));
}
