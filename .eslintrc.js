const defauts = require('@spotify/web-scripts/config/eslintrc.js');
module.exports = {
  ...defauts,
  settings: {
    react: {
      version: 'detect',
    },
  },
};
