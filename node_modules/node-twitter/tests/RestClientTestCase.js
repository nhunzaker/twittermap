var assert = require('assert');
var Twitter = require('../lib/Twitter');
var Util = require('util');

/**
 * Creates an instance of RestClientTestCase.
 *
 * @constructor
 */
var RestClientTestCase = function(oAuthCredentials)
{
    Object.call(this);

    this._oAuthCredentials = oAuthCredentials;
    this._twitterRestClient = null;
};

Util.inherits(RestClientTestCase, Object);

RestClientTestCase.prototype.setUp = function()
{
    this._twitterRestClient = new Twitter.RestClient(
        this._oAuthCredentials['consumerKey'],
        this._oAuthCredentials['consumerSecret'],
        this._oAuthCredentials['token'],
        this._oAuthCredentials['tokenSecret']
    );
};

RestClientTestCase.prototype.tearDown = function()
{
    delete(this._twitterRestClient);
    this._twitterRestClient = null;
};

RestClientTestCase.prototype.testCreate = function()
{
    assert.equal(true, this._twitterRestClient instanceof Twitter.RestClient);
};

RestClientTestCase.prototype.testValidators = function()
{
    
};

RestClientTestCase.prototype.testStatusesHomeTimeline = function()
{
    this._twitterRestClient.statusesHomeTimeline({}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

RestClientTestCase.prototype.testStatusesMentions = function()
{
    this._twitterRestClient.statusesMentions({}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

RestClientTestCase.prototype.testStatusesPublicTimeline = function()
{
    this._twitterRestClient.statusesPublicTimeline({}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

RestClientTestCase.prototype.testStatusesRetweetedByMe = function()
{
    this._twitterRestClient.statusesRetweetedByMe({}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

RestClientTestCase.prototype.testStatusesRetweetedByUser = function()
{
    this._twitterRestClient.statusesRetweetedByUser({screen_name: 'cvee'}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

RestClientTestCase.prototype.testStatusesRetweetedToMe = function()
{
    this._twitterRestClient.statusesRetweetedToMe({}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

RestClientTestCase.prototype.teststatusesRetweetedToUser = function()
{
    this._twitterRestClient.statusesRetweetedToUser({screen_name: 'cvee'}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

RestClientTestCase.prototype.testStatusesRetweetsOfMe = function()
{
    this._twitterRestClient.statusesRetweetsOfMe({}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

RestClientTestCase.prototype.testStatusesUserTimeline = function()
{
    this._twitterRestClient.statusesUserTimeline({screen_name: 'cvee'}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

module.exports = RestClientTestCase;
