const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireInlineImportGraphqlAst = require('react-app-rewire-inline-import-graphql-ast');
const rewireGraphqlTag = require('react-app-rewire-graphql-tag');

module.exports = function override(config, env) {
    config = rewireInlineImportGraphqlAst(config, env);
    config = rewireGraphqlTag(config, env);
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', style: true }],
        config
    ); // change importing css to less
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            '@primary-color': '#0091eb',
            '@slider-track-background-color': '#0091eb',
            '@slider-handle-color': '#0091eb',
        },
    })(config, env);
    return config;
};
