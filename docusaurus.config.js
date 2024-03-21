// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const math = require('remark-math')
const katex = require('rehype-katex')
const { DOCS_URL } = require('./consts')
const { DOCS_ALGOLIA_APP_ID, DOCS_ALGOLIA_API_KEY } = process.env

let extraThemeConfig = {}
// only configure Algolia if credentials are given
if (DOCS_ALGOLIA_APP_ID && DOCS_ALGOLIA_API_KEY) {
  extraThemeConfig.algolia = {
    appId: DOCS_ALGOLIA_APP_ID,
    apiKey: DOCS_ALGOLIA_API_KEY,
    indexName: 'docs-hoprnet',
    contextualSearch: true
  }
}


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HOPR Docs',
  tagline: 'HOPR',
  url: DOCS_URL,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/hopr_icon.svg',
  organizationName: 'hoprnet',
  projectName: 'hopr-docs',

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous'
    },
    'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.css',
    'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css'
  ],
  scripts: [{ src: 'https://cdn-eu.usefathom.com/script.js', 'data-site': 'WMCAULEA', 'data-included-domains': 'docs.hoprnet.org', defer: true }],
  presets: [
    [
      '@docusaurus/preset-classic',
      ({
        docs: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/hoprnet/hopr-docs/edit/master/',
          lastVersion: 'v2.1.0'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: true
      },
      navbar: {
        /* title: 'HOPR',*/
        logo: {
          alt: 'HOPR Logo',
          src: 'img/HOPR_logo.svg'
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'left',
            dropdownItemsAfter: [],
            dropdownActiveClassDisabled: true
          },
          {
            href: 'https://twitter.com/hoprnet',
            label: 'Twitter',
            position: 'right'
          },
          {
            href: 'https://discord.gg/dEAWC4G',
            label: 'Discord',
            position: 'right'
          },
          {
            href: 'https://t.me/hoprnet',
            label: 'Telegram',
            position: 'right'
          },
          {
            href: 'https://github.com/hoprnet',
            label: 'GitHub',
            position: 'right',
            className: 'header-github-link'
          }
        ]
      },
      image: 'img/node/HOPR-Twitter-Logo.png',
      metadata: [
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:image', content: 'https://docs.hoprnet.org/assets/images/HOPR-Twitter-Logo-649fa3ab2ca122f5dd52833a06f48fe6.png'},
      ],
      ...extraThemeConfig,
      footer: {
        copyright: `©${new Date().getFullYear()} HOPR Association, all rights reserved`
      },
      prism: {
        additionalLanguages: ['solidity'],
        theme: darkCodeTheme
      }
    })
}

module.exports = config
