define(["ngAdmin", "jQuery"], function() {
    "use strict";

    var app = angular.module('myApp');

    app.config(["$provide", "NgAdminConfigurationProvider", function ($provide, NgAdminConfigurationProvider) {
        $provide.factory("UserAdmin", function () {
            var nga = NgAdminConfigurationProvider;
            var user = nga.entity('Users');

            user.listView()
              .title("用户管理")
              .description('所有用户')
              .fields([
                  nga.field('id').label('id'),
                  nga.field('userName', 'string'),
                  nga.field('nickName', 'string'),
                  nga.field('token', 'string')
              ])
              .listActions(['show', 'delete', 'edit'])
              .actions(['batch', 'export', '<ma-create-button entity="::entity" label="创建用户"></ma-create-button>']);

            user.creationView().fields([
                nga.field('userName')
                .attributes({ placeholder: "请输入用户名" })
                .validation({ required: true, minlength: 3, maxlength: 100 }),
                nga.field('nickName', 'string'),
                nga.field('password', 'string'),
                nga.field('email')
                .attributes({ type: "email" })
                .validation({ required: true }),
                nga.field('token')
                .validation({ required: true }),
                nga.field(null, 'template').label('服务点')
                .template('<service-point></service-point>'),
                nga.field(null, 'template').label('')
                .template('<service-point-dialog></service-point-dialog>')
            ]);
            // .fields([
            //   nga.field(null, 'template').label('配送时间')
            //       .template('<deliver-info></deliver-info>')
            // ]);

            /**directive**/
            // app.directive('serviceInfo', ['$location', function($location) {
            //   return {
            //     restrict: 'E',
            //     scope: {},
            //     template: '<div class="alert alert-info" role="alert">Review the affected check the checkbox below</div>'
            //   }
            // }]);
            // /**controller**/
            // app.controller('queryServicePosCtrl', ['$location', function($location) {
            //
            // }]);

            user.editionView().title('修改用户 "{{entry.valus.userName}}"')
                .actions(["edit"])
                .fields([

                ]);

            user.showView() // a showView displays one entry in full page - allows to display more data than in a a list
              .fields([
                  nga.field('id'),
                  user.editionView().fields(), // reuse fields from another view in another order
                  nga.field('custom_action', 'template')
                      .label('')
                      .template('<send-email post="entry"></send-email>')
              ]);

            return user;
        });
    }]);
});
