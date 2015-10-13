define(['jquery', 'hbs!templates/user/register', 'backbone', 'marionette', 'backbone.syphon'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        function checkEmail(eml) {
            var re = /\S+@\S+\.\S+/;
            return re.test(eml);
        }

        return Backbone.Marionette.ItemView.extend({
            template: template,
            events: {
                "submit form": "formSubmitted",
                "click .js-continue": "onReigster"
            },
            formSubmitted: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                // this.trigger("login", data);
            },
            ui: {
                errors: ".error",
                usernameError: "#usernameError",
                emailError: "#emailError",
                emailDupError: "#emailDupError",
                telephoneError: "#telephoneError",
                passwordError: "#passwordError",
                passwordConfirmError: "#passwordConfirmError",
                agreementError: "#agreementError"
            },
            onReigster: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.ui.errors.fadeOut();
                if (this.checkInfo(data)) {
                    this.trigger("register", data);
                }
            },
            checkInfo: function(info) {
                // check username
                if (info.name === "") {
                    this.showUsernameError();
                    return false;
                }
                // check email
                if (!checkEmail(info.email)) {
                    this.showEmailError();
                    return false;
                }
                // check telephone
                if (info.mobile === "") {
                    this.showTelephoneError();
                    return false;
                }
                // check password
                if (info.password === "") {
                    this.showPasswordError();
                    return false;
                }
                if (info.password !== info.confirm) {
                    this.showPasswordConfirmError();
                    return false;
                }
                // check agreement
                if (!info.agree) {
                    this.showAgreementError();
                    return false;
                }
                return true;
            },
            showUsernameError: function() {
                this.ui.usernameError.fadeIn();
            },
            showEmailError: function() {
                this.ui.emailError.fadeIn();
            },
            showPasswordError: function() {
                this.ui.passwordError.fadeIn();
            },
            showPasswordConfirmError: function() {
                this.ui.passwordConfirmError.fadeIn();
            },
            showTelephoneError: function() {
                this.ui.telephoneError.fadeIn();
            },
            showAgreementError: function() {
                this.ui.agreementError.fadeIn();
            },
            showEmailDupError: function() {
                this.ui.emailDupError.fadeIn();
            }
        });
    });