'use strict';
var SpotifyWebApi = require('spotify-web-api-node');

var request = require('request');
var GlobalConfig = require('../../conf/config');
var SpotifyConfig = require('./spotify-config');
var SpotifyError = require('./spotify-errors').SpotifyError;

function SpotifyProvider(){
    this._spotify = new SpotifyWebApi({
        clientId: SpotifyConfig.SPOTIFY_CLIENT_ID,
        clientSecret: SpotifyConfig.SPOTIFY_SECRET_ID
    });
}

SpotifyProvider.prototype.connect = function(cb){
    var that = this;
    this._spotify.clientCredentialsGrant(null, function(err, data){
        if(err){
            return cb(new SpotifyError(null, 'Retrieving access token failed', {}, err), null);
        }
        var accessToken = data.body['access_token'];
        console.log(accessToken);
        // Save the access token so that it's used in future calls
        that._spotify.setAccessToken(accessToken);
        console.log(accessToken);
        return cb(null, accessToken);
    });
};


SpotifyProvider.prototype.searchTracks = function(query, cb){
    var that = this;
    this._spotify.clientCredentialsGrant(null, function(err, data){
       if(err){
           return cb(new SpotifyError(null, 'Retrieving auth token failed', {}, err), null);
       }
        that._spotify.searchTracks(query, {limit: 3}, function(err, tracks){
           if(err){
               return cb(new SpotifyError(null, 'Retrieving tracks failed', {query: query}, err), null);
           }
            return cb(null, tracks);
        });
    });
};


SpotifyProvider.prototype.getUserPlaylists = function(userId, cb){
    var that = this;
        this._spotify.clientCredentialsGrant(null, function(err, data){
        // Save the access token so that it's used in future calls
        that._spotify.setAccessToken(data.body['access_token']);
        that._spotify.getUserPlaylists('eimerreis', {limit: 3}, function(err, playlists){
            if(err){
                return cb(new SpotifyError(null, 'Retrieving playlists failed', {}, err), null);
            }
            return cb(null, playlists.body);
        });

    });
};


module.exports = SpotifyProvider;