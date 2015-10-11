Package.describe({
  name: "jsep:trello",
  summary: "Trello OAuth flow",
  version: "0.0.1"
});

Package.onUse(function(api) {
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'client');
  api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Trello');

  api.addFiles(
    ['trello_configure.html', 'trello_configure.js'],
    'client');

  api.addFiles('trello_server.js', 'server');
  api.addFiles('trello_client.js', 'client');
});