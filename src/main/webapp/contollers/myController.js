app.controller("myController", function($scope, $http, notify){
   
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
          notify(response.data.movieName + ' Added!');
       }, function(response){
           notify('All fields are required!!!');
       });
   };
   
   $http({
            url: "api/movie/list_movies",
            method: "GET"
        }).then(function(response){
            $scope.data=response.data;
        });
    });
