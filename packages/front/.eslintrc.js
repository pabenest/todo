module.exports = {
  "root": true,
  "ignorePatterns": [
    "projects/**/*"
  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "plugins": [
        "prettier",
        "@typescript-eslint",
        "unused-imports",
        "simple-import-sort",
        "typescript-sort-keys"
      ],
      "extends": [
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        // include prettier config which avoid conflict
        "prettier",
        // disable conflicting rules with plugin (not config!)
        "plugin:prettier/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "parserOptions": {
        "project": true,
        "emitDecoratorMetadata": true
      },
      "rules": {
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            "vars": "all",
            "varsIgnorePattern": "^_",
            "args": "after-used",
            "argsIgnorePattern": "^_"
          }
        ],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "import/order": "off",
        "import/no-default-export": "error",
        "import/no-extraneous-dependencies": "off",
        "import/no-internal-modules": "off",
        "import/newline-after-import": "error",
        "import/export": "off",
        "import/no-useless-path-segments": "warn",
        "import/no-absolute-path": "warn",
        "import/no-named-as-default": "off",
        "import/consistent-type-specifier-style": [
          "error",
          "prefer-inline"
        ],
        "import/no-duplicates": [
          "error",
          {
            "prefer-inline": true
          }
        ],
        "sort-import": "off",
        "prettier/prettier": [
          "error",
          {
            "tabWidth": 2,
            "trailingComma": "all",
            "printWidth": 120,
            "singleQuote": false,
            "parser": "typescript",
            "arrowParens": "avoid"
          }
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            "prefer": "type-imports",
            "fixStyle": "inline-type-imports"
          }
        ],
        "@typescript-eslint/sort-type-constituents": "warn",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "typescript-sort-keys/interface": "error",
        "typescript-sort-keys/string-enum": "error",
        "@typescript-eslint/no-namespace": "off",
        // handled by tsc already
        "import/no-unresolved": "off"
      }
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
        // "plugin:@angular-eslint/template/accessibility"
      ],
      "rules": {
        "prettier/prettier": [
          "error",
          {
            "parser": "angular"
          }
        ]
      }
    }
  ]
}
