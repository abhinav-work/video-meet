module.exports = {
  apps: [
    {
      name: 'node-app',
      script: './index.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Auto restart configuration
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G',
      
      // Monitoring
      monitoring: false,
      
      // Advanced features
      watch: false, // Set to true for development
      ignore_watch: ['node_modules', 'logs'],
      
      // Kill timeout
      kill_timeout: 5000,
    }
  ]
};