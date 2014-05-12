'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('mnemonica.services', []).value('version', '0.1');

app.factory('Stacks', function () {

    var Stacks = {};

    Stacks.availableStacks = {
        tamariz : 'Mnemonica (Tamariz stack)',
        aronson : 'Aronson\'s stack'
    };

    Stacks.stacks = {
        tamariz: [
            '4C', '2H', '7D', '3C', '4H', '6D', 'AS',
            '5H', '9S', '2S', 'QH', '3D', 'QC', '8H',
            '6S', '5S', '9H', 'KC', '2D', 'JH', '3S',
            '8S', '6H', '10C', '5D', 'KD', '2C', '3H',
            '8D', '5C', 'KS', 'JD', '8C', '10S', 'KH',
            'JC', '7S', '10H', 'AD', '4S', '7H', '4D',
            'AC', '9C', 'JS', 'QD', '7C', 'QS', '10D',
            '6C', 'AH', '9D'
        ],
        aronson: [
            'JS', 'KC', '5C', '2H', '9S', 'AS', '3H',
            '6D', '8D', 'AC', '10S', '5H', '2D', 'KD',
            '7D', '8C', '3S', 'AD', '7S', '5S', 'QD',
            'AH', '8S', '3D', '7H', 'QH', '5D', '7C',
            '4H', 'KH', '4D', '10D', 'JC', 'JH', '10C',
            'JD', '4S', '10H', '6H', '3C', '2S', '9H',
            'KS', '6S', '4C', '8H', '9C', 'QS', '6D',
            'QC', '2C', '9D'
        ]
    };

    $.each(Stacks.stacks, function (name, stack) {
        var data = [];
        $.each(stack, function (pos, card) {
          data.push({
              position: ++pos,
              card: card
          });
        });
        Stacks.stacks[name] = data;
    });

    return Stacks;

});
