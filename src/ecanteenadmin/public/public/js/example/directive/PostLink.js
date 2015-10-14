define(function (require) {
    'use strict';

    function PostLink($location) {
        return {
            restrict: 'E',
            scope: { entry: '&' },
            template: '<p class="form-control-static"><a ng-click="displayPost()">View&nbsp;post</a></p>',
            link: function (scope) {
                scope.displayPost = function () {
                    $location.path('/show/posts/' + scope.entry().values.post_id);
                };
            }
        };
    }
	
	PostLink.$inject = ['$location'];

    return PostLink;
});
