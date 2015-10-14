define(function (require) {
    'use strict';

    // custom 'send post by email' page
    var sendPostControllerTemplate = require('text!../view/page/sendPost.html');

    // custom page with menu item
    var statsPageTemplate = require('text!../view/page/stats.html');

	/**
	 * Configure the routing of the Angular module. For routing the module uses
	 * the "ui.router" module.
	 * 
	 * @param {Object} $stateProvider From module ui.router
	 */	
	function routing($stateProvider) {
        $stateProvider.state('send-post', {
            parent: 'main',
            url: '/sendPost/:id',
            params: { id: null },
            controller: 'SendPostController',
            controllerAs: 'controller',
            template: sendPostControllerTemplate
        });
		
        $stateProvider.state('stats', {
            parent: 'main',
            url: '/stats',
            template: statsPageTemplate
        });
		
	}
	routing.$inject = ['$stateProvider'];
	
	return routing;
	
});

