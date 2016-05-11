/**
 * Created by ML on 09.05.16.
 */

app.controller('Rest', ['$scope', '$location', '$http', function($scope, $location, $http) {

     $scope.getTournaments = function() {
        $http.get('http://localhost:8080/tournamentdata').
            success(function(data) {
                $scope.tournaments = data;
            });

        console.log("http getTournaments: /n" + $scope.tournaments);
    }

}]);