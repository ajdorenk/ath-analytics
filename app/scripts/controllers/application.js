/**
 * Created by Austin on 11/15/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name proto.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Application Controller of the proto App
 */
angular.module('proto')
  .controller('ApplicationCtrl', function ($scope, USER_ROLES, AuthService, Session) {
    $scope.isLoggedIn = function() {
      return Session.username != null;
    }

    $scope.getCurrentUser = function() {
      if ($scope.isLoggedIn()) {
        var user = {};
        user.username = Session.username;
        user.role = Session.userRole;
        user.first = Session.firstName;
        user.last = Session.lastName;
        return user;
      } else {
        return null;
      }
    }

  });
