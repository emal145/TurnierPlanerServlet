/**
 * Created by ML on 03.05.16.
 */

app.controller('RoundRobinController', ['$scope','$routeParams', function($scope, $routeParams) {

    $scope.initData = function () {
        $scope.currentUserId = $routeParams.tournamentId;
        $scope.savedTournaments = JSON.parse(localStorage.getItem('tournamentData'));
        $scope.currentTournament = $scope.savedTournaments[$scope.currentUserId];

        $scope.loadScorePoints();
    };

    $scope.loadScorePoints = function() {
        $scope.points = [];
        var length = $scope.currentTournament.teams.length;
        var scoreHomeCntr = 0;
        var scoreGuestCntr = 0;

        for (var i = 0; i < length; i++) {
            var data = [];
            for (var j = 0; j < length; j++) {
                if(i == j){
                    data.push('--');
                }
                else if(i < j){
                    var scrhme = $scope.currentTournament.resultsRoundRobin.groups[scoreHomeCntr].scoreHome;
                    var scrgst = $scope.currentTournament.resultsRoundRobin.groups[scoreHomeCntr].scoreGuest;
                    scoreHomeCntr++;
                   data.push(scrhme + ':' + scrgst);
                }
                else{
                    if(i > 1 && j > 1){
                        scoreGuestCntr = scoreGuestCntr + (length-j-1);
                    }
                    else if(i > 1 && j > 0){
                        scoreGuestCntr =  (i-1) + (length-j-1);
                    }
                    else{
                        scoreGuestCntr = (i-1);
                    }
                    console.log(scoreGuestCntr + "--- " + i + " ---- " + j);
                    var scrhme = $scope.currentTournament.resultsRoundRobin.groups[scoreGuestCntr].scoreGuest;
                    var scrgst = $scope.currentTournament.resultsRoundRobin.groups[scoreGuestCntr].scoreHome;
                    data.push(scrhme + ':' + scrgst);
                    //data.push('xx');

                }
            }
            console.log("----");
            $scope.points.push(data);
        }
    };

    $scope.editTournamentResult = function() {
        if ($scope.homeTeam != $scope.guestTeam) {
            var homeid = $scope.homeTeam;
            var guestid = $scope.guestTeam;
            var homepnts = $scope.homePoints;
            var guestpnts = $scope.guestPoints;

            if (homeid > guestid) {
                guestid = $scope.homeTeam;
                homeid = $scope.guestTeam;
                homepnts = $scope.guestPoints;
                guestpnts = $scope.homePoints;
            }
            for (var i = 0; i < $scope.currentTournament.resultsRoundRobin.groups.length; i++) {

                if ($scope.currentTournament.resultsRoundRobin.groups[i].home == homeid) {
                    if ($scope.currentTournament.resultsRoundRobin.groups[i].guest == guestid) {
                        $scope.currentTournament.resultsRoundRobin.groups[i].scoreHome = homepnts;
                        $scope.currentTournament.resultsRoundRobin.groups[i].scoreGuest = guestpnts;
                        if (homepnts > guestpnts) {
                            $scope.currentTournament.resultsRoundRobin.groups[i].result = "win";
                        } else {
                            $scope.currentTournament.resultsRoundRobin.groups[i].result = "loose";
                        }
                    }
                }
            }
            $scope.savedTournaments[$scope.currentUserId] = $scope.currentTournament;
            localStorage.setItem('tournamentData', JSON.stringify($scope.savedTournaments));

            $scope.calculateResults();
            $scope.setDataToTable();

        }
    };

    $scope.calculateResults = function(){

    };

    $scope.setDataToTable = function(){
        var result = $scope.homePoints+':'+$scope.guestPoints;
        $scope.points[$scope.homeTeam-1][$scope.guestTeam-1] = result;

        result = $scope.guestPoints+':'+$scope.homePoints;
        $scope.points[$scope.guestTeam-1][$scope.homeTeam-1] = result;

    };


    $scope.showDiv = false;
    $scope.hideShowDiv = function() {
        $scope.showDiv = !$scope.showDiv;
    }

}]);