app.controller("myController", function($scope, $http){
   
   $scope.sendMovieData = function(){
       var movieData = {
           "movieName":$scope.nameMovie,
           "movieYear":$scope.nameMovieYear,
           "movieSynopsis":$scope.nameMovieSynopsis
       };
       $http.post("api/movie/create_movie", movieData);
   };
   
   $http({
            url: "api/movie/list_movies",
            method: "GET"
        }).then(function(response){
            $scope.data=response.data;
        });
    });
