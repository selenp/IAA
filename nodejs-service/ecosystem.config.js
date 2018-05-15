module.exports = {
  apps: [{
    name: 'wxcontracts',
    script: 'app.js',
    node_args: '--harmony',
    exec_mode: 'fork',
    combine_logs: true,
  }],
};
