export default {
    displayName: "propel-cli",
    preset: "../../jest.preset.js",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.spec.json",
        },
    },
    transform: {
        "^.+\\.[tj]s$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "js", "html"],
    coverageDirectory: "../../coverage/packages/propel-cli",
    collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],
};
