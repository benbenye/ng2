'use strict';

module.exports = {
  client: {
    source: ['client/**/*.{html,ico,css,js}',  '!**/app/**'],
    destination: 'dist/client',
    app: ['client/**/*.js']
  },
  server: {
    source: ['server/**/*.{js,json}', '!server/**/*.spec.*'],
    destination: 'dist/server'
  },
  general: {
    source: ['package.json', 'Procfile'],
    destination: 'dist'
  },
  liveReload: {
    port: 35729
  },
  build: {
    destination: 'dist'
  }
};
