define(function (require) {
    'use strict';

	function MainController($scope, $rootScope, $location) {
        $rootScope.$on('$stateChangeSuccess', function () {
            $scope.displayBanner = $location.$$path === '/dashboard';
        });
	};
	
	MainController.$inject = ['$scope', '$rootScope', '$location'];
	
	return MainController;
});
