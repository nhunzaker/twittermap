var Crypto = require('crypto');
var Events = require('events');
var request = require('request');
var QueryString = require('querystring');
var Util = require('util');

/**
 * Creates an instance of Client.
 *
 * @constructor
 * @this {Client}
 * @param {String} consumerKey The OAuth consumer key.
 * @param {String} consumerSecret The OAuth consumer secret.
 * @param {String} token The OAuth token.
 * @param {String} tokenSecret The OAuth token secret.
 */
var Client = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Events.EventEmitter.call(this);

    /** @private */
    this._apiBaseUrlString = null;
    /** @private */
    this._apiVersion = null;
    /** @private */
    this._oauth = {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        token: token,
        token_secret: tokenSecret
    };
    /** @private */
    this._connections = {};
};

Util.inherits(Client, Events.EventEmitter);

/**
 * Returns the OAuth credentials. 
 *
 * @this {Client}
 * @return {Dictionary} The OAuth credentials.
 */
Client.prototype.oauth = function()
{
    return this._oauth;
}

/**
 * Returns the connection object associated with the specified key.
 *
 * @private
 * @this {Client}
 * @param {String} aKey
 * @return The connection object or null.
 */
Client.prototype._connectionForKey = function(aKey)
{
    var connection = this._connections[aKey];

    return connection === undefined ? null : connection;
};

/**
 * Creates an HTTP GET request.
 *
 * @private
 * @this {Client}
 * @param {String} resource The Twitter API resource to call.
 * @param {String} format The format in which to return data.
 * @param {Dictionary} parameters Parameters required to access the resource.
 * @param {Function} callback The callback function.
 */
Client.prototype._createGetRequest = function(resource, format, parameters, callback)
{
    var self = this;
    var requestUrlString = this._apiBaseUrlString + '/' + this._apiVersion + '/' + resource + '.' + format;
    var requestQueryString = QueryString.stringify(parameters);
    if (requestQueryString !== undefined && requestQueryString !== null && requestQueryString.length > 0)
    {
        requestUrlString = requestUrlString + '?' + requestQueryString;
    }

    var requestOptions = {method: 'GET', url: requestUrlString, oauth: this.oauth()};

    var httpRequest = request.get(requestOptions);
    httpRequest.hash =  Crypto.createHash('sha1').update(JSON.stringify(httpRequest.headers), 'utf8').digest('hex');
    this._connections[httpRequest.hash] = {callback: callback, data: '', httpRequest: httpRequest};


    this._createEventListenersForRequest(httpRequest);
};

/**
 * Creates an HTTP POST request.
 *
 * @private
 * @this {Client}
 * @param {String} resource The Twitter API resource to call.
 * @param {String} format The format in which to return data.
 * @param {Dictionary} parameters Parameters required to access the resource.
 * @param {Function} callback The callback function.
 */
Client.prototype._createPostRequest = function(resource, format, parameters, callback)
{
    var self = this;
    var requestUrlString = this._apiBaseUrlString + '/' + this._apiVersion + '/' + resource + '.' + format;
    var requestOptions = {method: 'POST', url: requestUrlString, oauth: this.oauth(), form: parameters};

    var httpRequest = request.post(requestOptions);
    httpRequest.hash =  Crypto.createHash('sha1').update(JSON.stringify(httpRequest.headers), 'utf8').digest('hex');
    this._connections[httpRequest.hash] = {callback: callback, data: '', httpRequest: httpRequest};

    this._createEventListenersForRequest(httpRequest);
};

/**
 * Creates listeners that respond to events triggered by the specified 
 * request object.
 *
 * @private
 * @this {Client}
 * @param {http.ClientRequest} aRequest The request object.
 */
Client.prototype._createEventListenersForRequest = function(aRequest)
{
    var self = this;

    aRequest.on('close', function() {
        self._requestDidClose(aRequest);
    });
    
    aRequest.on('data', function(data) {
        self._requestDidReceiveData(aRequest, data);
    });
    
    aRequest.on('end', function() {
        self._requestDidEnd(aRequest);
    });

    aRequest.on('error', function(error) {
        self._requestDidFailWithError(aRequest, error);
    });

    aRequest.on('response', function(aResponse) {
        self._requestDidReceiveResponse(aRequest, aResponse);
    });
};

