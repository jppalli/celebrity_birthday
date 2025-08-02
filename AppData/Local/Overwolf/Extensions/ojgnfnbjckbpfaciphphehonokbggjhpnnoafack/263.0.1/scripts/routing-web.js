(function (angular) {
  'use strict';

  var app = angular.module('overwolf');
  var serverBase = window.location.protocol + "//" + window.location.host + "/";

  if(localStorage.forceServerBase) {
    serverBase = localStorage.forceServerBase;
  }

  app.config(['$routeProvider', '$locationProvider', '$compileProvider', '$sceDelegateProvider',
    function ($routeProvider, $locationProvider, $compileProvider, $sceDelegateProvider) {
      $routeProvider
        .when('/app/:appid', {
          templateUrl: function(param){
            if (!window.owHasInitialTemplate) {
              window.owHasInitialTemplate = true;
            }

            return serverBase + "ContentExtract/MainContent/" + window.loadedOneAppPageCategory.toLowerCase();
          },
          controller: "PageController"
        })
        .when('/game/:gameid', {
          templateUrl: function(param){
            if (!window.owHasInitialTemplate) {
              window.owHasInitialTemplate = true;
            }

            return serverBase + "ContentExtract/MainContent/" + window.loadedOneAppPageCategory.toLowerCase();
          },
          controller: "PageController"
        })
        .when('/skin/:skinid', {
          templateUrl: function(param){
            if (!window.owHasInitialTemplate) {
              window.owHasInitialTemplate = true;
            }

            return serverBase + "ContentExtract/MainContent/" + window.loadedOneAppPageCategory.toLowerCase();
          },
          controller: "PageController"
        })
        .when(document.location.pathname, {
          templateUrl: "initialTemplate.html",
          controller: "PageController"
        })
        .when("/", {
          templateUrl: function (params) {
            if (window.owHasInitialTemplate) {
              return serverBase + 'ContentExtract/MainContent/';
            }

            window.owHasInitialTemplate = true;
            return "initialTemplate.html";
          },
          controller: "PageController"
        })
        .when('/search', {
          templateUrl: "/system/modules/com.overwolf.store/resources/partials/search.html",
          controller: "SearchController",
          controllerAs: "search"
        })
        .when('/:section/:category', {
          templateUrl: function (params) {
            if (!window.owHasInitialTemplate) {
              window.owHasInitialTemplate = true;
            }

            return serverBase + 'ContentExtract/MainContent/' + params.section + '/' + params.category;
          },
          controller: "PageController"
        }).
      when('/:section/:category/:subCategory', {
        templateUrl: function (params) {
          if (!window.owHasInitialTemplate) {
            window.owHasInitialTemplate = true;
          }

          return serverBase + 'ContentExtract/MainContent/' + params.section + '/' + params.category + '/' + params.subCategory;
        },
        controller: "PageController"
      }).
      when('/:section', {
        templateUrl: function (params) {
          if (!window.owHasInitialTemplate) {
            window.owHasInitialTemplate = true;
          }

          return serverBase + 'ContentExtract/MainContent/' + params.section;
        },
        controller: "PageController"
      })



      $locationProvider.html5Mode({enabled: true, requireBase: true, rewriteLinks: true});
      console.log("SETTING HTML5MODE TRUE", $locationProvider.html5Mode());

      $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?localhost|.*overwolf.com.*/.+$')]);

      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|overwolf-store.*):|data:image\//);
    }]
  );

})(angular);