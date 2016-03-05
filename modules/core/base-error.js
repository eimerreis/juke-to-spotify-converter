'use strict';

var util = require('util');

var BASE_ERROR = 'BaseError';

/**
 * Godfather of all internal errors
 *
 * @param {String} name - name of the error
 * @param {String} message - human readable describtion
 * @param {Number} [code] - error code
 * @param {Object} [details] - additional informations about the error
 * @param {BaseError} [previous] - previous errors inherited from BaseError
 */
var BaseError = function(name, message, details, previous) {
    this.name = name || BASE_ERROR;
    this.message = message || '';

    if (details) {
        this.details = details;
    }

    if (previous) {
        this.previous = previous;
    }
    Error.call(this, message);
};
util.inherits(BaseError, Error);


module.exports = BaseError;
