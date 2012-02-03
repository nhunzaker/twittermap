var Util = require('util');

/**
 * Creates an instance of RestParameterValidator.
 *
 * @constructor
 * @this {RestParameterValidator}
 */
var RestParameterValidator = function()
{
    Object.call(this);
};

Util.inherits(RestParameterValidator, Object);

RestParameterValidator.prototype.validateContributorDetails = function(parameters)
{
	var contributorDetails = parameters['contributor_details'];
    if (contributorDetails !== undefined && typeof contributorDetails !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }
};

RestParameterValidator.prototype.validateCount = function(parameters)
{
    var count = parameters['count'];
    if (count !== undefined && typeof count !== 'number')
    {
        throw new Error('Expected number.');
    }
};

RestParameterValidator.prototype.validateExcludeReplies = function(parameters)
{
    var excludeReplies = parameters['exclude_replies'];
    if (excludeReplies !== undefined && typeof excludeReplies !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }
};

RestParameterValidator.prototype.validateIncludeEntities = function(parameters)
{
    var includeEntities = parameters['include_entities'];
    if (includeEntities !== undefined && typeof includeEntities !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }
};

RestParameterValidator.prototype.validateIncludeRetweets = function(parameters)
{
    var includeRetweets = parameters['include_rts'];
    if (includeRetweets !== undefined && typeof includeRetweets !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }
};

RestParameterValidator.prototype.validateMaxId = function(parameters)
{
    var maxId = parameters['max_id'];
    if (maxId !== undefined && typeof maxId !== 'number')
    {
        throw new Error('Expected number.');
    }
};

RestParameterValidator.prototype.validatePage = function(parameters)
{
    var page = parameters['page'];
    if (page !== undefined && typeof page !== 'number')
    {
        throw new Error('Expected number.');
    }
};

RestParameterValidator.prototype.validateSinceId = function(parameters)
{
    var sinceId = parameters['since_id'];
    if (sinceId !== undefined && typeof sinceId !== 'number')
    {
        throw new Error('Expected number.');
    }
};

RestParameterValidator.prototype.validateScreenName = function(parameters)
{
    var screenName = parameters['screen_name'];
    if (screenName !== undefined && typeof screenName !== 'string')
    {
        throw new Error('Expected boolean.');
    }
};

RestParameterValidator.prototype.validateTrimUser = function(parameters)
{
    var trimUser = parameters['trim_user'];
    if (trimUser !== undefined && typeof trimUser !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }
};

RestParameterValidator.prototype.validateUserId = function(parameters)
{
    var userId = parameters['user_id'];
    if (userId !== undefined && typeof userId !== 'number')
    {
        throw new Error('Expected number.');
    }
};

module.exports = RestParameterValidator;
