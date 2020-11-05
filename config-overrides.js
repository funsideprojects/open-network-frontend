const { resolve } = require('path')
const {
  override,
  addDecoratorsLegacy,
  addBabelPlugins,
  // fixBabelImports, // Antd modular import
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra')
const WebpackBar = require('webpackbar')
// const { getThemeVariables } = require('antd/dist/theme')

const otherConfigs = () => (config) => {
  config.plugins.push(
    new WebpackBar({
      color: '#69c0ff',
      name: '❖',
    })
  )

  Object.assign(config, {
    optimization: {
      ...config.optimization,
      namedModules: true,
      namedChunks: true,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: { default: false },
      },
    },
  })

  return config
}

module.exports = override(
  addDecoratorsLegacy(),
  ...addBabelPlugins(
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-do-expressions',
    ...(process.env.NODE_ENV === 'production' ? [['transform-remove-console', { exclude: ['debug'] }]] : []),
    ['babel-plugin-styled-components', { displayName: process.env.NODE_ENV === 'development', pure: true }]
  ),
  // Antd modular import
  // fixBabelImports('import', {
  //   libraryName: 'antd',
  //   libraryDirectory: 'es',
  //   style: true,
  // }),
  addLessLoader({
    lessOptions: {
      // modifyVars: getThemeVariables({
      //   compact: true, // ? Enable compact mode
      // }),
      javascriptEnabled: true,
    },
    sourceMap: false,
  }),
  addWebpackAlias({
    '@layouts': resolve(__dirname, './src/layouts'),
  }),
  otherConfigs()
)
