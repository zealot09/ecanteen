define(function (require) {
    'use strict';

    function userAdmin($provide, NgAdminConfigurationProvider) {
      $provide.factory("UserAdmin", function () {
      var nga = NgAdminConfigurationProvider;
      var user = nga.entity('Users');

      user.listView()
        .title("用户管理")
        .description('所有用户')
        .fields([
            nga.field('id').label('ID'),
            nga.field('userName', 'string'),
            nga.field('nickName', 'string'),
            nga.field('password', 'string'),
            nga.field('email'),
            nga.field('token', 'string')
        ])
        .listActions(['show', 'edit', 'delete'])
        .actions(['batch', 'export', '<ma-create-button entity="::entity" label="创建用户"></ma-create-button>']);

      user.creationView()
          .title("创建用户")
          .fields([
          nga.field('userName').label('用户名')
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
          .template('<service-point></service-point>')
      ]);

      user.editionView().title('修改用户 "{{entry.values.nickName}}"')
          .actions(['list', 'show', 'delete'])
          .fields([
            user.creationView().fields()
          ]);

      user.showView() // a showView displays one entry in full page - allows to display more data than in a a list
        .fields([
            user.editionView().fields()
        ]);

      return user;
    });

    }

    userAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];
    return userAdmin;
});
