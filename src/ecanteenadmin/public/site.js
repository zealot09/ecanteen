require.config({
    paths: {
        "jQuery": "libs/jquery/dist/jquery.min",
        "json": "libs/json3/lib/json3.min",
        "bootstrap": "libs/bootstrap/dist/js/bootstrap.min",
        "angular": "libs/angular/angular.min",
        "angularRoute": 'libs/angular-ui-router/release/angular-ui-router.min',
        "ngAdmin": "ng-admin.min",
    },
    shim: {
        "bootstrap": {
            deps: ["jQuery"]
        }
    }
});

require(["jQuery", "app"], function ($, app) {
   app.init();
});
