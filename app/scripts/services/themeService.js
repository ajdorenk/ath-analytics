'use strict';

angular.module('proto').service('ThemeService', function() {

  var ThemeService = function () {
    var colors = {
      blueGrey: 'blueGreyTheme',
      blue: 'blueTheme',
      brown: 'brownTheme',
      cyan: 'cyanTheme',
      deepOrange: 'deepOrangeTheme',
      deepPurple: 'deepPurpleTheme',
      green: 'greenTheme',
      grey: 'greyTheme',
      indigo: 'indigoTheme',
      lightGreen: 'lightGreenTheme',
      lime: 'limeTheme',
      orange: 'orangeTheme',
      pink: 'pinkTheme',
      purple: 'purpleTheme',
      red: 'redTheme',
      teal: 'tealTheme',
      yellow: 'yellowTheme'
    };

    var main;
    var secondary;

    this.init = function() {
      main = colors.red;
      secondary = colors.yellow;
    };

    this.setMainTheme = function(newTheme) {
      main = newTheme;
    };

    this.getMainTheme = function() {
      return main;
    };

    this.setSecondaryTheme = function(newTheme) {
      secondary = newTheme;
    };

    this.getSecondaryTheme = function() {
      return secondary;
    };

    this.getColors = function() {
      return colors;
    };

    this.init();
  };
  return (ThemeService);
});
