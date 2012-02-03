// Application Test
// An example of TDD with Vows
// -------------------------------------------------- //
// https://github.com/cloudhead/vows
// -------------------------------------------------- //

var vows = require('vows')
,   assert = require('assert')
;

require("../server.js");

vows.describe('The Application').addBatch({

  'An instance of the server': {

    topic: App,

    'should exist': function (app) {
      assert.equal (app, true);
    }

  }
});
