/**
 * Created by iantrich on 10/18/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name proto.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Login Controller of the proto App
 */
angular.module('proto')
    .controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, USER_ROLES, AuthService, $mdDialog, Session, $location, $mdBottomSheet) {
    $scope.showpassword = 0;
    $scope.credentials = {
      username: '',
      password: ''
    };

    var showAlert = function() {
      var alert = $mdDialog.alert()
        .title('Invalid Username/Password Combination, ')
        .content('Please try again.')
        .ok('Got It!');
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    };

    $scope.logout = function() {
      //$scope.removeCurrentUser();
      Session.destroy();
      //$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      $location.path('/login');
      $mdBottomSheet.hide();
    };

    $scope.login = function (credentials, ev) {
      //alert("Login clicked");
      var user = AuthService.login(credentials);
      if (user) {
        //$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        //$scope.setCurrentUser(user);
        $location.path('/summary');
        //alert("Current user: " + $scope.currentUser.username);
      } else {
        //$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        showAlert(ev);
      }
    };

    $scope.auth_bypass = function (ev, role) {
      var credentials = new Object();
      if (role == USER_ROLES.coach) {
        credentials.username = "prhoads";
        credentials.password = "rhoadspaul";
      } else if (role == USER_ROLES.player) {
        credentials.username = "jwest";
        credentials.password = "westjarvis";
      }
      $scope.login(credentials, ev);
    }

  });
