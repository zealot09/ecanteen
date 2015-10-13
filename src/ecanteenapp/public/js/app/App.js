define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars', 'backbone.modal'],
    function($, Backbone, Marionette, _, Handlebars) {
        var App = new Backbone.Marionette.Application();
        function isMobile() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
        }

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion: "#header-wrapper",
            mainRegion: ".home-wrapper",
            footerRegion: ".footer-wrapper",
            modalRegion: {
                selector: '.modals-container',
                regionType: Backbone.Marionette.Modals
            }
        });

        App.navigate = function(route, options) {
            options = options || {};
            Backbone.history.navigate(route, options);
        };

        App.addInitializer(function() {
            Backbone.history.start();
        });

        App.mobile = isMobile();

        return App;
    });