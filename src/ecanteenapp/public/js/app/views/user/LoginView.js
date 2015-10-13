define(['jquery', 'hbs!templates/user/login', 'backbone', 'marionette', 'backbone.syphon',"facebook"],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
            events: {
                "submit form": "formSubmitted",
                "click .resendmail": "resendMail",
                "click #FBLogin": "onFbLogin"
            },
            formSubmitted: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("login", data);
            },
            showNoAccountWarning: function() {
                this.$("#noaccountwarning").show();
            },
            showNoValidWarning: function() {
                this.$("#novalidwarning").show();
            },
            resendMail: function() {
                var email = this.$("#email").val();
                console.log(email);
                var d=Backbone.Syphon.serialize(this);
                this.trigger("resendmail", d);
            },
            showResendSuccess: function() {
                this.$("#novalidwarning").fadeOut();
                this.$.notify("E-Mail Resent Successfully", {
                    position: "right bottom",
                    className: 'info'
                });
            },
            onFbLogin: function(e) {
                e.preventDefault();
                try {
                    FB.login(function(response) {
                        // handle the response
                        console.log(response);
                    }, {
                        scope: 'email,user_likes'
                    });
                } catch (e) {
                    // Do nothing
                }
            }
        });
    });