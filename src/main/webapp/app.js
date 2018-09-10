var app = angular.module("myApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/addMovie");
   
    $stateProvider.state("addMovie", {
        url:"/addMovie",
        templateUrl:"./partials/addMovie.html",
        controller:"myController"
    }).state("viewMovies",{
        url:"/viewMovies",
        templateUrl:"./partials/viewMovies.html",
        controller:"myController"
    });
});

