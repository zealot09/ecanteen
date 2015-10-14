define(["jquery", "backbone"],
  function($, Backbone, Collection) {
    var CONSTANT = {};
    // Creates a new Backbone Model class object
    var SoldTime = Backbone.Model.extend({});
    var SoldTimes = new Backbone.Collection([{
      id: 1,
      name: "上午"
    }, {
      id: 2,
      name: "中午"
    }, {
      id: 3,
      name: "下午"
    }], {
      model: SoldTime
    });
    CONSTANT.SoldTime = SoldTime;
    CONSTANT.SoldTimes = SoldTimes;


    return CONSTANT;
  }
);
