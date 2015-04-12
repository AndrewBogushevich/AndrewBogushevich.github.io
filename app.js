'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.view3',
    'myApp.addPost',
    'myApp.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]).

    controller('myCtrl', ['$scope','$firebase', '$location', function ($scope, $firebase, $location) {
        $scope.authorized = false;
        var ref = new Firebase("https://dazzling-inferno-3181.firebaseio.com");
        ref.onAuth(function (authData) {
            if (authData) {
                $scope.authorized = authData;
            } else {
                $scope.authorized = false;
            }

        });
        $scope.unAuthorize = function(){
            ref.unauth();
        }
        $scope.goto = function(key){
            $location.path(key);
        };

    }]);
