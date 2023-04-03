"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = exports.documentBuilders = void 0;
const vscode = require("vscode");
const RegExp_1 = require("./RegExp");
const Utils_1 = require("./Utils");
/**
 * A constant that is being exported.
 *
 * @constant
 * @name documentBuilders
 * @kind variable
 * @type {DocumentBuilderTypes}
 * @exports
 */
exports.documentBuilders = {
    _description() {
        return ["${1:Description}", ""];
    },
    _class() {
        return ["@class"];
    },
    _abstract() {
        return ["@abstract"];
    },
    _interface() {
        return ["@interface"];
    },
    _typedef() {
        return ["@typedef"];
    },
    _enum() {
        return ["@enum"];
    },
    _async() {
        return ["@async"];
    },
    _function(kind) {
        return [
            `@${kind === "constructor"
                ? "constructor"
                : kind === "property" || kind === "method" || kind === "getter" || kind === "setter"
                    ? "method"
                    : "function"}`,
        ];
    },
    _variable(kind) {
        return [`@${kind === "enum member" ? "member" : kind === "const" ? "constant" : kind}`];
    },
    _name(value) {
        return [`@name ${value}`];
    },
    _kind(kind) {
        return [`@kind ${kind}`];
    },
    _memberof(value) {
        return [`@memberof ${value.join(".")}`];
    },
    _public() {
        return ["@public"];
    },
    _private() {
        return ["@private"];
    },
    _protected() {
        return ["@protected"];
    },
    _readonly() {
        return ["@readonly"];
    },
    _static() {
        return ["@static"];
    },
    _instance() {
        return ["@instance"];
    },
    _type(kind) {
        return [`@type {${kind === "{}" ? "object" : kind}}`];
    },
    _param(params = []) {
        return params.map(({ kind = "any", name, description }) => {
            return `@param {${kind === "{}" ? "object" : kind}} ${name || ""} ${description ? `- ${description}` : ""}`.trim();
        });
    },
    _returns(kind) {
        return [`@returns {${kind === "{}" ? "object" : kind}}`];
    },
    _extends(value) {
        return [`@extends ${value}`];
    },
    _implements(values = []) {
        return values.map((value) => {
            return `@implements ${value.trim()}`;
        });
    },
    _exports() {
        return ["@exports"];
    },
};
/**
 * Exporting the class Document.
 *
 * @class
 * @name Document
 * @kind class
 * @exports
 */
