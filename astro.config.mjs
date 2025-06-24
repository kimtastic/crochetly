// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  base: '/docs/',

  integrations: [
    starlight({
      title: 'Crochetly',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/kimtastic/crochetly' },
      ],
      sidebar: [
        {
          label: 'Start here',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Terms and measurements',
          autogenerate: { directory: 'terms' },
        },
        {
          label: 'Abbreviations',
          autogenerate: { directory: 'abbreviations' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Templates',
          autogenerate: { directory: 'templates' },
        },
        {
          label: 'Style Guide',
          autogenerate: { directory: 'style guide' },
        },
      ],
    }),
    react(),
  ],
});


