// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import starlightDocSearch from "@astrojs/starlight-docsearch";
import starlightImageZoom from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({

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


