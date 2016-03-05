'use strict';

module.exports.AUTHENTICATION_ENDPOINT = 'https://accounts.spotify.com/api/token';
module.exports.SPOTIFY_CLIENT_ID = 'e5fad41fff0f476a8a93f0dc795f8931';
module.exports.SPOTIFY_SECRET_ID = require('../../config/secrets').spotifySecretId
module.exports.REDIRECT_URI = 'http://localhost:8888/spotifyAuthCallback';