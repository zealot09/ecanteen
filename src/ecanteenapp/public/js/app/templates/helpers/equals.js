define(['handlebars'], function(Handlebars) {

    function equals(v1, v2, options) {

        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }

    Handlebars.registerHelper('equals', equals);
    return equals;
});