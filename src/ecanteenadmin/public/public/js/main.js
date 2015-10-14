require.config({
    baseUrl: 'public/js/',
    // Alias libraries paths
    paths: {
		// RequireJS components
		'domReady': 'bower_components/requirejs-domready/domReady',
		'text': 'bower_components/requirejs-text/text',
    'jquery': 'bower_components/jquery/dist/jquery.min',
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
		// AngularJS components
		'ng-admin': 'bower_components/ng-admin/build/ng-admin.min',
		'ExampleModule': 'example/ExampleModule'
    },

    // Shim of the libraries
	shim: {
      'ExampleModule': {
			  deps: ['ng-admin']
		  },
      'bootstrap': {
        deps: ['jquery']
      }
    },

   // kick start application
   deps: ['run']

});
