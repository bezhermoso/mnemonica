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
  }])
  .controller('QuizCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
        $rootScope.page_title = 'Quiz';
  }])
  .controller('AboutCtrl', ['$rootScope', function ($rootScope) {
        $rootScope.page_title = 'About';
  }]);
