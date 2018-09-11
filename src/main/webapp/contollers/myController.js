app.controller("myController", function($scope, $http, notify){
   
   $scope.deleteMovie = function(movieId){
       var movieData = {
           id:movieId
       };
        $http({
            url: "api/movie/delete_movie/" + movieData.id,
            method:"DELETE"
        }).then(function(response){
            notify(response.data.movieName + ' Deleted!');
            $scope.markDeleted(movieData.id);
        }, function(response){
            notify('Error');
        });
    };
    
    $scope.markDeleted = function(movieId){
        angular.forEach($scope.data, function(index, movie){
            if(movie.movieId === movieId){
                movie.s.deleted = true;
            }
        });
    };


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