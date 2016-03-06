'use strict';
var util = require('util');
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var config = require('./conf/config');
var spotifyConfig = require('./modules/spotify/spotify-config');

var SpotifyProvider = require('./modules/spotify/spotify-provider');
var JukeParser = require('./modules/juke/juke-parser');

var spotifyProvider = new SpotifyProvider();

var jukeParser = new JukeParser();



var undefinedTracks;

var app = express();
app.get('/login', function(req, res){
    var scope = 'playlist-modify-public playlist-modify-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: spotifyConfig.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: config.REDIRECT_URI
        }));
});


app.get('/spotify-callback', function(req, res){
    // your application requests refresh and access tokens
    // after checking the state parameter
    console.log(req.query);

    var code = req.query.code || null;
    var state = req.query.state || null;

        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: config.REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(spotifyConfig.SPOTIFY_CLIENT_ID + ':' + spotifyConfig.SPOTIFY_SECRET_ID).toString('base64'))
            },
            json: true
        };
        var parsedTracks = config.TRACKS;
        var tracks = [];
        var i;
         for(i = 0; i < parsedTracks.length; i++){
             spotifyProvider.searchTrack(parsedTracks[i], function(err, track){
                 if(err){
                     console.log(util.inspect(err, false, null));
                     return
                 }
                 if(track == null || track == 'null') {
                    undefinedTracks.push(parsedTracks[i]);
                     return
                 } else {
                     tracks.push(track);
                 }
             });
         }

        console.log("undefined tracks: ", undefinedTracks);

        //Set Stripe Providers API KEY
        spotifyProvider.AUTHORIZATION_CODE = code;
            spotifyProvider.addTracksToPlaylist('eimerreis', '4PGRg2Smlckv6z9fGfgnY2', tracks, function(err, snapshot){
                if(err){
                    console.log(util.inspect(err, false,null));
                }
                console.log(snapshot);
            });




        /*request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };


            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: error,
                    }));
            }
        });*/
});

app.listen(3000);