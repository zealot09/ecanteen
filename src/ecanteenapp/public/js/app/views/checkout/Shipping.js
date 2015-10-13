define(['jquery', 'hbs!templates/checkout/shipping_address', 'hbs!templates/checkout/stop_info', 'hbs!templates/checkout/date_info', 'backbone', 'marionette', 'views/checkout/CheckoutPanel', 'backbone.syphon'],
    function($, template, template_stop, template_date, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CheckoutPanel.extend({
            template: template,
            ui: {
                stop_selector: "#stop_selector",
                stop_info: ".stop-info",
                date_info: ".date-info",
                default_address: "#address",
                default_mobile: "#mobile"
            },
            events: {
                "change #stop_selector": "onStopChange",
                "click .js-choose": "onChoose",
                "click .js-left": "onClickLeft",
                "click .js-right": "onClickRight",
                "click .checkout-heading a": "onClickModify",
                "click .js-continue": "onContinueClick",
                "click .js-offset": "onChooseOffset"
            },
            onStopChange: function(e) {
                this.onClickLeft();
                var stop_id = this.ui.stop_selector.val();
                this.trigger("change:stop", stop_id);
            },
            changeStopInfo: function(obj, date) {
                this.ui.stop_info.html(template_stop(obj));
                this.ui.date_info.html(template_date(date));
            },
            setDefaultAddress: function(address) {
                if (this.ui.default_address.val() === '') {
                    this.ui.default_address.val(address);
                }
            },
            setDefaultMobile: function(mobile) {
                if (this.ui.default_mobile.val() === '') {
                    this.ui.default_mobile.val(mobile);
                }
            },
            onChoose: function(e) {
                this.onChooseHelper(e, ".js-choose");
            },
            onChooseOffset: function(e) {
                this.onChooseHelper(e, ".js-offset");
            },
            onChooseHelper: function(e, selector) {
                e.preventDefault();
                var $target = $(e.currentTarget);
                this.$(selector).removeClass("chosen");
                this.$(selector).addClass("dark-bt");
                $target.addClass("chosen");
                $target.removeClass("dark-bt");
            },
            onClickLeft: function(e) {
                this.$(".js-left").removeClass("inactive");
                this.$(".js-right").addClass("inactive");
                if (this.$("#mobile").val() === '') {
                    this.trigger("setdefaultMobile");
                }
                this.trigger("changeshipping", false);
            },
            onClickRight: function(e) {
                this.$(".js-right").removeClass("inactive");
                this.$(".js-left").addClass("inactive");
                if (this.$("#address").val() === '') {
                    this.trigger("setdefaultaddress");
                }
                if (this.$("#mobile").val() === '') {
                    this.trigger("setdefaultMobile");
                }
                this.trigger("changeshipping", true);
            },
            onContinueClick: function(e) {
                e.preventDefault();
                this.$(".warning").fadeOut();
                if (this.$("#mobile").val() === '') {
                    this.trigger("setdefaultMobile");
                }
                this.$(".checkout-heading a").fadeIn();
                var data = this.extractData();
                this.trigger("continue", data);
            },
            extractData: function() {
                var stop = this.ui.stop_selector.val();
                var $chosenStandard = $(".js-choose.chosen");
                var offset = $chosenStandard.attr("offset");
                var ride = $chosenStandard.attr("ride");
                var poffset = $(".js-offset.chosen").attr("offset");
                var data = Backbone.Syphon.serialize(this);
                var preDelivery = $("#preDeliveryTerms").prop("checked");
                var stdDelivery = $("#stdDeliveryTerms").prop("checked");
                var saveDefaultAddr = $("#setdefaultaddr").prop("checked");
                var mobile = $("#mobile").val();
                data.stop = stop;
                data.offset = offset;
                data.ride = ride;
                data.poffset = poffset;
                data.preDelivery = preDelivery;
                data.stdDelivery = stdDelivery;
                data.mobile = mobile;
                data.saveDefaultAddr = saveDefaultAddr;
                return data;
            },
            showWarning: function() {
                this.$("#warning").fadeIn();
            },
            showDeliveryWarning: function() {
                this.$("#deliverywarning").fadeIn();
            },
            showMobileWarning: function() {
                this.$("#mobilewarning").fadeIn();
            },
            hideToday: function() {
                this.$(".js-today").hide();
            },
            hideTomorrow: function() {
                this.$(".js-tomorrow").hide();
            },
            hideTheDayAfterTomorrow: function() {
                this.$(".js-thedayaftertomorrow").hide();
            },
            showEmptyMessage: function() {
                this.$(".empty").fadeIn();
            }
        });
    });