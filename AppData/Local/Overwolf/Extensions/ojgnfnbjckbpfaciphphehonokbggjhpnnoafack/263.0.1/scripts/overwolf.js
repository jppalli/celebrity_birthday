

(function (angular) {
  'use strict';

  var serverBase = "https://storeclient.overwolf.com/";

  var app = angular.module('overwolf', ['ngAnimate', 'ngRoute', 'ngProgress', 'vcRecaptcha']);

  if (localStorage.forceServerBase) {
    serverBase = localStorage.forceServerBase;
  }

  app.constant('OPK_VERSION', '263.0.1');

  app.config(['$routeProvider', '$locationProvider', '$compileProvider', '$sceDelegateProvider', '$provide',
    function ($routeProvider, $locationProvider, $compileProvider, $sceDelegateProvider, $provide) {

      var localizationUrlPart = (StringsLoader.getCurrentLocale() === "en" ? "" : '.locales/' + StringsLoader.getCurrentLocale() + "/");

      $routeProvider
        // .when("/", {//the first two is due to some weird bug where angular adds /files/ or /files/files/ to route url. I suspect its because our protocol is overwolf-store:// and not http://
        //     templateUrl: function (params) {
        //         return serverBase + 'ContentExtract/MainContent/' + localizationUrlPart + 'apps';
        //     },
        //     controller: "PageController",
        //     bgSliders: "apps"
        // })
        // .when("/files/", {
        //     templateUrl: function (params) {
        //         return serverBase + 'ContentExtract/MainContent/'+ localizationUrlPart + 'apps';
        //     },
        //     controller: "PageController",
        //     bgSliders: "apps"
        // }).

        .when("/", {//the first two is due to some weird bug where angular adds /files/ or /files/files/ to route url. I suspect its because our protocol is overwolf-store:// and not http://
          templateUrl: function (params) {
            return serverBase + 'ContentExtract/MainContent/' + localizationUrlPart;
          },
          controller: "PageController"//,
          // bgSliders: "apps"
        })
        .when('/search', {
          templateUrl: "/partials/search.html",
          controller: "SearchController",
          controllerAs: "search"
        })
        .when('/library', {
          templateUrl: "/partials/library.html",
          controller: "LibraryController",
          contentStyle: 'wide',
          bgSliders: "library"
        })
        .when('/app/:appid', {
          templateUrl: function (params) {
            //return serverBase + 'ContentExtract/MainContent/apps/touchfox';
            return serverBase + 'ContentExtract/MainContent/' + localizationUrlPart + 'apps';
          },
          controller: "PageController"
        })
        .when('/:appid/subscriptions', {
          templateUrl: function (params) {
            //return serverBase + 'ContentExtract/MainContent/apps/touchfox';
            return serverBase + 'ContentExtract/MainContent/' + localizationUrlPart + 'apps';
          },
          controller: "PageController"
        })
        .when('/:appid/reviews', {
          templateUrl: function (params) {
            return serverBase + 'ContentExtract/MainContent/' + localizationUrlPart + 'apps';
          },
          controller: "PageController"
        })
        .when('/library/:category', {
          templateUrl: "/partials/library.html",
          controller: "LibraryController",
          contentStyle: 'wide',
          bgSliders: "library"
        }).
        when('/:section/:category', {
          templateUrl: function (params) {
            return serverBase + 'ContentExtract/MainContent/' + localizationUrlPart + params.section + '/' + params.category;
          },
          controller: "PageController"
        }).
        when('/:section/:category/:subCategory', {
          templateUrl: function (params) {
            return serverBase + 'ContentExtract/MainContent/' + localizationUrlPart + params.section + '/' + params.category + '/' + params.subCategory;
          },
          controller: "PageController"
        }).
        when('/:section', {
          templateUrl: function (params) {
            if (params.section === 'verification') {
              return serverBase + 'ContentExtract/MainContent/' + localizationUrlPart;
            }

            return serverBase + 'ContentExtract/MainContent/' + localizationUrlPart + params.section;
          },
          controller: "PageController"
        });

      //  .when(document.location.pathname,{
      //      templateUrl: "initialTemplate.html",
      //      controller: "PageController"
      //  })
      // .otherwise({
      //   templateUrl: "initialTemplate.html",
      //   controller: "PageController"
      // });

      // $locationProvider.html5Mode({enabled: true, requireBase: true});
      $locationProvider.html5Mode({ enabled: true, requireBase: true, rewriteLinks: true });

      $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?localhost|.*overwolf.com.*/.+$')]);
      // $sceDelegateProvider.resourceUrlWhitelist(['self', '*', new RegExp('^.*$')]);

      // $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|overwolf-store.*):|data:image\//);
      $compileProvider.imgSrcSanitizationWhitelist(/.*/);

      $provide.decorator("$exceptionHandler", function () {
        return function (exception) {
          if ((exception.message.indexOf('unpr?p0=translateFilterProvider') > 0) &&
            !localStorage.reloadedOnError) {
            console.error('translation filter error, reloading...');
            localStorage.reloadedOnError = true;
            window.location.reload();
            return;
          }

          console.error(exception);
        }
      });
    }]

  );

  app.run(function ($rootScope, $location, TrackingService, $templateCache) {
    $rootScope.showVerificationBanner = false;
    try {
      $rootScope.iteration = parseInt(OverwolfStore.version.split(".")[1]);
    } catch (e) {
      $rootScope.iteration = 0;
    }

    $rootScope.$on('$viewContentLoaded', function () {
      $templateCache.removeAll();
    });

    $rootScope.isInOwClient = function () {
      return navigator.userAgent.indexOf("OverwolfStore") >= 0;
    };

    setTimeout(function () {
      delete localStorage.reloadedOnError;
    }, 3000);
  });


  //localized strings are done by using stateless filter. A filter that is proccessed only once with no data binding.
  //so it is important to load all the strings before we bootstrap angular.
  StringsLoader.init().then(function () {


    const docReady = fn => {
      // see if DOM is already available
      if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
      } else {
        document.addEventListener("DOMContentLoaded", fn);
      }
    }

    docReady(() => {
      angular.bootstrap(document, ['overwolf']);
    });
  });

})(angular);


//I'm using this function to save up on some keystroke when debugging. Do no remove please. - Yoske.
function $$d(d) {
  console.log(d);
}
