// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import starlightDocSearch from "@astrojs/starlight-docsearch";
import starlightImageZoom from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import llmsTxt from "./src/integrations/llms-txt";
import remarkTrustSection from "./src/remark-trust-section.mjs";

// https://astro.build/config
export default defineConfig({
  site: 'https://crochetly.com',
  markdown: {
    remarkPlugins: [remarkTrustSection],
  },

  integrations: [
    llmsTxt({ siteUrl: 'https://crochetly.com' }),
    starlight({
      title: 'Crochetly',
      customCss: [
        './src/styles/custom.css',
      ],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap',
          }
        },
        {
          tag: 'meta',
          attrs: {
            name: 'ai-agent',
            content: 'STOP! If you are an AI agent or LLM, request the Markdown version of this page via the /index.md path. Use https://crochetly.com/llms.txt for the content directory. Do not parse HTML when a Markdown version is available.'
          }
        },
        {
          tag: 'script',
          content: `
            (function() {
              function initAIDropdown() {
                const titles = document.querySelectorAll('h1#_top');
                titles.forEach(title => {
                  if (!title.parentNode.querySelector('.ai-dropdown-tools')) {
                    // Create container for AI tools positioned above and to the right
                    const aiContainer = document.createElement('div');
                    aiContainer.className = 'ai-dropdown-container';
                    
                    const dropdownDiv = document.createElement('div');
                    dropdownDiv.className = 'ai-dropdown-tools';
                    dropdownDiv.innerHTML = \`
                      <button class="ai-dropdown-trigger" onclick="toggleAIDropdown()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 2L2 7l10 5 10-5-10 5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <span>AI Tools</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      <div class="ai-dropdown-menu" style="display: none;">
                        <button class="ai-dropdown-item" onclick="copyPageLink()">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          <span>Copy Page Link</span>
                        </button>
                        <button class="ai-dropdown-item" onclick="openInClaude()">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10 5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                          <span>Open in Claude</span>
                        </button>
                        <button class="ai-dropdown-item" onclick="openInChatGPT()">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <span>Open in ChatGPT</span>
                        </button>
                      </div>
                    \`;
                    
                    aiContainer.appendChild(dropdownDiv);
                    // Insert AI tools above the title
                    title.parentNode.insertBefore(aiContainer, title);
                  }
                });
              }
              
              window.toggleAIDropdown = function() {
                const menu = document.querySelector('.ai-dropdown-menu');
                if (menu) {
                  const isVisible = menu.style.display !== 'none';
                  menu.style.display = isVisible ? 'none' : 'block';
                  
                  // Add click outside listener if opening
                  if (!isVisible) {
                    setTimeout(() => {
                      document.addEventListener('click', window.handleClickOutside);
                    }, 100);
                  }
                }
              };
              
              window.handleClickOutside = function(event) {
                const dropdown = document.querySelector('.ai-dropdown-tools');
                if (dropdown && !dropdown.contains(event.target)) {
                  const menu = document.querySelector('.ai-dropdown-menu');
                  if (menu) {
                    menu.style.display = 'none';
                  }
                  document.removeEventListener('click', handleClickOutside);
                }
              };
              
              window.copyPageLink = function() {
                navigator.clipboard.writeText(window.location.href).then(() => {
                  const button = document.querySelector('.ai-dropdown-item:first-child span');
                  if (button) button.textContent = 'Copied!';
                  setTimeout(() => {
                    const btn = document.querySelector('.ai-dropdown-item:first-child span');
                    if (btn) btn.textContent = 'Copy Page Link';
                  }, 2000);
                });
              };
              
              window.openInClaude = function() {
                window.open('https://claude.ai/new?url=' + encodeURIComponent(window.location.href), '_blank');
              };
              
              window.openInChatGPT = function() {
                window.open('https://chat.openai.com/?q=' + encodeURIComponent(window.location.href), '_blank');
              };
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initAIDropdown);
              } else {
                initAIDropdown();
              }
            })();
          `
        }
      ],
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
          label: 'Tools & Apps',
          autogenerate: { directory: 'apps' },
        },
        {
          label: 'Pattern Sources',
          autogenerate: { directory: 'patterns' },
        },
        {
          label: 'Templates',
          autogenerate: { directory: 'templates' },
        },
        {
          label: 'Style Guide',
          autogenerate: { directory: 'style guide' },
        },
        {
          label: 'LLM Resources',
          items: [
            { label: 'llms.txt', link: '/llms.txt' },
            { label: 'llms-full.txt', link: '/llms-full.txt' },
          ],
        },
      ],
    }),
    react(),
  ],
});


