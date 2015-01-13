'use strict';
/**
 * Created by Matthew on 11/28/2014.
 */

angular.module('proto').service('RouteService', function() {

  var RouteService = function(routeId) {
    var routeNumber;
    var slantRoutes;
    var deepRoutes;
    var cornerRoutes;
    var allRoutes = [];
    var user;
    var routeData;
    var i;

    this.init = function() {
      routeNumber = routeId;
      slantRoutes = [
        {
          id: 1,
          name: 'Slant Route 1'
        },
        {
          id: 2,
          name: 'Slant Route 2'
        },
        {
          id: 3,
          name: 'Slant Route 3'
        }
      ];
      deepRoutes = [
        {
          id: 4,
          name: 'Deep Route 1'
        },
        {
          id: 5,
          name: 'Deep Route 2'
        },
        {
          id: 6,
          name: 'Deep Route 3'
        }
      ];
      cornerRoutes = [
        {
          id: 7,
          name: 'Corner Route 1'
        },
        {
          id: 8,
          name: 'Corner Route 2'
        },
        {
          id: 9,
          name: 'Corner Route 3'
        }
      ];

      for(i = 0; i < slantRoutes.length; i++) {
        allRoutes.push(slantRoutes[i]);
      }
      for(i = 0; i < deepRoutes.length; i++) {
        allRoutes.push(deepRoutes[i]);
      }
      for(i = 0; i < cornerRoutes.length; i++) {
        allRoutes.push(cornerRoutes[i]);
      }
    };

    this.getSlantRoutes = function() {
      return slantRoutes;
    };

    this.getDeepRoutes = function() {
      return deepRoutes;
    };

    this.getCornerRoutes = function() {
      return cornerRoutes;
    };

    this.getAllRoutes = function() {
      return allRoutes;
    };

    this.getUser = function() {
      return user;
    };

    this.getData = function() {
      return allRoutes[routeId];
    };

    this.init();
  };

  return (RouteService);
});
