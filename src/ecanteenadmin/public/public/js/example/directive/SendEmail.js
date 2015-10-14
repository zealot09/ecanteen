define(function (require) {
    'use strict';

    function SendEmail($location) {
        return {
            restrict: 'E',
            scope: { post: '&' },
            template: '<a class="btn btn-default" ng-click="send()">Send post by email</a>',
            link: function (scope) {
                scope.send = function () {
                    $location.path('/sendPost/' + scope.post().values.id);
                };
            }
        };
    }
	
	SendEmail.$inject = ['$location'];

    return SendEmail;
});
