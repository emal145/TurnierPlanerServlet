/**
 * Created by ML on 07.05.16.
 */

app.controller('SubmitController', ['$scope','$routeParams', '$timeout', '$location', function($scope, $routeParams, $timeout, $location) {
    $scope.successTournamentSavedMessage = "";
    $scope.successTournamentSavedTitle = "";
    //Adresse zur automatischen Weiterleitung
    $scope.redirectPath = '/'+$routeParams.redirectAddress;

    if($routeParams.alertTitle != null){
        if($routeParams.alertMessage != null){
            $scope.successTournamentSavedMessage = $routeParams.alertMessage;
            $scope.successTournamentSavedTitle = $routeParams.alertTitle;
        }
    }

    //Die gewünschte Seite wird mittels des Parameters redirectAddress nach 2.5 sekunden automatisch aufgerufen
    $timeout(function() {
        $location.path($scope.redirectPath);
    }, 2500);

}]);
