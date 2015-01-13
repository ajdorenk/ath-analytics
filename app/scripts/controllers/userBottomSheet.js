'use strict';

angular.module('proto').controller('UserListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.closeBottom = function() {
    $mdBottomSheet.hide();
  };

  $scope.settings = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: '/views/bottom-sheet-settings.html',
      controller: 'SettingsBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
});
