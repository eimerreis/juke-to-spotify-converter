'use strict';

var util = require('util');

var BaseError = require('../error/module').BaseError;

/**
 * Base Error for Billing Module
 */
function BillingError(name, message, details, previous){
    name = name || 'BillingError';
    message = message || 'Unspecified ' + name + 'occured';
    BaseError.call(this, name, message, details, previous);
}
util.inherits(BillingError, BaseError);


module.exports = {
    BillingError: BillingError
};