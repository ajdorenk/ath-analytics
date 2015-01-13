'use strict';

angular.module('proto').controller('TypeaheadCtrl', function($scope, $http, RosterService) {
  var roster = new RosterService("ian");
  $scope.players = roster.getPlayers();
  $scope.selectedPlayer = '';
});
