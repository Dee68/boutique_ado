"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const test_electron_1 = require("@vscode/test-electron");
/**
 * A function that runs the tests.
 *
 */
(0, test_electron_1.runTests)({
    /**
     * The path to the extension.
     *
     * @property
     * @name extensionDevelopmentPath
     * @kind property
     * @type {string}
     */
    extensionDevelopmentPath: (0, path_1.resolve)(__dirname, "../../"),
    /**
     * The path to the test suite.
     *
     * @property
     * @name extensionTestsPath
     * @kind property
     * @type {string}
     */
    extensionTestsPath: (0, path_1.resolve)(__dirname, "../../dist/test/suite"),
    /**
     * The path to the workspace that will be used for the tests.
     *
     * @property
     * @name launchArgs
     * @kind property
     * @type {string[]}
     */
    launchArgs: [(0, path_1.resolve)(__dirname, "../../src/test/workspace")],
})
    .then(() => {
    console.info("Succeed to run tests");
    process.exit(0);
})
    .catch(() => {
    console.error("Failed to run tests");
    process.exit(1);
});
//# sourceMappingURL=index.js.map