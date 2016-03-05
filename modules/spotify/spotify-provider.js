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

SpotifyProvider.prototype.AUTHORIZATION_CODE = '';

/**
 * Searchs for tracks withing the spotify library and returns all results
 * @param query
 * @param cb
 */
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


/**
 * Searches for tracks in the spotify library and returns only the first result!
 * @param query
 * @param cb
 */
SpotifyProvider.prototype.searchTrack = function(query, cb){
    var that = this;
    this._spotify.clientCredentialsGrant(null, function(err, data){
        if(err){
            return cb(new SpotifyError(null, 'Retrieving auth token failed', {}, err), null);
        }
        that._spotify.searchTracks(query, {limit: 3}, function(err, tracks){
            if(err){
                return cb(new SpotifyError(null, 'Retrieving tracks failed', {query: query}, err), null);
            }
            return cb(null, tracks.body.tracks.items[0]);
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

SpotifyProvider.prototype.addTracksToPlaylist = function(userId, playlistId, tracks, cb){
    var that = this;
    console.log(tracks);
    this._spotify.clientCredentialsGrant(null, function(err, data){
        console.log(err);
        console.log(data);
       if(err){
           return cb(new SpotifyError(null, 'Retrieving auth token failed', {}, err), null);
       }
        that._spotify.setAccessToken(data.body['access_token']);
        that._spotify.addTracksToPlaylist(userId, playlistId, tracks, null, function(err, snapshot){
            console.log(err);
           if(err){
               return cb(new SpotifyError(null, 'Adding tracks to playlist failed', {}, err), null);
           }
            console.log(snapshot);
            return cb(null, snapshot);
        });
    });
};


module.exports = SpotifyProvider;