var app = angular.module("myApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/addMovie");
   
    $stateProvider.state("addMovie", {
        url:"/addMovie",
        templateUrl:"./partials/addMovie.html",
        controller: function($scope, $http){
            $scope.sendMovieData = function(){
                var movieData = {
                    "movieName":$scope.nameMovie,
                    "movieYear":$scope.nameMovieYear,
                    "movieSynopsis":$scope.nameMovieSynopsis
                };

                $http({
                    url: "api/movie/create_movie",
                    method: "POST",
                    data: movieData
                }).then(function(response){
                    console.log(response.data.movieName + ' Added!');
                   // notify(response.data.movieName + ' Added!');
                }, function(response){
                    console.log("Failure");
                    // notify('All fields are required!!!');
                });
            };
        }
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
                console.log(response.data);
            }, function(response){
                console.log("Error fetching movie data");
            });
            
            $scope.updateMovieDate = function(){
                var newMovieData = {
                    "movieName": $scope.movieData.movieName,
                    "movieYear": $scope.movieData.movieYear,
                    "movieSynopsis": $scope.movieData.movieSynopsis
                };
                
                $http({
                    url: "api/movie/update_movie/" + movie.id,
                    method: "PUT",
                    data: newMovieData
                }).then(function(response){
                    console.log(response.data.movieName + " Updated");
                }, function(response){
                    console.log("Error fetching data from db");
                });
                        
            };
        }
    });
});

