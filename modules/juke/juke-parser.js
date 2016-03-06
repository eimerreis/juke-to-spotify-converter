'use strict';
var fileSystem = require('fs');
var jsdom = require('jsdom');
var JukeError = require('./juke-errors').JukeError;

function JukeParser(){
}

JukeParser.prototype.FILE_ENCODING = 'utf-8';

JukeParser.prototype.getTracksFromPlaylist = function(jukeFile, cb){
    if(!jukeFile){
        return cb(new JukeError(null, 'No juke file to parse provided', {}, null), null);
    }
    fileSystem.readFile(jukeFile, this.FILE_ENCODING, function(err, data){
        if(err){
            return cb(new JukeError(null, 'Parsing juke File failed', {jukeFile: jukeFile}, err), null);
        }
        jsdom.env(data, function(err, window){
            if(err){
                return cb(new JukeError(null, 'Creating jsdom html environment failed', {rawData: data}, err), null);
            }
            var $ = require('jquery')(window);
            var tracks = [];
            $('.trackitem').each(function(){
                var title = $(this).find('.rowtitle > a').attr('title');
                var artist = $(this).find('.rowartist > a').attr('title');
                var track = JSON.stringify(title + ' ' + artist);
                track = JSON.parse(track);
                tracks.push(track);
            })
            return cb(null, tracks);
        })
    });
};

module.exports = JukeParser;
