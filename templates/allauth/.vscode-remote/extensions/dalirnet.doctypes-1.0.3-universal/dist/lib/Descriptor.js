"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Descriptor = void 0;
const vscode = require("vscode");
const axios_1 = require("axios");
const Utils_1 = require("./Utils");
/**
 * Exporting the class Descriptor.
 *
 * @class
 * @name Descriptor
 * @kind class
 * @exports
 */
class Descriptor {
    constructor(context, code, languageId) {
        this.context = context;
        this.code = code;
        this.languageId = languageId;
        /**
         * Descriptor cancellation status.
         *
         * @property
         * @name canceled
         * @kind property
         * @memberof Descriptor
         * @private
         * @type {boolean}
         */
        this.canceled = false;
        /**
         * Defining a public property called `retry` and assigning it an object literal.
         *
         * @property
         * @name retry
         * @kind property
         * @memberof Descriptor
         * @public
         * @type {{ max: number; delay: number; }}
         */
        this.retry = {
            max: 10,
            delay: 500,
        };
        /**
         * Preparing axios cancellation.
         */
        this.mintlifyCancellation = axios_1.default.CancelToken.source();
        /**
         * Preparing axios instance.
         */
        this.mintlify = axios_1.default.create({
            cancelToken: this.mintlifyCancellation.token,
            baseURL: "https://api.mintlify.com/docs/",
            headers: {
                referer: "https://www.docstring.ai/",
            },
        });
    }
    /**
     * A getter.
     *
     * @method
     * @name (get) mintlifyPayload
     * @kind property
     * @memberof Descriptor
     * @returns {DescriptorPayloadTypes}
     */
    get mintlifyPayload() {
        return {
            userId: (0, Utils_1.getConfig)("mintlifyUserId"),
            languageId: "auto",
            docStyle: "Auto-detect",
            context: this.context,
            code: this.code,
            commented: false,
            source: "web",
        };
    }
    /**
     * A method that is called when the user cancels the operation.
     *
     * @method
     * @name cancellation
     * @kind method
     * @memberof Descriptor
     * @private
     * @returns {void}
     */
    cancellation() {
        this.canceled = true;
        this.mintlifyCancellation.cancel();
    }
    /**
     * Call mintlify write method.
     *
     * @async
     * @method
     * @name write
     * @kind method
     * @memberof Descriptor
     * @returns {Promise<string | false>}
     */
    async write(progressCancellation) {
        /**
         * Listening for a cancellation event.
         */
        progressCancellation.onCancellationRequested(() => {
            this.cancellation();
        });
        /**
         * Listening for a cancellation event.
         *
         * @constant
         * @name changeActiveTextEditorListener
         * @kind variable
         * @memberof Descriptor.write
         * @type {vscode.Disposable}
         */
        const changeActiveTextEditorListener = vscode.window.onDidChangeActiveTextEditor(() => {
            this.cancellation();
        });
        try {
            /**
             * Destructuring the data property from the response object.
             *
             * @constant
             * @name data
             * @kind variable
             * @memberof Descriptor.write
             * @type {any}
             */
            const { data } = await this.mintlify.post("write/v3", this.mintlifyPayload);
            /**
             * Declaring a variable called `workerState` and assigning it a value of `false`.
             *
             * @let
             * @name workerState
             * @kind variable
             * @memberof Descriptor.write
             * @type {string | boolean}
             */
            let workerState = false;
            for (let retry = 0; retry <= this.retry.max; retry++) {
                workerState = await this.worker(data?.id ?? 0);
                if (this.canceled || workerState !== true) {
                    break;
                }
            }
            if (workerState === true) {
                workerState = false;
            }
            /**
             * Disposing the event listener.
             */
            changeActiveTextEditorListener.dispose();
            return workerState;
        }
        catch (error) {
            if (!this.canceled) {
                (0, Utils_1.errorHandler)(error, "The Mintlify writer has an unknown error.");
            }
            /**
             * Disposing the event listener.
             */
            changeActiveTextEditorListener.dispose();
            return false;
        }
    }
    /**
     * Call mintlify worker method.
     *
     * @async
     * @method
     * @name worker
     * @kind method
     * @memberof Descriptor
     * @param {number} workerId
     * @returns {Promise<string | boolean>}
     */
    async worker(workerId) {
        try {
            await (0, Utils_1.runtimeAwait)(this.retry.delay);
            /**
             * Destructuring the data property from the response object.
             *
             * @constant
             * @name data
             * @kind variable
             * @memberof Descriptor.worker
             * @type {any}
             */
            const { data } = await this.mintlify.get(`worker/${workerId}`);
            if (data?.state === "completed") {
                return data?.data?.docstring ?? false;
            }
            return true;
        }
        catch (error) {
            if (!this.canceled) {
                (0, Utils_1.errorHandler)(error, "The Mintlify worker has an unknown error.");
            }
            return false;
        }
    }
}
exports.Descriptor = Descriptor;
//# sourceMappingURL=Descriptor.js.map