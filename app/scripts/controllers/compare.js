'use strict';

var app = angular.module('miniapp', []);

/**
 * @ngdoc function
 * @name proto.controller:CompareCtrl
 * @description
 * # CompareCtrl
 * Compare Controller of the proto App
 */
angular.module('proto')
    .controller('CompareCtrl', function($scope, $http, RosterService, PlayerService) {

        $scope.maximizedHeader = 1;
        $scope.height = window.innerHeight - 145;

        $scope.playerCards = [];

        $scope.colors = [
            {
                color: "steelblue",
                series: {y: 'p1', color: 'steelblue', thickness: '2px', label: 'Accuracy'},
                available: 1,
                guid: 0
            },
            {
                color: "red",
                series: {y: 'p2', color: 'red', thickness: '2px', label: 'Accuracy'},
                available: 1,
                guid: 1
            },
            {
                color: "purple",
                series: {y: 'p3', color: 'purple', thickness: '2px', label: 'Accuracy'},
                available: 1,
                guid: 2
            },
            {
                color: "yellow",
                series: {y: 'p4', color: 'yellow', thickness: '2px', label: 'Accuracy'},
                available: 1,
                guid: 3
            },
            {
                color: "black",
                series: {y: 'p5', color: 'black', thickness: '2px', label: 'Accuracy'},
                available: 1,
                guid: 4
            }
        ];


        /*Typeahead*/
        //var Roster = new RosterService("ian");
        //$scope.players = Roster.getPlayers();

        /*Graph*/
        var values = [];
        var t = new Date();
        t.setMonth(t.getMonth() - 1);
        t = t.getTime();

        for(var i = 0; i < 30; i++) {
            values.push(
              {
                x: new Date(t + i*3600*1000*24),
                p1: Math.ceil(Math.random() * (100 - 70) + 70),
                p2: Math.ceil(Math.random() * (100 - 70) + 70),
                p3: Math.ceil(Math.random() * (100 - 70) + 70),
                p4: Math.ceil(Math.random() * (100 - 70) + 70),
                p5: Math.ceil(Math.random() * (100 - 70) + 70)
              });
        }
        $scope.data = values;

        $scope.options = {
            axes: {
                x: {key: 'x', type: 'date', ticks: 2}
            },
            series: [
                //dynamic
            ],
            lineMode: 'linear',
            tension: 0.7,
            tooltip: {
                mode: 'scrubber',
                formatter: function(x, y, series) {
                    return moment(x).fromNow() + ' : ' + y;
                }
            },
            drawLegend: false,
            drawDots: true,
            columnsHGap: 5
        };

        /*Initial Card(s)*/
        var player;
        var series;

        player = (new PlayerService(2, "1", "2").getData());
        series = $scope.colors[0];
        $scope.colors[0].available = 0;

        
        $scope.playerCards.push({
            playerInfo: player,
            seriesInfo: series
        });

        $scope.options.series.push($scope.playerCards[0].seriesInfo.series);


        /*Cards*/

        $scope.addPlayerCard = function (playerIn) {
            console.log("typeahead player chosen");
            console.log(playerIn);
            var assignedColor;
            var assigned = 0;

            //temp
            var player;
            player = (new PlayerService(3, "1", "2").getData());
            console.log(player);

            //check if already in playerCards
            //I think this is handled by pushing the card on the deck
            //in other words, it does not push existing cards?

            //assign a color
            for (var i = 0; i < $scope.colors.length; i++) {
                console.log(i);
                console.log($scope.colors[i]);
                if ($scope.colors[i].available == 1 && assigned == 0) {
                    console.log($scope.colors[i]);
                    assignedColor = $scope.colors[i];
                    $scope.colors[i].available = 0;
                    assigned = 1;
                };
            };

            //make the card
            var card;
            card = {
                playerInfo: player,
                seriesInfo: assignedColor
            };
            $scope.playerCards.push(card);

            //add series to chart
            var cardNumber;
            cardNumber = $scope.playerCards.length - 1;
            //cardNumber = 0;
            $scope.options.series.push($scope.playerCards[cardNumber].seriesInfo.series);

            /*NEED TO CLEAR TYPEAHEAD*/
            //$scope = '';
        };

        $scope.removePlayerCard = function (index) {
            //remove series from chart and make it available
            var guid;
            guid = $scope.playerCards[index].seriesInfo.guid;
            $scope.colors[guid].available = 1;
            $scope.options.series.splice(index, 1);

            //remove card from playerCards
            $scope.playerCards.splice(index, 1);
        };

        $scope.removeCard = function (index) {
            //make the color available and remove the card from the deck
            colors[index].available = 1;
            $scope.playercards.splice(index, 1);
        };

        $scope.addCard = function () {
            var assigned = 0;
            var assignedColor;


            console.log($scope.card.name);
            console.log($scope.playercards);

            //if player card is already added, then disregard
            //should handle with error prompt or whatever later
            if ($scope.playercards.length) {
                for(var i = 0; i < $scope.playercards.length; i++) {
                    console.log(i);
                    console.log($scope.playercards[i].name);
                    if ($scope.card.name == $scope.playercards[i].name) {
                        console.log("match");
                        $scope.card = '';
                        return;
                    };
                }
            };

            //for the possible graph colors available, assign an available one
            //to the desired card
            for(var i = 0; i < colors.length; i++) {
                if ((colors[i].available == 1) && (assigned == 0)) {
                    assignedColor = colors[i].name;
                    colors[i].available = 0;
                    assigned = 1;
                };
            }

            //if couldn't be assigned, clear input and disregard
            //should handle with an error prompt or whatever
            if (!assigned) {
                $scope.card = '';
                return;
            };

            //add the data to the graph
            var stat;
            stat = $scope.player.accuracy;
            var newValues = [];
            for(var i = 0; i < 30; i++) {
                newValues.push({x: new Date(t + i*3600*1000*24), Accuracy: Math.ceil(Math.random() * (100 - 70) + 70)});
            }
            $scope.data = newValues;

            //since we can set the color and the selection isn't a repeat
            //then we can add the card to the existing deck and clear the typeahead
            $scope.playercards.push(
                {
                    name: $scope.card.name,
                    color: assignedColor
                });
            $scope.card = '';
        };

        $scope.addSeries = function () {
            console.log("addSeries call");
            var newValues = $scope.data;
            for(var i = 0; i < 30; i++) {
                newValues.push(
                {
                    x: new Date(t + i*3600*1000*24),
                    p1: Math.ceil(Math.random() * (100 - 70) + 70),
                    p2: Math.ceil(Math.random() * (100 - 70) + 70),
                    p3: Math.ceil(Math.random() * (100 - 70) + 70),
                    p4: Math.ceil(Math.random() * (100 - 70) + 70),
                    p5: Math.ceil(Math.random() * (100 - 70) + 70)
                });
            }
            $scope.data = newValues;
            $scope.options.series.push({y: 'p2', color: 'red', thickness: '2px', label: 'Accuracy'});
        }

});

