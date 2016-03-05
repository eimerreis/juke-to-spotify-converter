'use strict';
var request = require('request');
var GlobalConfig = require('../../conf/config');
var SpotifyConfig = require('./spotify-config');
var SpotifyError = require('./spotify-errors').SpotifyError;

function SpotifyProvider(){
    this.connect(function(err, wasSuccessful){
       if(err || !wasSuccessful || !this.accessToken || !this.tokenType){
           return err;
       }
    });
}

SpotifyProvider.prototype.accessToken = '';
SpotifyProvider.prototype.tokenType = '';

/**
 * Connects to the Spotify Web API and performs Authorization
 * @param cb
 */
SpotifyProvider.prototype.connect = function(cb){
    var that = this;
    var requestOptions = {
        url: SpotifyConfig.AUTHENTICATION_ENDPOINT,
        headers: {
            'Authorization': 'Basic ' + (new Buffer(SpotifyConfig.SPOTIFY_CLIENT_ID + ':' + SpotifyConfig.SPOTIFY_SECRET_ID).toString('base64'))
        },
        form: {
            grant_type: SpotifyConfig.AUTHENTICATION_GRANT_TYPE
        },
        json: true
    };
    request.post(requestOptions, function(err, response, body){
        if(err || response.statusCode != 200){
            return cb(new SpotifyError(null, 'Authentication to Spotify failed', {response: response, body: body}, err), false);
        }
        that.accessToken = body.access_token;
        this.tokenType = body.token_type;
        return cb(null, true);
    });
};

SpotifyProvider.prototype.searchTrack(track, cb){

};

module.exports = SpotifyProvider;