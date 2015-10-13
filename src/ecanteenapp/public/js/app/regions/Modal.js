define(["marionette"], function(Marionette) {
    Marionette.Region.Modal = Marionette.Region.extend({
        onShow: function(view) {
            this.listenTo(view, "dialog:close", this.closeDialog);
            view.on("close", this.hideModal, this);
            this.$el.modal("show");
        },
        hideModal: function() {
            this.stopListening();
            this.close();
            this.$el.modal("hide");
        },
        getEl: function(selector) {
            var $el = $(selector);
            $el.on("hidden", this.close);
            return $el;
        }
    });

    return Marionette.Region.Modal;
});