module.exports = {
  apps : [{
    name: 'API',
    script: 'dist/back/src/index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/

    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],


};
