const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#0091eb",
            "@slider-track-background-color": "#0091eb",
            "@slider-handle-color": "#0091eb"
        },
    })(config, env);
    return config;
}