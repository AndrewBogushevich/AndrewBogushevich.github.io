'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3/:id', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope', '$route', '$firebaseObject', function ($scope, $route, $firebaseObject) {
        var name = $route.current.params.id;
        var url = "https://dazzling-inferno-3181.firebaseio.com/posts/" + name;
        var db = new Firebase(url);
        $scope.post = $firebaseObject(db);



    }]);