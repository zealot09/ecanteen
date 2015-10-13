define(['jquery', 'hbs!templates/browse/contents/item_detail_modal', 'backbone', 'backbone.modal', 'backbone.syphon'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Modal.extend({
            template: template,
            cancelEl: ".js-done",
            submitEl: ".js-add",
            beforeSubmit: function() {
                var data = Backbone.Syphon.serialize(this);
                var count = parseInt(data.count, 10);
                if (count <= 0) {
                    $.notify("Wrong Quantity.", {
                        position: "right bottom",
                        className: 'success'
                    });
                    return;
                }
                this.trigger("cart:add", this.model, count);
                $.notify("Item added.", {
                    position: "right bottom",
                    className: 'success'
                });
            }
        });
    });