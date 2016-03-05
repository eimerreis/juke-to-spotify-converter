'use strict';
var util = require('util');
var BaseError = require('../core/base-error');

function SpotifyError(name, message, details, previous){
    name = name || 'BillingError';
    message = message || 'Unspecified ' + name + 'occured';
    BaseError.call(this, name, message, details, previous);
}
util.inherits(SpotifyError, BaseError);

module.exports = {
    SpotifyError: SpotifyError
}