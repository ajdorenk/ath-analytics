'use strict';

angular.module('proto').controller('NavBarCtrl', function($scope, $mdBottomSheet, $mdSidenav, $mdToast, ThemeService) {
  window.scope = $scope;

  // Theme
  var theme = new ThemeService();
  $scope.dynamicTheme = theme.getMainTheme();

  // Dropdown Testing
  $scope.ddSelectOptions = [
    {
      text: 'test 1'
    },
    {
      text: 'text2'
    }
  ];
  $scope.ddSelectSelected;

  // Sidenav
  $scope.toggleSide = function(id) {
    $mdSidenav(id).toggle();
  };

  $scope.closeSide = function(id) {
    $mdSidenav(id).close();
  };

  // Tabs
  $scope.pages = [
    { name: 'Summary', icon: 'fa fa-user', link: 'summary', showMenu: false, menu: [
      {
        text: 'saved summary 1',
        link: ''
      },
      {
        text: 'saved summary 2',
        link: ''
      }
    ]},
    { name: 'Comparison', icon: 'fa fa-group', link: 'compare', showMenu: false, menu: [
      {
        text: 'saved compare 1',
        link: ''
      },
      {
        text: 'saved compare 2',
        link: ''
      }
    ]},
    { name: 'Modeling', icon: 'fa fa-line-chart', link: 'model', showMenu: false, menu: [
      {
        text: 'saved modeling 1',
        link: ''
      },
      {
        text: 'saved modeling 2',
        link: ''
      }
    ]}
  ];

  // Fab Actions
  $scope.showFabActions = false;
  $scope.toggleFab = function() {
    $scope.showFabActions = !$scope.showFabActions;
  };

  $scope.actionSelected = function(action) {
    var toast = '';
    switch(action) {
      case 0:       // Save View
        toast = 'Current View Saved';
        break;
      case 1:       // Add Player to Comparison
        toast = 'Player Added to Comparison';
        break;
      case 2:       // Add Route to Modeling
        toast = 'Custom Route Added to Modeling';
        break;
    }
    $mdToast.show($mdToast.simple().content(toast).position("bottom right"));
  };

  $scope.addTab = function(title) {
    //$scope.pages.push({ name: title, icon: 'fa fa-user', link: 'summary'});
    $scope.showFabActions = !$scope.showFabActions;
  };

  // Options
  $scope.userOptions = function($event) {
    $mdBottomSheet.show({
      templateUrl: '/views/bottom-sheet-user.html',
      controller: 'UserListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

  // Notifications
  $scope.userNotifications = function($event) {
    $mdBottomSheet.show({
      templateUrl: '/views/bottom-sheet-notifications.html',
      controller: 'NotificationsBottomSheetCtrl',
      targetEvent: $event
    });
  };

  // Activity
  $scope.activities = [];
  var players = ['#1 Jim Storm', '#2 Adam Storm', '#3 Harry Dresden', '#4 Michael Smith'];
  var routes = ['Slant', 'Deep', 'Corner'];
  var t = new Date();
  t.setMonth(t.getMonth() - 1);
  t = t.getTime();

  for(var i = 0; i < 30; i++) {
    var d = new Date(t + i*3600*1000*24);
    for(var j = 0; j < 5; j++) {
      $scope.activities.unshift(
        {
          date: d,
          text: players[Math.floor(Math.random() * 4)] +
          ' ran a ' + routes[Math.floor(Math.random() * 3)] +
          ' ' + Math.ceil(Math.random() * 3) + ' route with ' +
          Math.ceil(Math.random() * (100 - 70) + 70) + '% accuracy'
        });
    }
  }
});
