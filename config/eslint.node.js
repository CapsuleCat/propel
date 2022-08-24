module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "filenames"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "@typescript-eslint/ban-ts-comment": "off"
    }
};
