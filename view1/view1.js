'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$firebaseArray', '$location', function ($scope, $firebaseArray, $location) {


        var db = new Firebase("https://dazzling-inferno-3181.firebaseio.com/posts");
        var startIndex = 0;

        $scope.news = $firebaseArray(db.limitToFirst(5));

        console.log($scope);

        $scope.increaseStartIndex = function () {

            $firebaseArray(db.orderByKey().startAt($scope.news[4].$id).limitToFirst(2)).$loaded()
                .then(function (arr) {
                    if (arr[1]) {
                        return $firebaseArray(db.orderByKey().startAt(arr[1].$id).limitToFirst(5)).$loaded();
                    } else {
                        return $scope.news;
                    }
                })
                .then(function (array) {
                    $scope.news = array;
                }, function (error) {
                    console.log("errorCall" + error);
                });
        }
        $scope.decreaseStartIndex = function () {
            $firebaseArray(db.orderByKey().endAt($scope.news[0].$id).limitToLast(2)).$loaded()
                .then(function (arr) {
                    if (arr[1]) {
                        return $firebaseArray(db.orderByKey().endAt(arr[0].$id).limitToLast(5)).$loaded();
                    } else {
                        return $scope.news;
                    }
                })
                .then(function (array) {
                    $scope.news = array;
                }, function (error) {
                    console.log("errorCall" + error);
                });
        };
        $scope.goto = function(key){
            console.log(key);
            $location.path(key);
        };


    }]);