/**
 * Removes the connection object associated with the specified key.
 *
 * @private
 * @this {Client}
 * @param {String} aKey
 */
Client.prototype._removeConnectionForKey = function(aKey)
{
    if (this._connectionForKey(aKey))
    {
        delete this._connections[aKey];
    }
};

/**
 *
 *
 * @private
 * @this {StreamClient}
 * @param {http.ClientRequest} aRequest The request object.
 */
Client.prototype._requestDidClose = function(aRequest)
{
    var connection = this._connectionForKey(aRequest.hash);
    if (connection !== undefined)
    {
        var error = undefined;
        var result = null;
        try
        {
            result = JSON.parse(connection.data);
        }
        catch (e)
        {
            error = e;
        }

        connection.callback(error, result);

        this._removeConnectionForKey(aRequest.hash);
    }
};

/**
 *
 *
 * @private
 * @this {StreamClient}
 * @param {http.ClientRequest} aRequest The request object.
 */
Client.prototype._requestDidEnd = function(aRequest)
{
    var connection = this._connectionForKey(aRequest.hash);
    if (connection !== undefined)
    {
        var error = undefined;
        var result = null;
        try
        {
            result = JSON.parse(connection.data);
        }
        catch (e)
        {
            error = e;
        }

        connection.callback(error, result);

        this._removeConnectionForKey(aRequest.hash);
    }
};

/**
 * Handles a request failure.
 *
 * @private
 * @this {StreamClient}
 * @param {http.ClientRequest} aRequest The request object.
 * @param {Error} aError
 */
Client.prototype._requestDidFailWithError = function(aRequest, aError)
{
    var connection = this._connectionForKey(aRequest.hash);
    if (connection !== undefined)
    {
        connection.callback(aError, undefined);

        this._removeConnectionForKey(aRequest.hash);
    }
};

/**
 * Handles data received from the server.
 *
 * @private
 * @this {StreamClient}
 * @param {http.ClientRequest} aRequest The request object.
 * @param {Buffer} aData
 */
Client.prototype._requestDidReceiveData = function(aRequest, aData)
{
    var connection = this._connectionForKey(aRequest.hash);
    if (connection === undefined) return;

    var receivedData = connection['data'] + aData.toString('utf8');
    connection['data'] = receivedData;
};

/**
 * Handles a response by the server.
 *
 * @private
 * @this {StreamClient}
 * @param {http.ClientRequest} aRequest The request object.
 * @param {http.ClientResponse} aResponse The response object.
 */
Client.prototype._requestDidReceiveResponse = function(aRequest, aResponse)
{
    var connection = this._connectionForKey(aRequest.hash);
    if (connection !== undefined)
    {
        connection['data'] = '';
    }

    // Error handling for status codes documented at
    // https://dev.twitter.com/docs/error-codes-responses
    var error = null;
    if (aResponse.statusCode !== 200)
    {
        error = new Error();
        error.code = aResponse.statusCode;
    }

    switch(aResponse.statusCode)
    {
        case 304:
            error.message = 'Not Modified.';
            break;
        case 400:
            error.message = 'Bad Request';
            break;
        case 401:
            error.message = 'Unauthorized';
            break;
        case 403:
            error.message = 'Forbidden';
            break;
        case 404:
            error.message = 'Not Found';
            break;
        case 406:
            error.message = 'Not Acceptable';
            break;
        case 420:
            error.message = 'Enhance Your Calm';
            break;
        case 500:
            error.message = 'Internal Server Error';
            break;
        case 502:
            error.message = 'Bad Gateway';
            break;
        case 503:
            error.message = 'Service Unavailable';
            break;
    }

    if (error !== null)
    {
        this._requestDidFailWithError(aRequest, error);

        return;
    }
};

module.exports = Client;