class Document {
    /**
     * A constructor that is being called when the class is being instantiated.
     *
     * @constructor
     * @name Document
     * @param {EditorDefinitionTypes} definition
     */
    constructor(definition) {
        this.definition = definition;
        /**
         * Assigning the value of the variable `documentBuilders` to the variable `builders`
         *
         * @property
         * @name builders
         * @kind property
         * @memberof Document
         * @private
         * @type {DocumentBuilderTypes}
         */
        this.builders = exports.documentBuilders;
        /**
         * Creating a new interface called DocumentContextTypes.
         *
         * @property
         * @name context
         * @kind property
         * @memberof Document
         * @private
         * @type {Partial<DocumentTypes>}
         */
        this.context = {
            _description: true,
        };
        this.parse();
    }
    /**
     * A getter method.
     *
     * @method
     * @name (get) code
     * @kind property
     * @memberof Document
     * @returns {string}
     */
    get code() {
        return this.definition.code;
    }
    /**
     * A getter method.
     *
     * @method
     * @name (get) tips
     * @kind property
     * @memberof Document
     * @returns {EditorDefinitionsTipTypes[]}
     */
    get tips() {
        return this.definition.tips;
    }
    /**
     * A getter method.
     *
     * @method
     * @name (get) whitespace
     * @kind property
     * @memberof Document
     * @returns {string}
     */
    get whitespace() {
        return this.definition.whitespace;
    }
    /**
     * A function declaration.
     *
     * @method
     * @name parse
     * @kind method
     * @memberof Document
     * @returns {void}
     */
    parse() {
        /**
         * Matching the class line in the code.
         *
         * @constant
         * @name classLine
         * @kind variable
         * @memberof Document.parse
         * @type {RegExpMatchArray}
         */
        const classLine = this.code.match(RegExp_1.REGEXP_CLASS_LINE);
        if (classLine) {
            this.context._class = true;
            this.context._name = classLine[4];
            if (classLine[2]) {
                this.context._abstract = true;
            }
            if (classLine[6]) {
                this.context._extends = classLine[6];
            }
            if (classLine[8]) {
                this.context._implements = classLine[8].split(",");
            }
        }
        else {
            /**
             * It's using a regular expression to find the interface line in the code.
             *
             * @constant
             * @name interfaceLine
             * @kind variable
             * @memberof Document.parse
             * @type {RegExpMatchArray}
             */
            const interfaceLine = this.code.match(RegExp_1.REGEXP_INTERFACE_LINE);
            if (interfaceLine) {
                this.context._interface = true;
                this.context._name = interfaceLine[3];
            }
            else {
                /**
                 * Matching the typedefLine with the regular expression.
                 *
                 * @constant
                 * @name typedefLine
                 * @kind variable
                 * @memberof Document.parse
                 * @type {RegExpMatchArray}
                 */
                const typedefLine = this.code.match(RegExp_1.REGEXP_TYPEDEF_LINE);
                if (typedefLine) {
                    this.context._typedef = true;
                    this.context._name = typedefLine[3];
                }
                else {
                    /**
                     * Matching the regular expression REGEXP_ENUM_LINE to the code.
                     *
                     * @constant
                     * @name enumLine
                     * @kind variable
                     * @memberof Document.parse
                     * @type {RegExpMatchArray}
                     */
                    const enumLine = this.code.match(RegExp_1.REGEXP_ENUM_LINE);
                    if (enumLine) {
                        this.context._enum = true;
                        this.context._name = enumLine[3];
                    }
                }
            }
        }
        /**
         * Checking if the code contains the word async.
         *
         * @constant
         * @name containsAsync
         * @kind variable
         * @memberof Document.parse
         * @type {RegExpMatchArray}
         */
        const containsAsync = this.code.match(RegExp_1.REGEXP_CONTAINS_ASYNC);
        if (containsAsync) {
            this.context._async = true;
        }
        if (this.tips.length > 0) {
            /**
             * Accessing the first element in the tips array.
             *
             * @constant
             * @name firstTip
             * @kind variable
             * @memberof Document.parse
             * @type {EditorDefinitionsTipTypes}
             */
            const firstTip = this.tips[0];
            /**
             * Using the regular expression to match the firstTip.value.
             *
             * @constant
             * @name functionTip
             * @kind variable
             * @memberof Document.parse
             * @type {RegExpMatchArray}
             */
            const functionTip = firstTip.value.match(RegExp_1.REGEXP_FUNCTION_TIP);
            if (functionTip) {
                this.context._name = functionTip[2];
                if (functionTip[1] !== "property" || this.context._name.match(RegExp_1.REGEXP_DOT_BETWEEN)) {
                    this.context._function = functionTip[1];
                }
                else {
                    this.context._variable = functionTip[1];
                    this.context._type = "function";
                }
                this.context._returns = functionTip[4];
            }
            else {
                /**
                 * The above code is using the regular expression to match the getter and setter tip.
                 *
                 * @constant
                 * @name getterSetterTip
                 * @kind variable
                 * @memberof Document.parse
                 * @type {RegExpMatchArray}
                 */
                const getterSetterTip = firstTip.value.match(RegExp_1.REGEXP_GETTER_SETTER_TIP);
                if (getterSetterTip) {
                    this.context._name = getterSetterTip[2];
                    this.context._function = getterSetterTip[1];
                    if (getterSetterTip[1] === "getter") {
                        this.context._returns = getterSetterTip[3];
                    }
                }
                else {
                    /**
                     * The above code is using the match() method to find the firstTip variable and return the value of the variable.
                     *
                     * @constant
                     * @name variableTip
                     * @kind variable
                     * @memberof Document.parse
                     * @type {RegExpMatchArray}
                     */
                    const variableTip = firstTip.value.match(RegExp_1.REGEXP_VARIABLE_TIP);
                    if (variableTip) {
                        this.context._variable = variableTip[1];
                        this.context._name = variableTip[2] + (variableTip[3] || "");
                        this.context._type = variableTip[4];
                        if (this.code.match(RegExp_1.REGEXP_CONTAINS_NEW)) {
                            this.context._instance = true;
                        }
                    }
                }
            }
            if (this.code.match(RegExp_1.REGEXP_PUBLIC_LINE)) {
                this.context._public = true;
            }
            else if (this.code.match(RegExp_1.REGEXP_PRIVATE_LINE)) {
                this.context._private = true;
            }
            else if (this.code.match(RegExp_1.REGEXP_PROTECTED_LINE)) {
                this.context._protected = true;
            }
            if (this.code.match(RegExp_1.REGEXP_READONY_LINE)) {
                this.context._readonly = true;
            }
            if (this.code.match(RegExp_1.REGEXP_STATIC_LINE)) {
                this.context._static = true;
            }
            if (this.context._interface || this.context._typedef) {
                this.context._param = this.tips.reduce((params, tip) => {
                    /**
                     * Using a regular expression to match the tip.value to the REGEXP_TYPE_PARAMETER_TIP.
                     *
                     * @constant
                     * @name typeParameterTip
                     * @kind variable
                     * @memberof Document.parse.tips.reduce() callback
                     * @type {RegExpMatchArray}
                     */
                    const typeParameterTip = tip.value.match(RegExp_1.REGEXP_TYPE_PARAMETER_TIP);
                    if (typeParameterTip) {
                        params.push({ kind: "unknown", name: typeParameterTip[1] });
                    }
                    return params;
                }, []);
            }
            if (this.context._returns) {
                /**
                 * Using a regular expression to find the first set of parentheses in the first tip.
                 *
                 * @constant
                 * @name inlineParameters
                 * @kind variable
                 * @memberof Document.parse
                 * @type {RegExpMatchArray}
                 */
                const inlineParameters = firstTip.value.match(RegExp_1.REGEXP_ADDITIONAL_PARENS);
                if (inlineParameters) {
                    let temp = "";
                    let sequence = 0;
                    let newParam = true;
                    const letters = inlineParameters[1].split("");
                    this.context._param = letters.reduce((params, letter, index) => {
                        if (letter.match(RegExp_1.REGEXP_SEQUENCE_LETTERS_OPEN)) {
                            sequence++;
                        }
                        else if (letter.match(RegExp_1.REGEXP_SEQUENCE_LETTERS_CLOSE)) {
                            sequence--;
                        }
                        const lastLetter = index + 1 === letters.length;
                        const newParamItem = sequence === 0 && (letter === ":" || letter === ",");
                        if ((lastLetter || !newParamItem) && letter !== ";") {
                            temp += letter;
                        }
                        if (lastLetter || newParamItem) {
                            if (newParam) {
                                params.push({ name: temp.trim() });
                            }
                            else {
                                params[params.length - 1].kind = temp.trim();
                            }
                        }
                        if (newParamItem) {
                            newParam = !newParam;
                            temp = "";
                        }
                        return params;
                    }, []);
                }
                if (this.context._function === "constructor") {
                    this.context._returns = "";
                }
            }
            if (this.context._name && firstTip.symbol) {
                if (firstTip.symbol.kind !== "constructor") {
                    this.context._name = firstTip.symbol.name;
                    this.context._kind = firstTip.symbol.kind;
                    if (firstTip.symbol.memberof.length) {
                        this.context._memberof = firstTip.symbol.memberof;
                    }
                }
            }
        }
        /**
         * Checking if the code starts with an export statement.
         *
         * @constant
         * @name startWithExport
         * @kind variable
         * @memberof Document.parse
         * @type {RegExpMatchArray}
         */
        const startWithExport = this.code.match(RegExp_1.REGEXP_EXPORT_LINE);
        if (startWithExport) {
            this.context._exports = true;
        }
    }
    /**
     * Creating a new instance of the DocumentReturnTypes class.
     *
     * @method
     * @name build
     * @kind method
     * @memberof Document
     * @returns {DocumentReturnTypes}
     */
    build() {
        /**
         * Declaring a variable called snippets and assigning it an empty array.
         *
         * @let
         * @name snippets
         * @kind variable
         * @memberof Document.build
         * @type {string[]}
         */
        let snippets = [];
        /**
         * Declaring a variable called tags and assigning it an empty array.
         *
         * @let
         * @name tags
         * @kind variable
         * @memberof Document.build
         * @type {string[]}
         */
        let tags = [];
        for (const [name, builder] of Object.entries(this.builders)) {
            if (this.context[name] && (0, Utils_1.getConfig)(name) !== "Off") {
                /**
                 * Using the builder function to create a new document.
                 *
                 * @constant
                 * @name builderOutput
                 * @kind variable
                 * @memberof Document.build
                 * @type {string[]}
                 */
                const builderOutput = builder(this.context[name]);
                for (const line of builderOutput) {
                    snippets.push(`\n${this.whitespace} * ${line}`);
                    if (line.match(RegExp_1.REGEXP_FIRST_ATSIGN)) {
                        tags.push(line);
                    }
                }
            }
        }
        snippets.unshift(`${this.whitespace}/**`);
        snippets.push(`\n${this.whitespace} */\n`);
        return {
            tags,
            snippet: new vscode.SnippetString(snippets.join("")),
        };
    }
}
exports.Document = Document;
//# sourceMappingURL=Document.js.map