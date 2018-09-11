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
    }).state("updateMovie",{
        url:"/updateMovie/:idMovie",
        templateUrl:"./partials/updateMovie.html",
        controller:function($stateParams, $scope, $http){
            
            // variables
            var movie = {
                id:$stateParams.idMovie
            };
            
            $http({
                url: "api/movie/movie_id/"+movie.id,
                method:"GET"
            }).then(function(response){
                $scope.movieData = response.data;
                console.log(response.data.movieName);
            });
            
            
        }
    });
});

