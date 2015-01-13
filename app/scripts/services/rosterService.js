'use strict';

angular.module('proto').service('RosterService', function() {

  var RosterService = function(username) {
    var user;
    var players = {};

    // TODO Restructure data so that players aren't listed by position to allow typeahead to work and is more realistic to
    // the data we will get from the database
    this.init = function() {
      user = username;
      players = {
        wideReceivers: {
          position: 'Wide Receivers',
          show: 0,
          players: [{
          id: 1,
          name: 'Michael Smith',
          number: 1,
          position: 'WR',
          route: 'X',
          ht: "6' 4\"",
          wt: 253,
          birth: 'May 11, 1993',
          year: 'Sophomore'
        }, {
          name: 'Jim Storm',
          id: 2,
          number: 2,
          position: 'WR',
          route: 'X',
          ht: "6' 6\"",
          wt: 243,
          birth: 'May 11, 1992',
          year: 'Junior'
        }, {
          name: 'Adam Storm',
          id: 7,
          number: 7,
          position: 'WR',
          route: 'Y',
          ht: "6' 4\"",
          wt: 259,
          birth: 'May 11, 1993',
          year: 'Sophomore'
        }]},
        runningBacks: {
          position: 'Running Backs',
          show: 0,
          players: [{
            name: 'Harry Dresden',
            id: 5,
            number: 5,
            position: 'RB',
            route: '',
            ht: "6' 4\"",
            wt: 253,
            birth: 'May 11, 1993',
            year: 'Sophomore'
        }]},
        tightEnds: {
          position: 'Tight Ends',
          show: 0,
          players: [{
              name: 'John Snow',
              id: 3,
              number: 3,
              position: 'TE',
              ht: "6' 4\"",
              wt: 253,
              birth: 'May 11, 1993',
              year: 'Freshman'
        }]}
      };
    };

    this.getWR = function() {
      return players.wideReceivers;
    };

    this.getRB = function() {
      return players.runningBacks;
    };

    this.getTE = function() {
      return players.tightEnds;
    };

    this.getPlayers = function() {
      return players;
    };

    this.getUser = function() {
      return user;
    };

    this.init();
  };

  return (RosterService);
});
