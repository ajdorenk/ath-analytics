'use strict';

angular.module('proto').factory('PlayerService', function() {
  var PlayerService = function(playerID, startDate, endDate) {
    var playerData;
    var players;

    this.init = function() {
      // TODO This is temp random data section
      var accuracy = [];
      var vert = [];
      var routes = [];
      var maxvelspd = [];
      var maxvelstd = [];
      var snapreac = [];
      var i;
      var t = new Date();
      t.setMonth(t.getMonth() - 1);
      t = t.getTime();

      for(i = 0; i < 30; i++) {
        var d = new Date(t + i*3600*1000*24);
        accuracy.push([d, Math.ceil(Math.random() * (100 - 70) + 70)]);
        vert.push([d, Math.round((Math.random() * (30 - 15) + 15) * 100) / 100]);
        routes.push([d, Math.ceil(Math.random() * (30 - 15) + 15)]);
        maxvelspd.push([d, Math.round((Math.random() * (25 - 15) + 15) * 100) / 100]);
        maxvelstd.push([d, Math.round((Math.random() * (10 - 1) + 1) * 100) / 100]);
        snapreac.push([d, Math.round((Math.random() * (4 - 0.5) + 0.5) * 100) / 100]);
      }

      players =  [
        {
          id: 1,
          name: 'Michael Smith',
          number: 1,
          position: 'WR',
          route: 'X',
          ht: "6' 4\"",
          wt: 253,
          birth: 'May 11, 1993',
          year: 'Sophomore'
        },
        {
          name: 'Jim Storm',
          id: 2,
          number: 2,
          position: 'WR',
          route: 'X',
          ht: "6' 6\"",
          wt: 243,
          birth: 'May 11, 1992',
          year: 'Junior'
        },
        {
          name: 'Adam Storm',
          id: 7,
          number: 7,
          position: 'WR',
          route: 'Y',
          ht: "6' 4\"",
          wt: 259,
          birth: 'May 11, 1993',
          year: 'Sophomore'
        },
        {
          name: 'Harry Dresden',
          id: 5,
          number: 5,
          position: 'RB',
          route: '',
          ht: "6' 4\"",
          wt: 253,
          birth: 'May 11, 1993',
          year: 'Sophomore'
        },
        {
          name: 'John Snow',
          id: 3,
          number: 3,
          position: 'TE',
          ht: "6' 4\"",
          wt: 253,
          birth: 'May 11, 1993',
          year: 'Freshman'
        }
      ];

      for(i = 0; i < players.length; i++) {
        if(playerID === players[i].id) {
          break;
        }
      }

      if(i === players.length) {
        i = 0;
      }

      //TODO: CHANGE ALL VARS TO GET DATA FROM player[i].xxx
      playerData =
      {
        id: playerID,
        name: players[i].name,
        number: 1,
        position: 'WR',
        route: 'X',
        ht: "6' 4\"",
        wt: 253,
        birth: 'May 11, 1993',
        year: 'Sophomore',
        stats: {
          accuracy:  {name: 'Accuracy', varName: 'accuracy', values: accuracy, rangeAvg: 76, seasonAvg: 67, measure: '%'},
          vertical:  {name: 'Vertical Leap', varName: 'vertical', values: vert, rangeAvg: 22.3, seasonAvg: 21.9, measure: 'inch'},
          routes:    {name: 'Routes Ran', varName: 'routes', values: routes, rangeAvg: 25, seasonAvg: 18, measure: ''},
          maxvelspd: {name: 'Maxmimum Velocity', varName: 'maxvelspd', values: maxvelspd, rangeAvg: 22.4, seasonAvg: 21.4, measure: 'mph'},
          maxvelstd: {name: 'Maxmimum Velocity Sustained', varName: 'maxvelstd', values: maxvelstd, rangeAvg: 2.8, seasonAvg: 3.7, measure: 'sec'},
          snapreac:  {name: 'Snap Reaction', varName: 'snapreac', values: snapreac, rangeAvg: 1.2, seasonAvg: 2.2, measure: 'sec'}
        },
        show: false
      };
    };

    this.getData = function() {
      return playerData;
    };

    this.init();
  };
  return (PlayerService);
});
