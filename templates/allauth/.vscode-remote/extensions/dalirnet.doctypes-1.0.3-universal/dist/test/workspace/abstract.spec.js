"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAbstract = void 0;
/**
 * Exporting the class UserAbstract.
 *
 * @class
 * @abstract
 * @name UserAbstract
 * @kind class
 * @exports
 */
class UserAbstract {
    /**
     * A constructor.
     *
     * @constructor
     * @name UserAbstract
     */
    constructor() { }
    /**
     * A getter.
     *
     * @method
     * @name (get) isOld
     * @kind property
     * @memberof UserAbstract
     * @returns {boolean}
     */
    get isOld() {
        const age = this.getAge();
        if (age > 50) {
            return true;
        }
        return false;
    }
}
exports.UserAbstract = UserAbstract;
//# sourceMappingURL=abstract.spec.js.map