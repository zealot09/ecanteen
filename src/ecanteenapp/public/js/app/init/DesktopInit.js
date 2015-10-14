// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
require(["App", "routers/AppRouter", "controllers/DesktopController", "facebook", "jquery", "backbone", "marionette", "backbone.validateAll"],
    function(App, AppRouter, AppController) {
        App.appRouter = new AppRouter({
            controller: AppController
        });
        // Start Marionette Application in desktop mode (default)
        App.start();

    });
