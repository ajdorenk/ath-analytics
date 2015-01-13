'use strict';

/**
 * @ngdoc overview
 * @name proto
 * @description
 * # proto
 *
 * Main module of the application.
 */
angular
  .module('proto', [
    'ngAnimate',
    'ngMaterial',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'n3-line-chart',
    'ui.router',
    'ngQuickDate',
    'ngDropdowns',
    'angucomplete-alt',
    'offClick'
  ])
  .config(function($stateProvider, $urlRouterProvider, USER_ROLES, ngQuickDateDefaultsProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        requiresAuthentication: 'false'
      })
      .state('summary', {
        url: '/summary',
        templateUrl: 'views/summary.html',
        controller: 'SummaryCtrl',
        requiresAuthentication: 'true',
        authorizedRoles: [USER_ROLES.admin, USER_ROLES.coach, USER_ROLES.player]
      })
      .state('compare', {
        url: '/compare',
        templateUrl: 'views/compare.html',
        controller: 'CompareCtrl',
        requiresAuthentication: 'true',
        authorizedRoles: [USER_ROLES.admin, USER_ROLES.coach]
      })
      .state('model', {
        url: '/model',
        templateUrl: 'views/model.html',
        controller: 'ModelCtrl',
        requiresAuthentication: 'true',
        authorizedRoles: [USER_ROLES.admin, USER_ROLES.coach, USER_ROLES.player]
      });

    // Configure with icons from font-awesome
    return ngQuickDateDefaultsProvider.set({
      closeButtonHtml: "<i class='fa fa-times'></i>",
      buttonIconHtml: "<i class='fa fa-calendar'></i>",
      nextLinkHtml: "<i class='fa fa-chevron-right'></i>",
      prevLinkHtml: "<i class='fa fa-chevron-left'></i>"
    });
  })
  .run(function ($rootScope, AUTH_EVENTS, AuthService, $mdDialog) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      var showAlert = function(message, content, redirectToLogin) {
        var alert = $mdDialog.alert()
          .title(message)
          .content(content)
          .ok('Got It!');
        $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
            if(redirectToLogin) {
              window.location = '/#/login';
            }
          });
      };

      if (next.requiresAuthentication === 'true') {
        //alert("Authentication required");
        var authorizedRoles = next.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (AuthService.isAuthenticated()) {
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            showAlert('You are NOT authorized to view this page', 'Please log in as an authorized user', false);
          } else {
            // user is not logged in
            //$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            showAlert('You must be logged in to view this page', 'Please log in', true);
          }
        }
      } else {
        //alert("Authentication NOT required");
      }
    });
  });
