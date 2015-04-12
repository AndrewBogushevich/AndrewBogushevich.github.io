'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$location', function ($scope, $location) {
        var db = new Firebase("https://dazzling-inferno-3181.firebaseio.com");
        $scope.mail = "";
        $scope.password = "";
        $scope.login = function () {
            db.authWithPassword({email: $scope.mail, password: $scope.password}, function (error, userData) {
                if(error){
                    console.log(error);
                }else{
                    console.log(userData.uid);
                    $location.path('/view1');
                }
            })
        };

    }]);