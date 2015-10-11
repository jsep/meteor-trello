Template.configureLoginServiceDialogForTrello.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForTrello.fields = function () {
  return [
    {property: 'name', label: 'Name'},
    {property: 'apikey', label: 'apiKey'},
    {property: 'secret', label: 'Secret'}
  ];
};
