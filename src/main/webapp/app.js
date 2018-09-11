var app = angular.module("myApp", ["ui.router", "cgNotify"]);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/addMovie");
   
    $stateProvider.state("addMovie", {
        url:"/addMovie",
        templateUrl:"./partials/addMovie.html",
        controller: function($scope,$state, $http, notify){
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
                     notify({
                        message:response.data.movieName + " Added",
                        duration:2000,
                        classes: 'alert-success'
                    });
                    $state.go("viewMovies");
                }, function(response){
                    console.log("Failure");
                    notify({
                        message: 'All fields are required!!!',
                        duration:3000,
                        classes: 'alert-danger'
                    });
                });
            };
        }
    }).state("viewMovies",{
        url:"/viewMovies",
        templateUrl:"./partials/viewMovies.html",
        controller: function($scope, $state, $http, notify){
            $http({
                url: "api/movie/list_movies",
                method: "GET"
                }).then(function(response){
                    $scope.data=response.data;
                    console.log(response.status);
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
                     notify({
                        message:response.data.movieName + " Deleted",
                        duration:2000,
                        classes: 'alert-success'
                    });
                    $state.reload();
                 }, function(response){
                     console.log(response);
                     notify({
                         message: "Error deleting movie",
                         duration:3000,
                         classes: 'alert-danger'
                     });
                 });
             };
        }
    }).state("updateMovie",{
        url:"/updateMovie/:idMovie",
        templateUrl:"./partials/updateMovie.html",
        controller:function($stateParams, $state, $scope, $http, notify){
            
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
                    notify({
                        message:response.data.movieName + " Updated",
                        duration:2000,
                        classes: 'alert-success'
                    });
                    $state.go("viewMovies");
                }, function(response){
                    console.log("Error updating movie");
                    notify({
                        message: "Error updating movie",
                        duration:3000,
                        classes: 'alert-danger'
                    });
                });
                        
            };
        }
    });
});

