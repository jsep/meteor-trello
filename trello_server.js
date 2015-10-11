var url = Npm.require("url");
Trello = {};


Trello.whitelistedFields = ['id', 'email', 'confirmed', 'username', 'fullName',
  'bioData', 'bio', 'avatarSource', 'gravatarHash', 'avatarHast', 'url', 'memberType', 'initials'];

var authenticate = function(oauthBinding, options) {

  var config = oauthBinding._config;
  var authorizeUrl =
      'https://trello.com/1/authorize' +
      //'?key=' + config.apiKey +
      '?name=' + config.name +
      '&scope=' + (config.scope || "") +
      '&expiration=' + (config.expiration || 'never');
      //'&response_type=token';

  var redirectUrlObj = url.parse(authorizeUrl, true);
  redirectUrlObj.query = redirectUrlObj.query || {};
  redirectUrlObj.query.oauth_token = oauthBinding.requestToken;
  redirectUrlObj.search = '';
  // Reconstruct the URL back with provided query parameters merged with oauth_token
  authorizeUrl = url.format(redirectUrlObj);
  return authorizeUrl;
};

var OAuthUrls = {
  "requestToken": "https://trello.com/1/OAuthGetRequestToken",
  "authorize": "https://trello.com/1/OAuthAuthorizeToken",
  "accessToken": "https://trello.com/1/OAuthGetAccessToken",
  "authenticate": authenticate
};

OAuth.registerService('trello', 1, OAuthUrls, function(oauthBinding) {
  var identity = oauthBinding.get('https://api.trello.com/1/members/me').data;

  var serviceData = {
    accessToken: OAuth.sealSecret(oauthBinding.accessToken),
    accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret)
  };

  // include helpful fields from twitter
  var fields = _.pick(identity, Trello.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: {
        name: identity.fullName,
        fullName: identity.fullName,
        userName: identity.username
      }
    }
  };
});

Trello.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
