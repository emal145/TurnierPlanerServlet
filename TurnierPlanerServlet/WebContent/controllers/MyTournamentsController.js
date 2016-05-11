/**
 * Created by ML on 02.05.16.
 */

app.controller('MyTournamentsController', ['$scope', '$location', '$controller',function($scope, $location, $controller) {

    $scope.tournaments = [];

    var data = localStorage.getItem('tournamentData');

    if (data[0] != null) {
        $scope.tournaments = JSON.parse(data);
    }
    $scope.editTournament = function(index){
        $location.path('/createTournament_view/'+index);
    };

    $scope.deleteTournament = function(index){
        $scope.tournaments.splice(index, 1);
        localStorage.setItem('tournamentData', $scope.tournaments);
    };

    var restcontroller = $scope.$new();
    $controller('Rest',{$scope:restcontroller});
    restcontroller.getTournaments();
}]);
