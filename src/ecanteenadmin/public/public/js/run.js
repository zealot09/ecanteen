define(function (require) {
    'use strict';

    require('ExampleModule');

    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['example']);
   });
});
