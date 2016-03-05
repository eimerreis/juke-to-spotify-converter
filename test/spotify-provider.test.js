var should = require('should');
var util = require('util');
var SpotifyProvider = require('../modules/spotify/spotify-provider');

describe('Spotfiy Provider', function(){
    var spotifyProvider;
    beforeEach(function(){
        spotifyProvider = new SpotifyProvider();
    });

    it('should retrieve playlists of eimerreis', function(done){
        this.timeout(10000);
        spotifyProvider.getUserPlaylists('eimerreis', function(err, playlists){
            should.not.exist(err);
            console.log(util.inspect(playlists, false, null));
            done();
        });
    });

    it('should search for tracks', function(done){
       this.timeout(10000);
        spotifyProvider.searchTracks('Ray Charles Hit The Road Jack', function(err, tracks){
            should.not.exist(err);
            console.log(util.inspect(tracks.body.tracks.items, false, null));
            done();
        })
    });
});