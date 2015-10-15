// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
require(["App", "jquery", "routers/AppRouter", "controllers/MobileController", "backbone", "marionette", "backbone.validateAll"],
    function (App, $, AppRouter, AppController) {
        // Prevents all anchor click handling
        // $.mobile.linkBindingEnabled = false;
        App.appRouter = new AppRouter({
            controller:new AppController()
        });
        App.start();
    });
