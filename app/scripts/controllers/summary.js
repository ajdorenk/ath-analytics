'use strict';

/**
 * @ngdoc function
 * @name proto.controller:SummaryCtrl
 * @description
 * # SummaryCtrl
 * Summary Controller of the proto App
 */

// TODO To connect to our database using a RESTful Angular Service that will make the mql calls and return them in JSON or XML
// which we can then use to bind to our views/controller

angular
  .module('proto').controller('SummaryCtrl', function ($scope, RosterService, PlayerService, $timeout, $mdSidenav) {
    // Inject Math into controller
    $scope.Math = window.Math;

    // Sidebar
    var roster = new RosterService("ian");
    $scope.players = roster.getPlayers();

    $scope.toggleLeft = function () {
      $scope.players.wideReceivers.show = 0;
      $scope.players.runningBacks.show = 0;
      $scope.players.tightEnds.show = 0;
      $mdSidenav('left').toggle();
    };

    $scope.close = function () {
      $mdSidenav('left').close();
    };

    $scope.selectPlayer = function (id) {
      $scope.player = (new PlayerService(id, "1", "2").getData());
      $scope.chart('accuracy');
      $mdSidenav('left').close();
    };

    // Player Data
    $scope.showPlayerInfo = 1;
    $scope.player = (new PlayerService(2, "1", "2").getData());
    $scope.playerStats = $scope.player.stats;

    // Progress Circle
    $scope.quality1Current = 0;
    $scope.quality1Complete = 76;
    $scope.quality2Current = 0;
    $scope.quality2Complete = 82;
    $scope.quality3Current = 0;
    $scope.quality3Complete = 79;

    var random = function (min, max) {
        return Math.round(Math.floor(Math.random() * (max - min + 1) + min));
      },
      timeout;

    var start = function () {
      stop();
      timeout = $timeout(function () {
        if ($scope.quality1Current < $scope.quality1Complete ||
          $scope.quality2Current < $scope.quality2Complete ||
          $scope.quality3Current < $scope.quality3Complete) {
          if ($scope.quality1Current < $scope.quality1Complete) {
            $scope.quality1Current += 2;
          }
          if ($scope.quality2Current < $scope.quality2Complete) {
            $scope.quality2Current += 2;
          }
          if ($scope.quality3Current < $scope.quality3Complete) {
            $scope.quality3Current += 2;
          }
          start();
        }
      }, 20);
    };

    var stop = function () {
      $timeout.cancel(timeout);
    };
    var reset = function () {
      stop();
      $scope.uploadCurrent = 0;
    };

    start();

    // Stat Chart
    $scope.summaryShowChart = 1;
    var values = [];
    for (var i = 0; i < $scope.playerStats.accuracy.values.length; i++) {
      values.push({x: $scope.playerStats.accuracy.values[i][0], Value: $scope.playerStats.accuracy.values[i][1]});
    }
    $scope.data = values;
    $scope.options = {
      axes: {
        x: {key: 'x', type: 'date', ticks: 2}
      },
      series: [
        {y: 'Value', color: '#F44336', thickness: '2px', type: 'area', striped: true}
      ],
      lineMode: 'linear',
      tension: 0.7,
      tooltip: {
        mode: 'scrubber',
        formatter: function (x, y, series) {
          return moment(x).fromNow() + ' : ' + y;
        }
      },
      drawLegend: false,
      drawDots: true,
      columnsHGap: 5
    };

    $scope.chart = function (type) {
      var stat;
      switch (type) {
        case 'accuracy':
          stat = $scope.playerStats.accuracy.values;
          break;
        case 'vertical':
          stat = $scope.playerStats.vertical.values;
          break;
        case 'routes':
          stat = $scope.playerStats.routes.values;
          break;
        case 'maxvelspd':
          stat = $scope.playerStats.maxvelspd.values;
          break;
        case 'maxvelstd':
          stat = $scope.playerStats.maxvelstd.values;
          break;
        case 'snapreac':
          stat = $scope.playerStats.snapreac.values;
          break;
        default:
          stat = $scope.playerStats.accuracy.values;
          break;
      }
      var newValues = [];
      for (var i = 0; i < stat.length; i++) {
        newValues.push({x: stat[i][0], Value: stat[i][1]});
      }
      $scope.data = newValues;
    };

    // Date Filter
    $scope.date1 = new Date();

    // Dropdown Filter
    $scope.ddSelectOptions = [
      {text: '2014'},
      {text: '2013'},
      {text: '2012'},
      {text: '2011'}
    ];
    $scope.ddSelectSelected = {};

  });




