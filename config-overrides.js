const { join } = require('path')
const { override, addBabelPlugins, addLessLoader, overrideDevServer } = require('customize-cra')

// Just in case of webpack modification is needed
const additionalConfig = () => (config) => {
  return config
}

module.exports = {
  webpack: override(
    ...addBabelPlugins(
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-logical-assignment-operators',
      '@babel/plugin-proposal-do-expressions',
      ...(process.env.NODE_ENV === 'production' ? [['transform-remove-console', { exclude: ['debug'] }]] : []),
      ['babel-plugin-styled-components', { displayName: process.env.NODE_ENV === 'development', pure: true }]
    ),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
      sourceMap: false,
    }),
    additionalConfig()
  ),
  devServer: overrideDevServer((devServerConfig) => {
    return {
      ...devServerConfig,
      contentBase: [devServerConfig.contentBase, join(__dirname, '/public')],
    }
  }),
}
