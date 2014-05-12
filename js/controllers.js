'use strict';

/* Controllers */

angular.module('mnemonica.controllers', [])
  .controller('LearnCtrl',
        ['$rootScope', '$scope', 'Stacks', '$routeParams', '$location',
        function($rootScope, $scope, Stacks, $routeParams, $location) {

            $rootScope.page_title = 'Learn';

            $scope.Stacks = Stacks;
            $scope.perPage = 5;
            $scope.offset = 0;
            $scope.currentStack = {
                name: null,
                stack: []
            }

            $scope.selectStack = function (selected_name) {
                $scope.currentStack.stack = Stacks.stacks[selected_name];
            }

            $scope.redirectTo = function (selected_name) {
                $location.path('learn/' + selected_name);
            }

            $scope.next = function () {
                if ($scope.offset + $scope.perPage >= $scope.currentStack.stack.length) {
                    return;
                }
                $scope.offset = $scope.offset + $scope.perPage;
            }

            $scope.prev = function () {
                if ($scope.offset == 0) {
                    return;
                }
                $scope.offset = $scope.offset - $scope.perPage;
            }

            if ($routeParams.stack) {
                $scope.currentStack.name = $routeParams.stack;
                $scope.selectStack($routeParams.stack);
            }

            $(document).keydown(function(event) {
                if (event.target.nodeName !== 'BODY') {
                    return;
                }
                //Right-arrow
                if (event.keyCode == 39) {
                    $scope.next();
                } else if (event.keyCode == 37) { //Left arrow
                    $scope.prev();
                } else {
                    return;
                }
                $scope.$apply();
            });

            $('#swipe-area').swipe({
                swipeLeft: function () {
                    $scope.next();
                    $scope.$apply();
                },
                swipeRight: function () {
                    $scope.prev();
                    $scope.$apply();
                }
            })
  }])
  .controller('QuizCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'Stacks', 'QuizMaker',
        function($rootScope, $scope, $routeParams, $location, Stacks, QuizMaker) {
        $rootScope.page_title = 'Quiz';
        $scope.Stacks = Stacks;
        $scope.currentStack = {
            name: null,
            stack: []
        }
        $scope.quizMode = 'value';
        $scope.currentQuiz = null;
        $scope.currentQuestion = null;
        $scope.questionIndex = null;
        $scope.answer = null;
        $scope.answerClass = {input: '', glyph: ''};

        $scope.selectStack = function (selected_name) {
           $scope.currentStack.stack = Stacks.stacks[selected_name];
        }

        $scope.redirectTo = function (selected_name, mode) {
            if (mode != undefined && mode) {
                $location.path('quiz/' + selected_name + '/' + mode);
            } else {
                $location.path('quiz/' + selected_name);
            }
        };

        $scope.quiz = function (stack, quiz) {
            var quiz = QuizMaker.create(stack, quiz);
            $scope.currentQuiz = quiz;
            $scope.questionIndex = 0;
        };

        if ($routeParams.stack) {
            $scope.currentStack.name = $routeParams.stack;
            $scope.quizMode = $routeParams.mode || null;
            $scope.selectStack($routeParams.stack);
        }

        if ($scope.quizMode && $scope.currentStack.name) {
            $scope.quiz($scope.currentStack.stack, $scope.quizMode);
        }

        $scope.$watch('questionIndex', function (value) {

                if (value >= $scope.currentQuiz.questions.length) {
                    $scope.currentQuiz.complete = true;
                    $scope.currentQuestion = null;
                    return;
                }

                $scope.currentQuestion = $scope.currentQuiz.questions[value];
                if ($scope.currentQuestion.unknown == 'card') {
                    $scope.question = 'What is card #' + $scope.currentQuestion.position + '?';
                    $scope.answerPlaceholder = 'Example: 9D (9 of Diamonds); KS (King of Hearts), etc.'
                } else {
                    $scope.question = 'What is ' + $scope.currentQuestion.card + '\'s position?';
                    $scope.answerPlaceholder = '';
                }
        });

        $scope.$watch('currentQuestion.correct', function (value) {
            if (value === true) {
                $scope.answerClass.input = 'has-success';
            } else if (value === false) {
                $scope.answerClass.input = 'has-error';
            } else {
                $scope.answerClass.input = '';
                $scope.answerClass.glyph = '';
            }
        });

        $scope.checkAnswer = function () {

            if ($scope.currentQuestion.correct !== null) {
                return;
            }

            var pattern = new RegExp('^' + $scope.answer + '$', 'i');

            if (pattern.test($scope.currentQuestion[$scope.currentQuestion.unknown])) {
                $scope.currentQuiz.correct($scope.currentQuestion.id);
                $scope.question = 'Correct!';
            } else {
                $scope.currentQuiz.wrong($scope.currentQuestion.id);
                $scope.question = 'Wrong!';
            }
            $scope.currentQuestion.unknown = false;
        }

        $scope.next = function () {
            $scope.questionIndex++;
            $scope.answer = '';
        }

  }])
  .controller('AboutCtrl', ['$rootScope', function ($rootScope) {
        $rootScope.page_title = 'About';
  }]);
