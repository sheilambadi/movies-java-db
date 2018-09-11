var app = angular.module("myApp", ["ui.router", "cgNotify"]);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/addMovie");
   
    $stateProvider.state("addMovie", {
        url:"/addMovie",
        templateUrl:"./partials/addMovie.html",
        controller: function($scope, $http, notify){
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
                    notify(response.data.movieName + ' Added!');
                }, function(response){
                    console.log("Failure");
                    notify('All fields are required!!!');
                });
            };
        }
    }).state("viewMovies",{
        url:"/viewMovies",
        templateUrl:"./partials/viewMovies.html",
        controller: function($scope, $http, notify){
            $http({
                url: "api/movie/list_movies",
                method: "GET"
                }).then(function(response){
                    $scope.data=response.data;
                    console.log("Data fetched from db");
                }, function(response){
                    console.log("Error fetching from db");
                });
                
            $scope.deleteMovie = function(movieId){
                var movieData = {
                    id:movieId
                };
                 $http({
                     url: "api/movie/delete_movie/" + movieData.id,
                     method:"DELETE"
                 }).then(function(response){
                     // $scope.markDeleted(movieData.id);
                     console.log(response.data.movieName + " Deleted successfully");
                     notify(response.data.movieName + ' Deleted!');
                 }, function(response){
                     console.log(response.data.movieName + " Not Deleted");
                     notify(response.data.movieName + " Not Deleted");
                 });
             };
        }
    }).state("updateMovie",{
        url:"/updateMovie/:idMovie",
        templateUrl:"./partials/updateMovie.html",
        controller:function($stateParams, $scope, $http, notify){
            
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
                    notify(response.data.movieName + " Updated");
                }, function(response){
                    console.log("Error updating movie");
                    notify("Error updating movie");
                });
                        
            };
        }
    });
});

