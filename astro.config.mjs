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

// https://astro.build/config
export default defineConfig({
  site: 'https://crochetly.com',
  redirects: {
    '/reference/reading-crochet-patterns': '/reference/reading-patterns',
    '/terms/knitting-swatching': '/terms/swatch',
  },

  integrations: [
    llmsTxt({ siteUrl: 'https://crochetly.com' }),
    starlight({
      title: 'Crochetly',
      favicon: '/favicon.svg',
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
        },
        {
          tag: 'script',
          content: `
            (function (f, b) { if (!b.__SV) { var e, g, i, h; window.mixpanel = b; b._i = []; b.init = function (e, f, c) { function g(a, d) { var b = d.split("."); 2 == b.length && ((a = a[b[0]]), (d = b[1])); a[d] = function () { a.push([d].concat(Array.prototype.slice.call(arguments, 0))); }; } var a = b; "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel"); a.people = a.people || []; a.toString = function (a) { var d = "mixpanel"; "mixpanel" !== c && (d += "." + c); a || (d += " (stub)"); return d; }; a.people.toString = function () { return a.toString(1) + ".people (stub)"; }; i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" "); for (h = 0; h < i.length; h++) g(a, i[h]); var j = "set set_once union unset remove delete".split(" "); a.get_group = function () { function b(c) { d[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); a.push([e, call2]); }; } for ( var d = {}, e = ["get_group"].concat( Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]); return d; }; b._i.push([e, f, c]); }; b.__SV = 1.2; e = f.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; g = f.getElementsByTagName("script")[0]; g.parentNode.insertBefore(e, g); } })(document, window.mixpanel || []);

            mixpanel.init('c04075cf5492a7b007fb6be49298598a', {
              autocapture: false,
              record_sessions_percent: 100,
            });

            function getPageType(path) {
              if (path.startsWith('/guides/')) return 'tutorial';
              if (path.startsWith('/abbreviations/')) return 'abbreviation';
              if (path.startsWith('/terms/')) return 'reference';
              if (path.startsWith('/reference/')) return 'reference';
              if (path.startsWith('/apps/') || path.startsWith('/tools/')) return 'tool';
              return 'other';
            }

            var mpPath = window.location.pathname;
            var mpPageType = getPageType(mpPath);

            mixpanel.track('page_viewed', {
              page_title: document.title,
              page_url: window.location.href,
              page_type: mpPageType,
            });

            if (mpPageType === 'tutorial') {
              var startTime = Date.now();
              var timer = setTimeout(function() {
                mixpanel.track('tutorial_read', {
                  page_title: document.title,
                  page_url: window.location.href,
                  page_path: mpPath,
                  time_on_page: Math.round((Date.now() - startTime) / 1000),
                });
              }, 10000);
              window.addEventListener('beforeunload', function() { clearTimeout(timer); });
            }
          `
        }
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/kimtastic/crochetly' },
      ],
      components: {
        Sidebar: './src/components/Sidebar.astro',
        Footer: './src/components/Footer.astro',
      },
      sidebar: [
        {
          label: 'Get started',
          collapsed: true,
          items: [
                { label: 'Get started with Crochetly', link: 'guides/get-started-with-crochetly' },
                { label: 'Crochet or knitting first?', link: 'guides/which-craft-first' },
            {
              label: 'Crochet: Start here',
              collapsed: true,
              items: [
                { label: 'Get started with crochet', link: 'guides/get-started' },
                { label: 'Get started with amigurumi', link: 'guides/amigurumi-get-started' },
                { label: 'Get started with Tunisian crochet', link: 'guides/tunisian-get-started' },
                { label: 'Crochet FAQ', link: 'guides/crochet-faq' },
                { label: 'Crochet for knitters', link: 'guides/crochet-for-knitters' },
              ],
            },
            {
              label: 'Knitting: Start here',
              collapsed: true,
              items: [
                { label: 'Get started with knitting', link: 'guides-knitting/get-started' },
                { label: 'Knitting FAQ', link: 'guides-knitting/faq' },
              ],
            },
          ],
        },
        {
          label: 'Terms',
          collapsed: true,
          items: [
            { label: 'Crochet terminology', link: 'terms/crochet-terminology' },
            { label: 'Knitting terminology', link: 'terms/knitting-terminology' },
            { label: 'Tunisian terminology', link: 'terms/tunisian-crochet-terminology' },
            { label: 'Amigurumi terminology', link: 'terms/amigurumi-terminology' },
          ],
        },
        {
          label: 'Abbreviations',
          collapsed: true,
          items: [
            {
              label: 'Crochet abbreviations',
              collapsed: true,
              autogenerate: { directory: 'abbreviations/crochet' },
            },
            {
              label: 'Knitting abbreviations',
              collapsed: true,
              autogenerate: { directory: 'abbreviations/knitting' },
            },
          ],
        },
        {
          label: 'Reference',
          collapsed: true,
          items: [
            {
              label: 'Crochet reference',
              collapsed: true,
              items: [
                { label: 'Structure of crochet', link: 'reference/structure-of-crochet' },
                { label: 'Choosing crochet hooks', link: 'reference/choosing-hooks' },
                { label: 'Crochet chart symbols', link: 'reference/crochet-chart-symbols' },
                { label: 'Holding yarn and a hook', link: 'reference/holding-yarn-hook' },
                { label: 'Master crochet program', link: 'reference/master-crochet' },
                { label: 'Mosaic crochet', link: 'reference/mosaic-crochet' },
                { label: 'Resources', link: 'reference/resources' },
                { label: 'Stitch diagram', link: 'reference/stitch-diagram' },
                { label: 'Stitch library', link: 'reference/stitch-library' },
                { label: 'Troubleshooting', link: 'reference/troubleshooting' },
              ],
            },
            {
              label: 'Knitting reference',
              collapsed: true,
              items: [
                { label: 'Structure of knitting', link: 'knitting-reference/structure-of-knitting' },
                { label: 'Bind off methods', link: 'knitting-reference/bind-off-methods' },
                { label: 'Cast on methods', link: 'knitting-reference/cast-on-methods' },
                { label: 'Choosing needles', link: 'knitting-reference/choosing-needles' },
                { label: 'Colorwork knitting', link: 'knitting-reference/colorwork-knitting' },
                { label: 'Knit chart symbols', link: 'reference/knit-chart-symbols' },
                { label: 'Holding yarn and needles', link: 'knitting-reference/holding-yarn-needles' },
                { label: 'Kitchener stitch (grafting)', link: 'knitting-reference/kitchener-stitch' },
                { label: 'Master knitting program', link: 'knitting-reference/master-knitting' },
                { label: 'Stitch pattern library', link: 'knitting-reference/stitch-library' },
                { label: 'Troubleshooting', link: 'knitting-reference/troubleshooting' },
              ],
            },
            {
              label: 'Fiber arts reference',
              collapsed: true,
              items: [
                { label: 'Blanket measurement guide', link: 'reference/blanket-measurement' },
                { label: 'Blocking', link: 'terms/blocking' },
                { label: 'Care symbols', link: 'reference/care-symbols' },
                { label: 'Choosing yarn', link: 'reference/choosing-yarn' },
                { label: 'Converting patterns', link: 'reference/converting-patterns' },
                { label: 'Garment measurements', link: 'reference/garment-measurements' },
                { label: 'Gauge and tension', link: 'terms/gauge-and-tension' },
                { label: 'Grading patterns across sizes', link: 'reference/grading-patterns' },
                { label: 'Hat and scarf measurement guide', link: 'reference/hat-scarf-measurement' },
                { label: 'Joining yarn', link: 'reference/joining-yarn' },
                { label: 'Mitten and glove measurement guide', link: 'reference/mitten-measurements' },
                { label: 'Reading patterns', link: 'reference/reading-patterns' },
                { label: 'Reading yarn labels', link: 'reference/reading-yarn-labels' },
                { label: 'Skill levels', link: 'reference/skill-levels' },
                { label: 'Skills that transfer', link: 'reference/skills-that-transfer' },
                { label: 'Sock measurement guide', link: 'reference/sock-measurements' },
                { label: 'Swatching', link: 'terms/swatch' },
                { label: 'Sweater construction guide', link: 'reference/sweater-construction' },
                { label: 'Travel checklist', link: 'reference/travel-with-crochet' },
                { label: 'Wraps per inch (WPI)', link: 'reference/wraps-per-inch' },
                { label: 'Yardage estimation', link: 'reference/yardage-estimation' },
                { label: 'Yarn usage comparison', link: 'reference/yarn-usage-comparison' },
              ],
            },
          ],
        },
        {
          label: 'Tools & Apps',
          collapsed: true,
          autogenerate: { directory: 'apps' },
        },
        {
          label: 'Pattern Sources',
          collapsed: true,
          autogenerate: { directory: 'patterns' },
        },
        {
          label: 'Templates',
          collapsed: true,
          autogenerate: { directory: 'templates' },
        },
        {
          label: 'Writing & Editing',
          collapsed: true,
          autogenerate: { directory: 'style guide' },
        },
        {
          label: 'LLM Resources',
          items: [
            { label: 'llms.txt', link: '/llms.txt' },
            { label: 'llms-full.txt', link: '/llms-full.txt' },
          ],
        },
        {
          label: 'About',
          collapsed: true,
          items: [
            { label: 'About Crochetly', link: 'about/about' },
            { label: 'Agent-friendly content', link: 'about/agent-friendly-content' },
            { label: 'Contact', link: 'about/contact' },
            { label: 'FAQ', link: 'about/faq' },
          ],
        },
      ],
    }),
    react(),
  ],
});


