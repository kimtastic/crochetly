import { execSync } from 'child_process';
import { statSync } from 'fs';

function getFileDate(filePath) {
  try {
    const date = execSync(
      `git log -1 --format="%ad" --date=format:"%B %d, %Y" -- "${filePath}"`,
      { encoding: 'utf-8', cwd: process.cwd() }
    ).trim();
    if (date) return date;
  } catch {}

  try {
    const mtime = statSync(filePath).mtime;
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[mtime.getMonth()]} ${mtime.getDate()}, ${mtime.getFullYear()}`;
  } catch {}

  return null;
}

export default function remarkTrustSection() {
  return function (tree, vfile) {
    const filePath = vfile.path;
    if (!filePath || !filePath.includes(process.cwd())) return;

    if (!filePath.includes('/src/content/docs/')) return;

    const filename = filePath.split('/').pop();
    if (filename === 'index.mdx') return;

    const date = getFileDate(filePath);
    if (!date) return;

    for (let i = 0; i < Math.min(tree.children.length, 3); i++) {
      const child = tree.children[i];
      if (child.type !== 'paragraph') continue;
      const text = child.children
        ?.map(n => ('value' in n ? n.value : ''))
        .join('') || '';
      if (text.includes('Author:')) return;
    }

    tree.children.unshift({
      type: 'paragraph',
      children: [
        { type: 'strong', children: [{ type: 'text', value: 'Author:' }] },
        { type: 'text', value: ' Crochetly \u00B7 ' },
        { type: 'strong', children: [{ type: 'text', value: 'Last updated:' }] },
        { type: 'text', value: ` ${date}` },
      ],
    });
  };
}
