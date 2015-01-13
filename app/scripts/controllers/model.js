'use strict';

var width;
var height;
var ratio;
var testSlantRoute = [{x: 60,y: 60}];

angular.module('proto')
  .controller('ModelCtrl', function($scope, RosterService, PlayerService, RouteService ) {
    // Dropdown functions

//    $scope.pageID = 'modelPage';

//    var newHeight = window.innerHeight - $(".container-fluid").height;
//    $("#modelPage").css("height: newHeight; position: relative; display: inline-block;");

    $scope.init = function () {
      $scope.modelCanvas = document.getElementById("model");
      $scope.context = $scope.modelCanvas.getContext("2d");
      $scope.width;
      $scope.height;
      $scope.ratio;

      $scope.drawBackground(5);
    };

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    var RouteList = new RouteService(0);
    $scope.slantRoutes = RouteList.getSlantRoutes();
    $scope.deepRoutes = RouteList.getDeepRoutes();
    $scope.cornerRoutes = RouteList.getCornerRoutes();

    var Roster = new RosterService('matt');
    $scope.wideReceivers = Roster.getWR();
    $scope.runningBacks = Roster.getRB();
    $scope.tightEnds = Roster.getTE();

    $scope.player = (new PlayerService(2, '1', '2').getData());

    $scope.selectPlayer = function(id) {
      $scope.player = (new PlayerService(id, '1', '2').getData());
    };

    /*
    $scope.selectRoute = function(id) {
      $scope.route = (new RouteService(id).getData());
    }
    */

    $scope.route = RouteList.getCornerRoutes()[0];

    $scope.selectRoute = function(id) {
      $scope.route = RouteList.getAllRoutes()[id];
      var perfectRoutePoints = [];
      var perfectRoute = new RouteData();
      perfectRoutePoints.push(testSlantRoute[0]);
      /* do database call and add all datapoints using the following line:
      *     perfectRoutePoints.push({x: xpoint, y: ypoint});*/
      perfectRoute.points = perfectRoute.points.concat(perfectRoutePoints);
      routePoints(perfectRoute);
    };

    $scope.getRouteNames = function (theRoutes) {
      var routeNames = [];
      for (var i=0; i <theRoutes.length; i++ ) {
        routeNames.push(theRoutes[i].name);
      }
      return routeNames;
    };

    $scope.getPlayerNames = function (thePlayers) {
      var playerNames = [];
      for (var i=0; i <thePlayers.length; i++ ) {
        playerNames.push(thePlayers[i].name);
      }
      return playerNames;
    };

    $scope.routesForDropdown = $scope.getRouteNames(RouteList.getAllRoutes());
    $scope.currentRoute = $scope.routesForDropdown[0];

    $scope.playersForDropdown = $scope.getPlayerNames(Roster.getPlayers());
    $scope.currentPlayer = $scope.playersForDropdown[0];

    $scope.ddRoutes = [
      {text: 'Slant Route 1'},
      {text: 'Slant Route 2'},
      {text: 'Slant Route 3'},
      {text: 'Deep Route 1'},
      {text: 'Deep Route 2'},
      {text: 'Deep Route 3'},
      {text: 'Corner Route 1'},
      {text: 'Corner Route 2'},
      {text: 'Corner Route 3'}
    ];

    $scope.ddSelectedRoute = {};

    $scope.ddPlayers = [
      {text: 'Mike'},
      {text: 'Ian'},
      {text: 'Austin'},
      {text: 'Greg'},
      {text: 'Matt'},
      {text: 'Jerry'}
    ];

    $scope.ddSelectedPlayer = {};

    $scope.ddMetrics = [
      {text: 'Position'},
      {text: 'Velocity'},
      {text: 'Acceleration'}
    ];

    $scope.ddSelectedMetric = {};

    $scope.$watchGroup(['ddSelectedRoute', 'ddSelectedPlayer', 'ddSelectedMetric'],
      function (newValues, oldValues, $scope) {
        var change = false;
        var i;
        for (i = 0; i < newValues.length; i++) {
          if (newValues[i] !== oldValues[i]) {
            change = true;
          }
          if (Object.getOwnPropertyNames(newValues[0]).length === 0) {
            change = false;
            break;
          }
        }
        if (change) {
          $scope.route = RouteList.getAllRoutes()[id];
          var perfectRoutePoints = [];
          var perfectRoute = new $scope.RouteData();
          perfectRoutePoints.push(testSlantRoute[0]);
          /* do database call and add all datapoints using the following line:
           *     perfectRoutePoints.push({x: xpoint, y: ypoint});*/
          perfectRoute.points = perfectRoute.points.concat(perfectRoutePoints);
          $scope.routePoints(perfectRoute);
        }
      }
    );

//    $scope.$apply();

    $scope.RouteData = function() {
      this.points = [{x: 0, y: 0}];
      this.maxX = function () {
        var i;
        var max = 0;
        for (i = 0; i < this.points.length; i++) {
          if (max < this.points[i].x) {
            max = this.points[i].x;
          }
        }
        return max;
      };
      this.minX = function () {
        var i;
        var min = 0;
        for (i = 0; i < this.points.length; i++) {
          if (min > this.points[i].x) {
            min = this.points[i].x;
          }
        }
        return min;
      };
      this.maxY = function () {
        var i;
        var max = 0;
        for (i = 0; i < this.points.length; i++) {
          if (max < this.points[i].y) {
            max = this.points[i].y;
          }
        }
        return max;
      };
    };

    $scope.drawBackground = function (numTens) {
      var i;
      $scope.width = $scope.modelCanvas.width;
      $scope.height = $scope.modelCanvas.height;
      $scope.ratio = $scope.modelCanvas.height / (360 * numTens);
      $scope.context.clearRect(0, 0, width, height);
      $scope.context.lineWidth = .5;

      for (i = 0; i <= 360 * numTens; i += 36) {
        if ((i % 360) === 0) {
          //Draw 10 yard marks across field
          $scope.context.beginPath();
          $scope.context.moveTo(0, $scope.ratio * i);
          $scope.context.lineTo($scope.width, $scope.ratio * i);
          $scope.context.closePath();
          $scope.context.stroke();
        }
        else if ((i % 180) === 0) {
          //Draw left 5 yard mark
          $scope.context.beginPath();
          $scope.context.moveTo(0, $scope.ratio * i);
          $scope.context.lineTo($scope.width * 0.05, $scope.ratio * i);
          $scope.context.closePath();
          $scope.context.stroke();

          //Draw right 5 yard mark

          $scope.context.beginPath();
          $scope.context.moveTo($scope.width - ($scope.width * 0.05), $scope.ratio * i);
          $scope.context.lineTo($scope.width, $scope.ratio * i);
          $scope.context.closePath();
          $scope.context.stroke();
        }
        else {
          //Draw left 1 yard mark
          $scope.context.beginPath();
          $scope.context.moveTo(0, $scope.ratio * i);
          $scope.context.lineTo($scope.width * 0.025, $scope.ratio * i);
          $scope.context.closePath();
          $scope.context.stroke();

          //Draw right 1 yard mark

          $scope.context.beginPath();
          $scope.context.moveTo($scope.width - ($scope.width * 0.025), $scope.ratio * i);
          $scope.context.lineTo($scope.width, $scope.ratio * i);
          $scope.context.closePath();
          $scope.context.stroke();
        }
      }
    };

    $scope.drawArrow = function (x, y, angle) {

    };

    $scope.routePoints = function (data) {
      var numLines = (Math.floor(data.maxY() / 360)) + 1;
      $scope.drawBackground(numLines);
      var beginX = (width * 0.5) - ((data.maxX() - data.minX()) / 2);
      $scope.context.beginPath();
      $scope.context.moveTo(beginX, $scope.height);
      var i;
      for (i = 0; i < data.points.length; i++) {
        $scope.context.lineTo(beginX + data.points[i].x, $scope.height - data.points[i].y);
      }
      //context.endPath();
      $scope.drawArrow(beginX + data.points[i].x, $scope.height - data.points[i].y, Math.atan2((data.points[i].x - data.points[i - 1].x), (data.points[i].y - data.points[i - 1].y)));
      $scope.context.stroke();
    };

    $scope.init();
  });

function routeTime(data) {
  var beginYard = 800;
  context.beginPath();
  context.moveTo(width * 0.5, ratio * beginYard);
  context.lineTo(width * 0.5, ratio * (beginYard - 200));
  context.lineTo(width * 0.45, ratio * (beginYard - 250));
  //context.endPath();
  context.stroke();
}
