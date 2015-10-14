define(function(require) {
    "use strict";

    // var angular = require('angular');
    var ngAdmin = require('ngAdmin');
    var jquery = require('jQuery');
    // var services = require('./app/service/');
    console.log(angular)
    var app = angular.module('myApp', ['ng-admin']);

    app.init = function () {
      angular.bootstrap(document, ['myApp','ng-admin']);
    };

    app.config(['NgAdminConfigurationProvider', 'RestangularProvider', function (NgAdminConfigurationProvider, RestangularProvider) {
        var nga = NgAdminConfigurationProvider;

        // use the custom query parameters function to format the API request correctly
        RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
            if (operation == "getList") {
                // custom pagination params
                if (params._page) {
                    params._start = (params._page - 1) * params._perPage;
                    params._end = params._page * params._perPage;
                }
                delete params._page;
                delete params._perPage;
                // custom sort params
                if (params._sortField) {
                    params._sort = params._sortField;
                    params._order = params._sortDir;
                    delete params._sortField;
                    delete params._sortDir;
                }
                // custom filters
                if (params._filters) {
                    for (var filter in params._filters) {
                        params[filter] = params._filters[filter];
                    }
                    delete params._filters;
                }
            }
            return { params: params };
        });
    }]);

    var controllers = require('./app/controller/userController')
    var directives = require('./app/directive/userDirective');
    var models = require('./app/model/user');

    app.config([
     "NgAdminConfigurationProvider", "UserAdminProvider", function (NgAdminConfigurationProvider, UserAdmin) {
         var nga = NgAdminConfigurationProvider;
         var admin = nga
             .application('eʳ�ù���ƽ̨')
             .baseApiUrl('http://api.ecanteen.com/api/');

         var user = UserAdmin.$get();
         admin.addEntity(user);

         // customize header
         var customHeaderTemplate =
         '<div class="navbar-header">' +
             '<a class="navbar-brand" href="#" ng-click="appController.displayHome()">eʳ�ù�����̨</a>' +
         '</div>' +
         '<p class="navbar-text navbar-right">' +
             '<a href=""><span class="glyphicon glyphicon-sunglasses"></span>�˳���¼</a>' +
         '</p>';
         admin.header(customHeaderTemplate);

         admin.menu(nga.menu()
             .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-file"></span>'))
             .addChild(nga.menu().title('����')
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
              .name('��������')
              .title('��������')
              .perPage(5) // limit the panel to the 5 latest posts
              .fields([
                  nga.field('published_at', 'date').label('Published').format('MMM d'),
                  nga.field('title').isDetailLink(true).map(w.truncate),
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
