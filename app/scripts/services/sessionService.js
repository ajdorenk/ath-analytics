'use strict';
/**
 * Created by Austin on 11/25/14.
 */

angular.module('proto')
  .service('Session', function () {
    this.create = function (sessionId, userId, username, userRole, firstName, lastName) {
      this.id = sessionId;
      this.userId = userId;
      this.username = username;
      this.userRole = userRole;
      this.firstName = firstName;
      this.lastName = lastName;
    };
    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.username = null;
      this.userRole = null;
      this.firstName = null;
      this.lastName = null;
    };
    return this;
  });
