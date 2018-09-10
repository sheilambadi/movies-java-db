var app = angular.module("myApp", []);
app.controller("myController", function($scope, $http){
         
$http({
        url: "api/movie/list_movies",
        method: "GET"
    }).then(function(response){
        $scope.data=response.data;
        });
    });


