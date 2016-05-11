/**
 * Created by Tobias on 07.05.2016.
 */
app.controller("WelcomeViewController", ["$scope",'CurrenUser','$location',
    function($scope, CurrenUser,$location) {

    $scope.username = CurrenUser.getUser();



    }
]);
