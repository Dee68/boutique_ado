"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readComments = exports.getText = exports.openWorkspaceFile = void 0;
const vscode = require("vscode");
const path_1 = require("path");
/**
 * A function that takes a string as a parameter and returns a Thenable<unknown>
 *
 * @function
 * @name openWorkspaceFile
 * @kind variable
 * @param {string} file
 * @returns {Thenable<unknown>}
 * @exports
 */
const openWorkspaceFile = (file) => {
    /**
     * Resolving the path to the file.
     *
     * @constant
     * @name filePath
     * @kind variable
     * @memberof openWorkspaceFile
     * @type {string}
     */
    const filePath = (0, path_1.resolve)(__dirname, "../../../src/test/workspace", file);
    return vscode.commands.executeCommand("vscode.open", vscode.Uri.file(filePath));
};
exports.openWorkspaceFile = openWorkspaceFile;
/**
 * A function that takes a range as a parameter and returns a string.
 *
 * @function
 * @name getText
 * @kind variable
 * @param {vscode.Range} range
 * @returns {string}
 * @exports
 */
const getText = (range) => {
    /**
     * Getting the text from the active editor.
     *
     * @constant
     * @name text
     * @kind variable
     * @memberof getText
     * @type {string}
     */
    const text = vscode.window.activeTextEditor?.document.getText(range) ?? "";
    return text.trim();
};
exports.getText = getText;
/**
 * Exporting a function that takes two parameters and returns an array of strings.
 *
 * @function
 * @name readComments
 * @kind variable
 * @param {number} start
 * @param {number} end
 * @returns {string[]}
 * @exports
 */
const readComments = (start, end) => {
    /**
     * Getting the text from the active editor and splitting it into an array of strings.
     *
     * @constant
     * @name lines
     * @kind variable
     * @memberof readComments
     * @type {string[]}
     */
    const lines = (0, exports.getText)(new vscode.Range(start - 1, 0, end - 1, 0)).split("\n");
    /**
     * Taking the lines array and reducing it to a single value.
     *
     * @constant
     * @name comments
     * @kind variable
     * @memberof readComments
     * @type {string[]}
     */
    const comments = lines.reduce((lines, line) => {
        /**
         * Removing the leading spaces, asterisks, and slashes from the line.
         *
         * @constant
         * @name commentLine
         * @kind variable
         * @memberof readComments.comments.lines.reduce() callback
         * @type {string}
         */
        const commentLine = line.replace(/^([\s/*]+)/, "").trim();
        if (commentLine.match(/^\@/)) {
            lines.push(commentLine);
        }
        return lines;
    }, []);
    return comments;
};
exports.readComments = readComments;
//# sourceMappingURL=SpecUtils.js.map