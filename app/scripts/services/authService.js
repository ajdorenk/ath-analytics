/**
 * Created by Austin on 11/15/14.
 */
'use strict';

angular.module('proto')
  .service('AuthService', function (Session) {
    var authService = {};

    /* TEST USERS - START */
    var existingUsers = {}; // Demo purposes only
    // [0] = username, [1] = password, [2] = role, [3] = firstname, [4] = lastname
    existingUsers.jwest = ['jwest', 'westjarvis', 'player', 'Jarvis', 'West'];
    existingUsers.prhoads = ['prhoads', 'rhoadspaul', 'coach', 'Paul', 'Rhoads'];
    /* TEST USERS - END */

    authService.login = function (credentials) {
      if ((credentials.username in existingUsers) && existingUsers[credentials.username][1] === credentials.password) {
        var user = {};
        user.sessionId = 0;
        user.userId = 1;
        user.username = credentials.username;
        user.role = existingUsers[credentials.username][2];
        user.first = existingUsers[credentials.username][3];
        user.last = existingUsers[credentials.username][4];
        Session.create(user.sessionId, user.userId, user.username, user.role, user.first, user.last);
        return user;
      } else {
        return null;
      }
    };
    authService.isAuthenticated = function () {
      return !!Session.userId;
    };
    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
    };
    return authService;
  });
