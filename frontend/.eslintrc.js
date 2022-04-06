module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "react-app/jest",
    "react-app",
  ],
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
