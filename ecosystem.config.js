module.exports = {
  apps: [],

  deploy: {
    production: {
      user: 'root', // 服务器 userName
      host: '115.29.195.8', // 服务器地址
      ref: 'origin/master', // 仓库分支
      repo: 'https://github.com/r593988344/Vue-3.0-Music-Player.git', // 仓库代码地址
      path: '/root/home/music-player', // 服务器拉取代码存放路径
      'post-deploy': 'npm run docker', // 在服务端进行打包部署
    },
  },
};
