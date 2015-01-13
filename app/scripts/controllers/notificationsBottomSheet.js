'use strict';

angular.module('proto').controller('NotificationsBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.notifications = [
    {date: new Date(), text: '#2 WR Ran a 98% Slant 1'},
    {date: new Date(), text: '#1 RB Quality down 16%'}
  ];

  $scope.closeBottom = function() {
    $mdBottomSheet.hide();
  };

  $scope.clearNotifications = function() {
    while($scope.notifications.length > 0) {
      $scope.notifications.pop();
    }
    $mdBottomSheet.hide();
  };

  $scope.getNotifications = function(num) {
    var notif = [];
    for(var i = 0; i < $scope.notifications.length && i < num; i++) {
      notif.push($scope.notifications[i]);
    }
    return notif;
  };

  $scope.removeNotification = function(index) {
    $scope.notifications = $scope.notifications.splice(index, 1);
  };
});
