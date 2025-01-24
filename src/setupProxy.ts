import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';

module.exports = function(app: Express) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://cdn-dev.preoday.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
