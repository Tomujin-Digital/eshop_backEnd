module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "key-spacing": [1, { align: "colon" }],
    "comma-spacing": [1, { before: false, after: true }],
    "quote-props": ["warn", "as-needed"],
    quotes: ["warn", "single"],
    "no-unused-vars": [
      1,
      { vars: "local", args: "none", ignoreRestSiblings: true },
    ],
    "object-curly-newline": [
      "warn",
      {
        ObjectExpression: "always",
        ObjectPattern: { multiline: true },
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    "sort-imports": ["error", {
      "ignoreCase": false,
      "ignoreMemberSort": true,
      "memberSyntaxSortOrder": ["all"]
  }]
  },
};
