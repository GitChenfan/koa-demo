module.exports = {
  apps: [{
    // 指定解释器
    interpreter: '/usr/bin/ts-node-dev',
    // 解释器参数 -P 表示项目路径，会自动使用项目的 tsconfig.json
    interpreter_args: '-P ./src ',
    cwd: './',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    kill_timeout: 10000,
    name: 'app',
    script: './src/server.ts',
    wait_ready: true,
    // watch: false,
    watch: ['src'],
    ignore_watch: ['node_modules'],
    watch_options: {
      "usePolling": true
    }
  }]
};
