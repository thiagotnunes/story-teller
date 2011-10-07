
// Run $ expresso

/**
 * Module dependencies.
 */

var app = require('../lib/server')
  , assert = require('assert');


module.exports = {
  'GET /': function(){
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>Story Teller</title>');
      });
  }
};