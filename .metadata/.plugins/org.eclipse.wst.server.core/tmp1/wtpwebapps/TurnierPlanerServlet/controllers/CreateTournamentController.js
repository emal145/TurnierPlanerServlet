/**
 * Created by ML on 02.05.16.
 */

app.controller('CreateTournamentController', ['$scope', '$location', '$routeParams', 'TournamentFactory', function ($scope, $location, $routeParams, TournamentFactory) {

    angular.element(document).ready(function () {
        if($routeParams.tournamentIndex != null){
            $scope.isEditMode = true;
        }else{
            $scope.isEditMode = false;
        }
        $scope.init();
    });

    $scope.saveNewTournament = function () {

        if($scope.fields.type == "RoundRobin"){
            $scope.changeTournamentRoundRobinResults();
        }
        else if($scope.fields.type == "Mix"){
            $scope.changeTournamentMixResults();
        }
        else if($scope.fields.type == "KO"){
            $scope.changeTournamentKOResults();
        }

        var td = localStorage.getItem('tournamentData');
        $scope.savedTournaments = [];
       if(td != null) {
           if (td[0] != null) {
               var data = JSON.parse(td);
               for (var n = 0; n < data.length; n++) {
                   $scope.savedTournaments.push(data[n]);
               }
           }
       }

        //Vorhandene Daten überschreiben
        if($scope.isEditMode){
            data[$routeParams.tournamentIndex] = $scope.fields;
            $scope.savedTournaments = data;
        }
        //Neue Daten hinzufügen
        else {
            $scope.savedTournaments.push($scope.fields);
        }

        window.localStorage.setItem('tournamentData', JSON.stringify($scope.savedTournaments));
        $location.path('/submitForm/Gespeichert!/Das Turnier wurde erfolgreich angelegt!/myTournaments_view');
    };

    $scope.init = function () {
    	
    	
    	if($scope.isEditMode) {
            var data  = JSON.parse(localStorage.getItem('tournamentData'));
            $scope.fields = data[$routeParams.tournamentIndex];
            $scope.newTournamentHeader = "Turnier bearbeiten";
            $scope.submitBtnTxt = "Speichern";
        }
        else{
            $scope.newTournamentHeader = "Neues Turnier erstellen";
           $scope.submitBtnTxt = "Turnier anlegen";
          
           $scope.fields = {
                name: "", tournamentId: null, count: 3, duration: 15, type: "RoundRobin", status:"inactive"
            };
           
           TournamentFactory.get({}, function (tournamentFactory) {
               $scope.fields.name = JSON.stringify(tournamentFactory.name);
           })
            $scope.fields.teams = [{id:1, name:"Team 1"},{id:2, name:"Team 2"},{id:3, name:"Team 3"}];
            $scope.fields.resultsRoundRobin = {groups:[
                {home:1, guest: 2, scoreHome: 0, scoreGuest: 0, result: "even"},
                {home:1, guest: 3, scoreHome: 0, scoreGuest: 0, result: "even"},
                {home:2, guest: 3, scoreHome: 0, scoreGuest: 0, result: "even"}]};

            $scope.fields.resultsMix = {groups: [
                {id: 1, name: "Gruppe A", teams: [
                    {id: 1, name: "Team 1", results: {
                        games: 0, loose: 0, even: 0, win: 0, score: 0, concede: 0, diff: 0, points: 0}},
                    {id: 2, name: "Team 2", results: {
                        games: 0, loose: 0, even: 0, win: 0, score: 0, concede: 0, diff: 0, points: 0}}]},
                {id: 2, name: "Gruppe B", teams: [
                    {id: 1, name: "Team 3", results: {
                        games: 0, loose: 0, even: 0, win: 0, score: 0, concede: 0, diff: 0, points: 0}},
                    {id: 2, name: "Team 4", results: {
                        games: 0, loose: 0, even: 0, win: 0, score: 0, concede: 0, diff: 0, points: 0}}]
                }]};

            $scope.fields.resultsKO = {groups: [
                {phase: 1, results: [
                {id:1, name: "Gruppe 1", teams: [
                {id: 1, name: "Team 1", win: 0, loose: 0},
                {id: 2, name: "Team 2", win: 0, loose: 0}]},

                {id:1, name: "Gruppe 2", teams: [
                    {id: 1, name: "Team 3", win: 0, loose: 0},
                    {id: 2, name: "Team 4", win: 0, loose: 0}]}]}
            ]}

            var i = localStorage.getItem("tournamentId");
            if (i != null) {
                $scope.tournamentId = parseInt(i) + 1;
            }
            else {
                $scope.tournamentId = 1000;
            }
            localStorage.setItem("tournamentId", $scope.tournamentId);
            $scope.fields.tournamentId = $scope.tournamentId;
        }
        $scope.changedTeamCount();

       $scope.$apply();
    };

    $scope.changeTournamentRoundRobinResults = function(){
        $scope.fields.resultsRoundRobin = {groups:[]};
        for (var i = 1; i <= $scope.fields.count; i++) {
            for(var x = i; x <= $scope.fields.count; x++) {
                if(i != x){
                    $scope.fields.resultsRoundRobin.groups.push({home: i, guest: x, scoreHome: 0, scoreGuest:0, result: "even"});
                }
            }
        }
    };

    $scope.changeTournamentMixResults = function(){
        var teamscount = $scope.fields.count;
        var groupscount;
        if(teamscount % 2 != 0) {
            teamscount++;
        }
        groupscount = Math.round(Math.log2(teamscount));

        var teamNameCounter = 0;
        $scope.fields.resultsMix = {groups:[]};
            for (var i = 1; i <= groupscount; i++) {
                    $scope.fields.resultsMix.groups.push({id: i, name: "Gruppe "+String.fromCharCode(64+i), teams: []});
                for (var x = 1; x <= (teamscount / groupscount); x++) {
                   if( $scope.fields.teams[teamNameCounter]!=null) {
                       $scope.fields.resultsMix.groups[i - 1].teams.push({
                           phase: 1, results: [{
                           id: x, name: $scope.fields.teams[teamNameCounter].name, results: {
                               games: 0, loose: 0, even: 0, win: 0, score: 0, concede: 0, diff: 0, points: 0}}]});
                       teamNameCounter++;
                   }
                }
            }
    };

    $scope.changeTournamentKOResults = function(){
        var teamscount = $scope.fields.count;
        var groupscount;
        if(teamscount % 2 != 0) {
            teamscount++;
        }
        groupscount = Math.round(Math.log2(teamscount));

        var teamNameCounter = 0;
        $scope.fields.resultsKO = {groups:[]};
        for (var i = 1; i <= groupscount; i++) {
            $scope.fields.resultsKO.groups.push({id: i, name: "Gruppe "+i, phase: 1, teams: []});
            for (var x = 1; x <= (teamscount / groupscount); x++) {
                if($scope.fields.teams[teamNameCounter]!=null) {
                    $scope.fields.resultsKO.groups[i - 1].teams.push({
                        id: x, name: $scope.fields.teams[teamNameCounter].name, win: 0, loose: 0});
                    teamNameCounter++;
                }
            }
        }
    };



    $scope.changedTeamCount = function () {
        var length = $scope.fields.count,
            i;
       if($scope.fields.type != null) {
           if ($scope.fields.type == "RoundRobin") {
               if (length < 3) {
                   return;
               }
           }
           else{
               if (length < 4) {
                   return;
               }
           }
       }

        for (i = $scope.fields.teams.length; i < $scope.fields.count; i++) {
           $scope.fields.teams.push({id: (i + 1), name: "Team " + (i + 1)});
        }

        for (i = $scope.fields.teams.length; i >= $scope.fields.count; i--) {
            $scope.fields.teams.splice(i,1);
        }
    };

    $scope.typeChanged = function (){
        if($scope.fields.type != "RoundRobin") {
          if($scope.fields.count < 4){
              $scope.fields.count = 4;
              $scope.changedTeamCount();
          }
          $("#count").attr("placeholder", "mind. 4 Teams");
        }
        else{
            $("#count").attr("placeholder", "mind. 3 Teams");
        }

    }
}]);
