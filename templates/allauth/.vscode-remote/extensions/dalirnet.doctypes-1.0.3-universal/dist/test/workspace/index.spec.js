"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_spec_1 = require("./class.spec");
const function_spec_1 = require("./function.spec");
/**
 * Creating a constant variable called `userId` of type `Id` and assigning it the value of `createUserId()`.
 *
 * @constant
 * @name userId
 * @kind variable
 * @type {Id}
 */
const userId = (0, function_spec_1.createUserId)();
/**
 * Creating a constant variable called `john` of type `User` and assigning it the value of `new User(userId, "John")`.
 *
 * @constant
 * @name john
 * @kind variable
 * @instance
 * @type {User}
 */
const john = new class_spec_1.User(userId, "John");
/**
 * Calling the `getAge()` method on the `john` instance.
 *
 * @constant
 * @name john
 * @type {User}
 */
john.getAge();
//# sourceMappingURL=index.spec.js.map