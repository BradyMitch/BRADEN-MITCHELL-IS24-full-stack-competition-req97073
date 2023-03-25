module.exports = {
  ignorePath: ".eslint-prettier-ignore",
  env: {
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": "off", // Allow console logging in backend code.
    "no-unused-vars": ["warn"], // Warn when variables are not used.
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    "prefer-const": "error", // Encourage use of const where possible.
    semi: ["warn", "always"], // Require semicolons.
  },
};
