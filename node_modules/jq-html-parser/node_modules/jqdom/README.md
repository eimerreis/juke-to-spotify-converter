jqdom
---

Example Usage:
```javascript
var jqdom = require("jqdom"),
    request = require("request");

request("http://google.com", function(err, res, body){
  // instantiate a new jQuery instance:
  var $ = jqdom(body);
  // now you can use the jQuery API as you would in the browser:
  console.log($('title').text());
});
```