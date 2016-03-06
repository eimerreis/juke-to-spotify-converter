'use strict';

module.exports.AUTHENTICATION_ENDPOINT = 'https://accounts.spotify.com/api/token';
module.exports.AUTHENTICATION_GRANT_TYPE = 'client_credentials';

module.exports.SPOTIFY_CLIENT_ID = 'e5fad41fff0f476a8a93f0dc795f8931';
module.exports.SPOTIFY_SECRET_ID = require('../../conf/secrets').spotifySecretId;


module.exports.REDIRECT_URI = 'http://localhost:3000/spotify-callback';