module.exports = {
  root: true,
  extends: ['standard', 'standard-react', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    "no-unused-vars": "off"
  }
}
