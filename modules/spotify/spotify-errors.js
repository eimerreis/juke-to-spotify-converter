'use strict';
var util = require('util');
var BaseError = require('../core/base-error');

function SpotifyError(){

}


util.inherits(SpotifyError, BaseError);