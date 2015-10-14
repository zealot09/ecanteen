define(["ngAdmin", "jQuery"], function() {
    "use strict";

    var app = angular.module('myApp');

    app.config([
        "NgAdminConfigurationProvider", "UserAdminProvider", function (NgAdminConfigurationProvider, UserAdmin) {
            var nga = NgAdminConfigurationProvider;
            var admin = nga
                .application('e食堂管理平台')
                .baseApiUrl('http://api.ecanteen.com/api/');

            function truncate(value) {
                if (!value) {
                    return '';
                }

                return value.length > 50 ? value.substr(0, 50) + '...' : value;
            }
            var user = UserAdmin.$get();
            admin.addEntity(user);

            // customize header
            var customHeaderTemplate =
            '<div class="navbar-header">' +
                '<a class="navbar-brand" href="#" ng-click="appController.displayHome()">e食堂管理后台</a>' +
            '</div>' +
            '<p class="navbar-text navbar-right">' +
                '<a href=""><span class="glyphicon glyphicon-sunglasses"></span>退出登录</a>' +
            '</p>';
            admin.header(customHeaderTemplate);

            admin.menu(nga.menu()
                .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-file"></span>'))
                .addChild(nga.menu().title('其他')
                  .addChild(nga.menu().title('banner').icon('').link('/stats'))
                )
              );

            // customize dashboard
            var customDashboardTemplate =
            '<div class="row dashboard-starter"></div>' +
            '<div class="row dashboard-content"><div class="col-lg-12"><div class="alert alert-info">' +
                'Welcome to the demo! Fell free to explore and modify the data. We reset it every few minutes.' +
            '</div></div></div>' +
            '<div class="row dashboard-content">' +
                '<div class="col-lg-12">' +
                    '<div class="panel panel-default">' +
                        '<ma-dashboard-panel collection="dashboardController.collections.comments" entries="dashboardController.entries.comments"></ma-dashboard-panel>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="row dashboard-content">' +
                '<div class="col-lg-6">' +
                    '<div class="panel panel-green">' +
                        '<ma-dashboard-panel collection="dashboardController.collections.recent_posts" entries="dashboardController.entries.recent_posts"></ma-dashboard-panel>' +
                    '</div>' +
                    '<div class="panel panel-green">' +
                        '<ma-dashboard-panel collection="dashboardController.collections.popular_posts" entries="dashboardController.entries.popular_posts"></ma-dashboard-panel>' +
                    '</div>' +
                '</div>' +
                '<div class="col-lg-6">' +
                    '<div class="panel panel-yellow">' +
                        '<ma-dashboard-panel collection="dashboardController.collections.tags" entries="dashboardController.entries.tags"></ma-dashboard-panel>' +
                    '</div>' +
                '</div>' +
            '</div>';

            admin.dashboard(nga.dashboard()
             .addCollection(nga.collection(user)
                 .name('最近订单')
                 .title('最近订单')
                 .perPage(5) // limit the panel to the 5 latest posts
                 .fields([
                     nga.field('published_at', 'date').label('Published').format('MMM d'),
                     nga.field('title').isDetailLink(true).map(truncate),
                     nga.field('views', 'number')
                 ])
                 .sortField('published_at')
                 .sortDir('DESC')
                 .order(1)
             ).template(customDashboardTemplate)
           );
            nga.configure(admin);
        }
    ]);

    return app;
});
