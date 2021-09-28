module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['babel-plugin-styled-components'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
        alias: {
          '~/': './src',
          '~/assets': './src/assets',
          '~/icons': './src/assets/icons',
          '~/images': './src/assets/images',
          '~/components': './src/components',
          '~/mocks': './src/mocks',
          '~/scenes': './src/scenes',
          '~/styles': './src/styles',
          '~/stores': './src/stores'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
}
