/**
 * Created by Tobias on 03.05.2016.
// */
//app.controller('RegisterViewController', ['$scope','$firebaseAuth', function($scope,$firebaseAuth) {
//
//    //$scope.saveNewUser  = function () {
//    //    $scope.savedUser = [];
//    //    if (userdata = localStorage.getItem('userData')) {
//    //
//    //        $scope.savedUser = JSON.parse(userdata);
//    //    }
//    //    $scope.savedUser.push($scope.myUser);
//    //
//    //    localStorage.setItem('userData', JSON.stringify($scope.savedUser));
//    //    console.log("Users: " + $scope.savedUser);
//    //};
//    //$scope.showUser = function() {
//    //
//    //    $scope.myUser= [];
//    //    $scope.loadUser = [];
//    //
//    //    $scope.loadUser = JSON.parse(localStorage.getItem('userData'));
//    //    angular.copy($scope.loadUser,$scope.myUser);
//    //
//    //
//    //
//    //
//    //    //document.getElementById("registerName").value = $scope.loadUser[0].name;
//    //    $scope.myUser.email = $scope.loadUser[0].email;
//    //    console.log($scope.loadUser);
//    //
//    //
//    //
//    //}
//
//    var firebaseObj = new Firebase("https://brilliant-heat-1322.firebaseio.com/");
//    var auth = $firebaseAuth(firebaseObj);
//
//    $scope.signUp = function() {
//        if (!$scope.regForm.$invalid) {
//            var email = $scope.myUser.email;
//            var password = $scope.myUser.password;
//            if (email && password) {
//                auth.$createUser(email, password)
//                    .then(function() {
//                        // do things if success
//                        console.log('User creation success');
//                    }, function(error) {
//                        // do things if failure
//                        console.log(error);
//                    });
//            }
//        }
//    };
//}]);




// and use it in our controller
app.controller("RegisterViewController", ["$scope", "Auth",'$location','$timeout',
    function($scope, Auth,$location,$timeout) {
        $scope.createUser = function() {
            $scope.message = null;
            $scope.error = null;

            Auth.$createUser({
                email: $scope.myUser.email,
                password: $scope.myUser.password,
                name: $scope.myUser.name,
                surname: $scope.myUser.surname,
                username: $scope.myUser.username,
            }).then(function(userData) {
                //$scope.message = "Benutzer erfolgreich angelegt: " + userData.uid;
                $scope.message = "Benutzer erfolgreich angelegt!";
                $location.path('/submitForm/Gespeichert/Benutzer erfolgreich angelegt!/login_view');

            })["catch"](function(error) {
                $scope.error = "Email wird bereits verwendet!";
                $timeout(function() {
                    $scope.error = "";
                }, 4000);
                
            });
        };

        $scope.removeUser = function() {
            $scope.message = null;
            $scope.error = null;

            Auth.$removeUser({
                email: $scope.email,
                password: $scope.password
            }).then(function() {
                $scope.message = "User removed";
            })["catch"](function(error) {
                $scope.error = error;
            });
        };
    }
]);