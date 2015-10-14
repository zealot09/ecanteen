define(function (require) {
    'use strict';

	/**
	 * Configure the API of the Angular module. As API the module uses the
	 * "restangular" module.
	 * 
	 * @param {Object} RestangularProvider From restangular
	 */
	function api(RestangularProvider) {

        // use the custom query parameters function to format the API request correctly
        RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
            if (operation == "getList") {
                // custom pagination params
                if (params._page) {
                    params._start = (params._page - 1) * params._perPage;
                    params._end = params._page * params._perPage;
                }
                delete params._page;
                delete params._perPage;
                // custom sort params
                if (params._sortField) {
                    params._sort = params._sortField;
                    delete params._sortField;
                }
                // custom filters
                if (params._filters) {
                    for (var filter in params._filters) {
                        params[filter] = params._filters[filter];
                    }
                    delete params._filters;
                }
            }
            return { params: params };
        });
		
        RestangularProvider.setBaseUrl("http://api.ecanteen.com/api");
        RestangularProvider.setDefaultHeaders({
            "Content-Type": "application/json"
        });
		
		//RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
			// ...
		//});
	};
	
	api.$inject = ['RestangularProvider'];
	
	return api;
	
});

