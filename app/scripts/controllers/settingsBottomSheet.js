'use strict';

angular.module('proto').controller('SettingsBottomSheetCtrl', function($scope, $mdBottomSheet, ThemeService) {
  // Theme
  var theme = new ThemeService();
  $scope.dynamicTheme = theme.getMainTheme();
  $scope.themeColors = theme.getColors();

  $scope.setTheme = function( newColor ) {
    theme.setMainTheme(newColor);
  };

  $scope.user = [
    { notifications: 1 },
    { sounds: 1 }
  ];

  $scope.closeBottom = function() {
    $mdBottomSheet.hide();
  };
});
