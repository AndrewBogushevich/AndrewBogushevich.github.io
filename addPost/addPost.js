'use strict';

angular.module('myApp.addPost', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addPost', {
            templateUrl: 'addPost/addPost.html',
            controller: 'addPostCtrl'
        });
    }])

    .controller('addPostCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
        var db = new Firebase("https://dazzling-inferno-3181.firebaseio.com");

        $scope.title = "";
        $scope.content = "";
        $scope.sendPost = function () {
            if($scope.title && $scope.content) {
                $firebaseArray(db.child("posts")).$add({title: $scope.title, content: $scope.content});
                $scope.mssg = "Post added";
                $scope.title = "";
                $scope.content = "";
            }else{
                $scope.mssg = "Title or content is empty!";
            }
        }

    }])
