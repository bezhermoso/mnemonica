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

app.factory('QuizMaker', function () {
    var QuizMaker = {};

    function Quiz () {

        this.questions = [];

        this.complete = false;

        this.correct_count = 0;

        this.wrong_count = 0;

        this.correct = function (question_id) {
            for (var i in this.questions) {
                if (this.questions[i].id == question_id) {
                    if (this.questions[i].correct === false) {
                        this.wrong_count--;
                    } else if(this.questions[i].correct === true) {
                        this.correct_count--;
                    }
                    this.questions[i].correct = true;
                    this.correct_count++;
                }
            }
        }

        this.wrong = function (question_id) {
            for (var i in this.questions) {
                if (this.questions[i].id == question_id) {
                    if (this.questions[i].correct === false) {
                        this.wrong_count--;
                    } else if(this.questions[i].correct === true) {
                        this.correct_count--;
                    }
                    this.questions[i].correct = false;
                    this.wrong_count++;
                }
            }
        }

        this.add = function (question) {
            this.questions.push(question);
        };

        this.shuffle = function () {
            this.questions = shuffle_array(this.questions);
        }
    };

    QuizMaker.create = function (stack, mode) {

        var quiz = new Quiz();

        if (mode == 'value') {
            $.each(stack, function (i, card) {
                quiz.add({
                    id: i,
                    unknown: 'card',
                    card: card.card,
                    position: card.position,
                    correct: null
                });
            });
        } else if (mode == 'position') {
            $.each(stack, function (i, card) {
                quiz.add({
                    id: i,
                    unknown: 'position',
                    card: card.card,
                    position: card.position,
                    correct: null
                });
            });

        } else if(mode == 'both') {
            $.each(stack, function (i, card) {
                var rand = Math.floor(Math.random() * 100);
                quiz.add({
                    id: i,
                    unknown: rand % 2 == 0 ? 'card' : 'position',
                    card: card.card,
                    position: card.position,
                    correct: null
                });
            });
        }
        quiz.shuffle();
        return quiz;
    }
    return QuizMaker;
});

/**
 * http://css-tricks.com/snippets/javascript/shuffle-array/
 *
 * @param o
 * @returns {*}
 * @constructor
 */
function shuffle_array(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};