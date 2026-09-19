import SitemapPlugin from 'sitemap-webpack-plugin';

const routes = [
  '/',
  '/about',
  '/resume',
  '/contact'
];

export const configureWebpack = {
  plugins: [
    new SitemapPlugin({ base: 'https://chrislain-portfolio.vercel.app', paths: routes })
  ]
};
