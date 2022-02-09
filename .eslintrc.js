var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
    "env": {
        "es6": true
    },

    "parser": "@babel/eslint-parser",

    "parserOptions": {
        "sourceType": "module",
    },

    "ecmaFeatures": {
        // env=es6 doesn't include modules, which we are using
        "modules": true
    },

    "extends": "eslint:recommended",

    "rules": {
        // Possible Errors (overrides from recommended set)
        "no-extra-parens": OFF,
        "no-unexpected-multiline": OFF,
        // All JSDoc comments must be valid
        "valid-jsdoc": [ OFF, {
            "requireReturn": false,
            "requireReturnDescription": false,
            "requireParamDescription": true,
            "prefer": {
                "return": "returns"
            }
        }],

        // Best Practices

        // Allowed a getter without setter, but all setters require getters
        "accessor-pairs": [ ERROR, {
            "getWithoutSet": false,
            "setWithoutGet": true
        }],
        "block-scoped-var": ERROR,
        "consistent-return": ERROR,
        "curly": ERROR,
        "default-case": OFF,
        // the dot goes with the property when doing multiline
        "dot-location": [ OFF, "property" ],
        "dot-notation": OFF,
        "eqeqeq": [ OFF, "smart" ],
        "guard-for-in": OFF,
        "no-alert": OFF,
        "no-caller": OFF,
        "no-case-declarations": OFF,
        "no-div-regex": OFF,
        "no-else-return": OFF,
        "no-empty-label": OFF,
        "no-empty-pattern": OFF,
        "no-eq-null": OFF,
        "no-eval": OFF,
        "no-extend-native": OFF,
        "no-extra-bind": OFF,
        "no-floating-decimal": OFF,
        "no-implicit-coercion": [ OFF, {
            "boolean": true,
            "number": true,
            "string": true
        }],
        "no-implied-eval": OFF,
        "no-invalid-this": OFF,
        "no-iterator": OFF,
        "no-labels": OFF,
        "no-lone-blocks": OFF,
        "no-loop-func": OFF,
        "no-magic-numbers": OFF,
        "no-multi-spaces": OFF,
        "no-multi-str": OFF,
        "no-native-reassign": OFF,
        "no-new-func": OFF,
        "no-new-wrappers": OFF,
        "no-new": OFF,
        "no-octal-escape": OFF,
        "no-param-reassign": OFF,
        "no-process-env": OFF,
        "no-proto": OFF,
        "no-redeclare": OFF,
        "no-return-assign": OFF,
        "no-script-url": OFF,
        "no-self-compare": OFF,
        "no-throw-literal": OFF,
        "no-unused-expressions": OFF,
        "no-useless-call": OFF,
        "no-useless-concat": OFF,
        "no-void": OFF,
        // Produce warnings when something is commented as TODO or FIXME
        "no-warning-comments": [ OFF, {
            "terms": [ "TODO", "FIXME" ],
            "location": "start"
        }],
        "no-with": OFF,
        "radix": OFF,
        "vars-on-top": OFF,
        // Enforces the style of wrapped functions
        "wrap-iife": [ OFF, "outside" ],
        "yoda": OFF,

        // Strict Mode - for ES6, never use strict.
        "strict": [ OFF, "never" ],

        // Variables
        "init-declarations": [ OFF, "always" ],
        "no-catch-shadow": OFF,
        "no-delete-var": OFF,
        "no-label-var": OFF,
        "no-shadow-restricted-names": OFF,
        "no-shadow": OFF,
        // We require all vars to be initialized (see init-declarations)
        // If we NEED a var to be initialized to undefined, it needs to be explicit
        "no-undef-init": OFF,
        "no-undef": OFF,
        "no-undefined": OFF,
        "no-unused-vars": OFF,
        // Disallow hoisting - let & const don't allow hoisting anyhow
        "no-use-before-define": OFF,

        // Node.js and CommonJS
        "callback-return": [ OFF, [ "callback", "next" ]],
        "global-require": OFF,
        "handle-callback-err": OFF,
        "no-mixed-requires": OFF,
        "no-new-require": OFF,
        // Use path.concat instead
        "no-path-concat": OFF,
        "no-process-exit": OFF,
        "no-restricted-modules": OFF,
        "no-sync": OFF,

        // ECMAScript 6 support
        "arrow-body-style": [ OFF, "always" ],
        "arrow-parens": [ OFF, "always" ],
        "arrow-spacing": [ OFF, { "before": true, "after": true }],
        "constructor-super": OFF,
        "generator-star-spacing": [ OFF, "before" ],
        "no-arrow-condition": OFF,
        "no-class-assign": OFF,
        "no-const-assign": OFF,
        "no-dupe-class-members": OFF,
        "no-this-before-super": OFF,
        "no-var": OFF,
        "object-shorthand": [ OFF, "never" ],
        "prefer-arrow-callback": OFF,
        "prefer-spread": OFF,
        "prefer-template": OFF,
        "require-yield": OFF,

        // Stylistic - everything here is a warning because of style.
        "array-bracket-spacing": [ OFF, "always" ],
        "block-spacing": [ OFF, "always" ],
        "brace-style": [ OFF, "1tbs", { "allowSingleLine": false } ],
        "camelcase": OFF,
        "comma-spacing": [ OFF, { "before": false, "after": true } ],
        "comma-style": [ OFF, "last" ],
        "computed-property-spacing": [ OFF, "never" ],
        "consistent-this": [ OFF, "self" ],
        "eol-last": OFF,
        "func-names": OFF,
        "func-style": [ OFF, "declaration" ],
        "id-length": [ OFF, { "min": 2, "max": 32 } ],
        "indent": [ OFF, 4 ],
        "jsx-quotes": [ OFF, "prefer-double" ],
        "linebreak-style": [ OFF, "unix" ],
        "lines-around-comment": [ OFF, { "beforeBlockComment": true } ],
        "max-depth": [ OFF, 8 ],
        "max-len": [ OFF, 132 ],
        "max-nested-callbacks": [ OFF, 8 ],
        "max-params": [ OFF, 8 ],
        "new-cap": OFF,
        "new-parens": OFF,
        "no-array-constructor": OFF,
        "no-bitwise": OFF,
        "no-continue": OFF,
        "no-inline-comments": OFF,
        "no-lonely-if": OFF,
        "no-mixed-spaces-and-tabs": OFF,
        "no-multiple-empty-lines": OFF,
        "no-negated-condition": OFF,
        "no-nested-ternary": OFF,
        "no-new-object": OFF,
        "no-plusplus": OFF,
        "no-spaced-func": OFF,
        "no-ternary": OFF,
        "no-trailing-spaces": OFF,
        "no-underscore-dangle": OFF,
        "no-unneeded-ternary": OFF,
        "object-curly-spacing": [ OFF, "always" ],
        "one-var": OFF,
        "operator-assignment": [ OFF, "never" ],
        "operator-linebreak": [ OFF, "after" ],
        "padded-blocks": [ OFF, "never" ],
        "quote-props": [ OFF, "consistent-as-needed" ],
        "quotes": [ OFF, "single" ],
        "require-jsdoc": [ OFF, {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": true,
                "ClassDeclaration": false
            }
        }],
        "semi-spacing": [ OFF, { "before": false, "after": true }],
        "semi": [ OFF, "always" ],
        "sort-vars": OFF,
        "space-after-keywords": [ OFF, "always" ],
        "space-before-blocks": [ OFF, "always" ],
        "space-before-function-paren": [ OFF, "never" ],
        "space-before-keywords": [ OFF, "always" ],
        "space-in-parens": [ OFF, "never" ],
        "space-infix-ops": [ OFF, { "int32Hint": true } ],
        "space-return-throw-case": OFF,
        "space-unary-ops": OFF,
        "spaced-comment": [ OFF, "always" ],
        "wrap-regex": OFF
    }
};