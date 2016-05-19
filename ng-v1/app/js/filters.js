'use strict';

/* Filters */

var app = angular.module('mnemonica.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);

app.filter('stackSearch', ['$filter', function ($filter) {
    return function (cards, keyword, offset, limit) {
        if (!keyword) {
            cards = cards.slice(offset);
            cards = $filter('limitTo')(cards, limit);
            return cards;
        } else {
            var pattern = new RegExp(keyword, 'i');
            cards = jQuery.grep(cards, function (card) {
                return pattern.test(card.card) || pattern.test(card.position);
            });
            return cards;
        }
    }
}]);
