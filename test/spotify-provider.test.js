var should = require('should');
var util = require('util');
var SpotifyProvider = require('../modules/spotify/spotify-provider');

describe.only('Spotfiy Provider', function(){
    it('should authenticate successful to Spotify', function(done){
            var spotifyProvider = new SpotifyProvider();
            spotifyProvider.connect(function(err, responseObject){
                should.not.exist(err);
                console.log(util.inspect(responseObject.body, false, null));
                done();
            });
    });
});