define(["ngAdmin", "jQuery", "bootstrap"], function() {
    var app = angular.module('myApp')

    /**directive**/
    app.directive('servicePoint', ['$location', function ($location) {
        return {
            restrict: 'E',
            template: '<a class="btn btn-primary" data-toggle="modal" data-target=".bs-service-point-modal">添加服务店</a>',
            replace: true,
            link: function ($scope, $element, $attr) {
                $($element).click(function() {
                    $('#servicePointDialog').modal('show');
                });
            }
        }
    }]);

    /**service point select dialog**/
    app.directive('servicePointDialog', ['$location', function ($location) {
        return {
            restrict: 'E',
            template: '<div id="servicePointDialog" style="display: none;">'+
            '<form action=""><div class="form-group">' +
    '<label for="exampleInputEmail1">服务店查询</label>' +
    '<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"></div></form></div>',
            replace: true,
            scope: {isShow: false},
            link: function ($scope, $element, $attr) {

            }
        }
    }]);
})
