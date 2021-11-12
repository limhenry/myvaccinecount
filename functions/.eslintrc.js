module.exports = {
  root: true,
  env: {
    "es6": true,
    "node": true,
    "jest/globals": true,
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  plugins: [
    "jest",
  ],
  rules: {
    "quotes": ["error", "double"],
    "max-len": ["error", {
      "code": 120,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
    }],
  },
};
