app.controller("myController", function($stateParams, $scope, $http){
   
   
    
    $scope.markDeleted = function(movieId){
        angular.forEach($scope.data, function(index, movie){
            if(movie.movieId === movieId){
                movie.s.deleted = true;
            }
        });
    };

  
  
}); 