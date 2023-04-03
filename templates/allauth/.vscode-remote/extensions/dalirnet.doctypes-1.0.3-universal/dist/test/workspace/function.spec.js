"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserName = exports.createUserId = void 0;
const variable_spec_1 = require("./variable.spec");
/**
 * Exporting a function called `createUserId` that takes a parameter called `nonce` that is a number and returns a value of type `Id`.
 *
 * @function
 * @name createUserId
 * @kind function
 * @param {number} nonce?
 * @returns {Id}
 * @exports
 */
function createUserId(nonce = 0) {
    /**
     * Generating a random number between the `MAX` and `MIN` variables.
     *
     * @constant
     * @name perfix
     * @kind variable
     * @memberof createUserId
     * @type {number}
     */
    const perfix = Math.floor(Math.random() * (variable_spec_1.MAX - variable_spec_1.MIN)) + variable_spec_1.MIN;
    return perfix + nonce;
}
exports.createUserId = createUserId;
/**
 * Exporting a function called `validateUserName` that takes a parameter called `username` that is a value of type `Name` and returns a value of type `T`.
 *
 * @function
 * @name validateUserName
 * @kind function
 * @param {In} username
 * @returns {Out}
 * @exports
 */
function validateUserName(username) {
    return (username.length > 4);
}
exports.validateUserName = validateUserName;
//# sourceMappingURL=function.spec.js.map