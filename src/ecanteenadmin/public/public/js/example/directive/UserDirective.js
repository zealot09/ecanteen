define(function (require) {
    'use strict';

    var servicePointTemplate = require('text!../view/page/servicePoint.html');
    function ServicePoint($location) {
        return {
            restrict: 'E',
            template: servicePointTemplate,
            link: function (scope, element, attr) {

            }
        };
    }

	  ServicePoint.$inject = ['$location'];
    return ServicePoint;
});
