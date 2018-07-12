const path = require('path');
module.exports = function override(config, env) {
    // do stuff with the webpack config...
    // Name resolve
    config.resolve = {
        ...config.resolve,
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    };
    return config;
};
