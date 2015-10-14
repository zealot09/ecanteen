define(['App', 'backbone', 'marionette', 'views/misc/FaqView', 'views/misc/TermView', 'views/misc/PrivacyView', 'views/misc/ContactView', 'views/misc/AboutView', 'views/misc/PricingView'],
    function(App, Backbone, Marionette, FAQ, Term, Privacy, Contact, About, Pricing) {
        var control = Backbone.Marionette.Controller.extend({
            showFaq: function() {
                var view = new FAQ();
                App.mainRegion.show(view);
            },
            showTerm: function() {
                var view = new Term();
                App.mainRegion.show(view);
            },
            showPrivacy: function() {
                var view = new Privacy();
                App.mainRegion.show(view);
            },
            showContact: function() {
                var view = new Contact();
                App.mainRegion.show(view);
            },
            showAbout: function() {
                var view = new About();
                App.mainRegion.show(view);
            },
            showPricing: function() {
                var view = new Pricing();
                App.mainRegion.show(view);
            }
        });
        return new control();
    });
