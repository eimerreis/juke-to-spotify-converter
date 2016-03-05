'use strict';
var fileSystem = require("fs");
var should = require('should');
var util = require('util');

var JukeParser = require('../modules/juke/juke-parser');

describe('JukeParser', function(){
   it('should return all playlist items of the html file', function(done){
       this.timeout(20000);
       var jukeParser = new JukeParser();
       var jukeFile = '/Users/iMorice/Dropbox/#Moritz/#dev/JukeToSpotifyConverter/JUKE musicflat - Dein Musik Streaming Dienst - #02.html';
       jukeParser.getTracksFromPlaylist(jukeFile, function(err, tracks){
           console.log(util.inspect(tracks, false, null));
           console.log(util.inspect(tracks[0], false, null));
           done();
       });
   });
});