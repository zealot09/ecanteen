require.config({
    paths: {
        "jQuery": "public/js/bower_components/jquery/dist/jquery.min",
        "bootstrap": "public/js/bower_components/bootstrap/dist/js/bootstrap.min",
        "angular": "public/js/bower_components/angular/angular.min",
        "ngAdmin": "ng-admin.min",
    },
    shim: {
        "bootstrap": {
            deps: ["jQuery"]
        }
    }
});

require(["jQuery", "app"], function ($, app) {
  'use strict';
   require('ExampleModule');

   require(['domReady!'], function (document) {
    angular.bootstrap(document, ['myApp']);
   });
   app.init();
});
