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

    it.only('should return first track of search', function(done){
       this.timeout(10000);
        spotifyProvider.searchTrack('Ray Charles Hit The Road Jack', function(err, track){
            should.not.exist(err);
            console.log(util.inspect(track, false, null));
            done();
        })
    });

    it('should add a track to a playlist', function(done){
       this.timeout(10000);
        var tracks = ['spotify:track:7sXxvOVFtMr31xj0kX9BFV'];
        spotifyProvider.addTracksToPlaylist('eimerreis', '4PGRg2Smlckv6z9fGfgnY2', tracks, function(err, snapshot){
            should.not.exist(err);
            console.log(util.inspect(snapshot, false, null));
            done();
        })
    });
});