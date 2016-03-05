(function() {
  var domino, jquery;

  domino = require("domino");

  jquery = require("jquery");

  module.exports = function(html) {
    return jquery(domino.createWindow(html));
  };

}).call(this);
