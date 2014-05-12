'use strict';

/* Directives */


var app = angular.module('mnemonica.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

app.directive('mailTo', function () {
   return function (scope, elem, attribute) {
       var mail = atob(attribute.mailTo);
       elem.attr('href', 'mailto:' + mail);
       scope.mailto = mail;
   }
});
