import {themes as prismThemes} from 'prism-react-renderer';
const config = {
  title: 'XML and JSON Validation Course',
  tagline: 'XML, XSLT & JSON — Beginner to Advanced',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://vtcmd-sb-global.github.io',
  baseUrl: '/xml-course/',
  
  organizationName: 'vtcmd-sb-global',
  projectName: 'xml-course',
  trailingSlash: false,
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      metadata: [
        {
          name: 'description',
          content:
            'Complete student guide for XML, XML Validation, XPath, XSLT, JSON and CORS. Based on the official course book.'
        },
        {
          name: 'keywords',
          content:
            'XML, JSON, XSLT, XPath, DTD, Schema, XML Validation, CORS, student guide'
        }
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },     
      navbar: {
        title: 'XML and JSON Validation',
        logo: {
          alt: 'XML and JSON Course Logo',
          src: 'img/logo.jpg',
        },
        items: [
          {
            to: '/',
            label: 'Home',
            position: 'left',
          },
          {
            to: '/sessions/session-01',
            label: 'Sessions',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Student's Guide for XML and JSON Validation, Sir Aousaja.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
