"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.updateConfig = exports.getConfig = exports.executeCommand = exports.registerCommand = exports.debug = exports.runtimeAwait = void 0;
const vscode = require("vscode");
const util_1 = require("util");
const RegExp_1 = require("./RegExp");
/**
 * A function that returns a promise.
 *
 * @function
 * @name runtimeAwait
 * @kind variable
 * @param {number} delay?
 * @returns {Promise<any>}
 * @exports
 */
const runtimeAwait = (delay = 1000) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};
exports.runtimeAwait = runtimeAwait;
/**
 * A function that takes an input and logs it to the console.
 *
 * @function
 * @name debug
 * @kind variable
 * @param {any} input
 * @returns {void}
 * @exports
 */
const debug = (input) => {
    console.log((0, util_1.inspect)(input, { depth: null, colors: true }));
};
exports.debug = debug;
/**
 * A function that takes an object, a string, and a function as parameters.
 *
 * @function
 * @name registerCommand
 * @kind variable
 * @param {vscode.ExtensionContext} { subscriptions }
 * @param {string} command
 * @param {(...rest: any[]) => void} callback
 * @returns {void}
 * @exports
 */
const registerCommand = ({ subscriptions }, command, callback) => {
    subscriptions.push(vscode.commands.registerCommand(`doctypes.${command}`, callback));
};
exports.registerCommand = registerCommand;
/**
 * A function that takes a string and an array of any type as parameters. It returns a promise.
 *
 * @function
 * @name executeCommand
 * @kind variable
 * @param {string} command
 * @param {any[]} ...rest
 * @returns {Thenable<unknown>}
 * @exports
 */
const executeCommand = (command, ...rest) => {
    return vscode.commands.executeCommand(command, ...rest);
};
exports.executeCommand = executeCommand;
/**
 * A function that takes a string as a parameter and returns a string.
 *
 * @function
 * @name getConfig
 * @kind variable
 * @param {ConfigKeysTypes} key
 * @returns {ConfigValuesTypes}
 * @exports
 */
const getConfig = (key) => {
    /**
     * Replacing the first underscore in the key with an empty string.
     *
     * @constant
     * @name configKey
     * @kind variable
     * @memberof getConfig
     * @type {string}
     */
    const configKey = `doctypes.${key.replace(RegExp_1.REGEXP_FIRST_UNDERSCORES, "")}`;
    return vscode.workspace.getConfiguration().get(configKey);
};
exports.getConfig = getConfig;
const updateConfig = (key, value) => {
    /**
     * Replacing the first underscore in the key with an empty string.
     *
     * @constant
     * @name configKey
     * @kind variable
     * @memberof getConfig
     * @type {string}
     */
    const configKey = `doctypes.${key.replace(RegExp_1.REGEXP_FIRST_UNDERSCORES, "")}`;
    return vscode.workspace.getConfiguration().update(configKey, value);
};
exports.updateConfig = updateConfig;
/**
 * A function that takes an error and a message as parameters and logs the error to the console and shows the message in a window.
 *
 * @function
 * @name errorHandler
 * @kind variable
 * @param {any} error
 * @param {string} message
 * @returns {void}
 * @exports
 */
const errorHandler = (error, message) => {
    console.error(error);
    vscode.window.showErrorMessage(message);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=Utils.js.map