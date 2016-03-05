'use strict';

var util = require('util');

var BaseError = require('../core/base-error');

/**
 * Base Error for Juke Module
 */
function JukeError(name, message, details, previous){
    name = name || 'BillingError';
    message = message || 'Unspecified ' + name + 'occured';
    BaseError.call(this, name, message, details, previous);
}
util.inherits(JukeError, BaseError);


module.exports = {
    JukeError: JukeError
};