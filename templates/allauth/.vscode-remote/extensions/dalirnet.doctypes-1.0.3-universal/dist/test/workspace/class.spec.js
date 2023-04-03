"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const abstract_spec_1 = require("./abstract.spec");
/**
 * Exporting the class User, which extends the class UserAbstract and implements the interface PersonInterface.
 *
 * @class
 * @name User
 * @kind class
 * @extends UserAbstract
 * @implements PersonInterface
 * @exports
 */
class User extends abstract_spec_1.UserAbstract {
    /**
     * A constructor.
     *
     * @constructor
     * @name User
     * @param {Id} id
     * @param {Name} name?
     */
    constructor(id, name) {
        super();
        /**
         * A getter.
         *
         * @method
         * @name getNickname
         * @kind property
         * @memberof User
         * @public
         * @returns {Name}
         */
        this.getNickname = () => {
            return this.name;
        };
        this.id = id;
        if (name) {
            this.name = name;
        }
    }
    /**
     * A setter.
     *
     * @method
     * @name (set) nickname
     * @kind property
     * @memberof User
     */
    set nickname(name) {
        this.name = name;
    }
    /**
     * A method with a return type of `this`.
     *
     * @method
     * @name setAge
     * @kind method
     * @memberof User
     * @public
     * @param {Age} age
     * @returns {this}
     */
    setAge(age) {
        this._age = age;
        return this;
    }
    /**
     * A method with a return type of `Age`.
     *
     * @method
     * @name getAge
     * @kind method
     * @memberof User
     * @public
     * @returns {Age}
     */
    getAge() {
        return this._age;
    }
}
exports.User = User;
/**
 * Extending the User class.
 *
 * @class
 * @name Employee
 * @kind class
 * @extends User
 */
class Employee extends User {
    /**
     * A static method.
     *
     * @method
     * @name createEmployee
     * @kind method
     * @memberof Employee
     * @public
     * @static
     * @param {Id} id
     * @returns {Employee}
     */
    static createEmployee(id) {
        return new this(id);
    }
}
/**
 * A static property of the class Employee.
 *
 * @property
 * @name department
 * @kind property
 * @memberof Employee
 * @static
 * @type {string}
 */
Employee.department = "marketing";
/**
 * Exporting the class Employee.
 *
 * @exports
 */
exports.default = Employee;
//# sourceMappingURL=class.spec.js.map