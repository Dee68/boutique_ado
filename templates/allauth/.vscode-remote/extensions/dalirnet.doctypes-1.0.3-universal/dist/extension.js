"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const DocTypes_1 = require("./lib/DocTypes");
const Utils_1 = require("./lib/Utils");
/**
 * This is the entry point of the extension.
 *
 * @function
 * @name activate
 * @kind variable
 * @param {vscode.ExtensionContext} extensionContext
 * @returns {void}
 * @exports
 */
const activate = (extensionContext) => {
    try {
        /**
         * Registering a command that can be called from the command palette.
         *
         * @async
         */
        (0, Utils_1.registerCommand)(extensionContext, "custom.line", async (line, emmit = true) => {
            if (!line) {
                /**
                 * Parsing the input value to an integer.
                 *
                 */
                line = parseInt((await vscode.window.showInputBox({
                    /**
                     * The title of the input box.
                     *
                     * @property
                     * @name title
                     * @kind property
                     * @memberof activate.registerCommand("custom.line") callback
                     * @type {string}
                     */
                    title: "Enter line number number",
                    /**
                     * A function that will validate the input value.
                     *
                     * @method
                     * @name validateInput
                     * @kind method
                     * @memberof activate.registerCommand("custom.line") callback
                     * @param {any} value
                     * @returns {string | null | Thenable<string>}
                     */
                    validateInput(value) {
                        const line = parseInt(value);
                        return isNaN(line) || line <= 0 ? "Invalid value." : null;
                    },
                })) ?? "1");
            }
            /**
             * Calling the `generateForCustomLine` method from the `DocTypes` class.
             *
             * @constant
             * @name documents
             * @kind variable
             * @memberof activate.registerCommand("custom.line") callback
             * @instance
             * @type {string[]}
             */
            const documents = await new DocTypes_1.DocTypes(extensionContext).generateForCustomLine(line, emmit);
            return documents;
        });
        /**
         * Registering a command that can be called from the command palette.
         *
         * @async
         */
        (0, Utils_1.registerCommand)(extensionContext, "current.line", async () => {
            /**
             * Calling the `generateForCurrentLine` method from the `DocTypes` class.
             *
             * @constant
             * @name documents
             * @kind variable
             * @memberof activate.registerCommand("current.line") callback
             * @instance
             * @type {string[]}
             */
            const documents = await new DocTypes_1.DocTypes(extensionContext).generateForCurrentLine();
            return documents;
        });
    }
    catch (error) {
        /**
         * A function that will log the error to the console and show a message to the user.
         *
         */
        (0, Utils_1.errorHandler)(error, "Ooops! The DocTypes has an unexpected error.");
    }
};
exports.activate = activate;
/**
 * It does nothing
 *
 * @function
 * @name deactivate
 * @kind variable
 * @returns {void}
 * @exports
 */
const deactivate = () => { };
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map