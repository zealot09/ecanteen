define(function (require) {
  'use strict';

  require('bootstrap')
  require('ng-admin'); // exports: angular, ng-admin, restangular, ui.router

	var ExampleModule = angular.module('example', ['ng-admin', 'restangular', 'ui.router']);

	// Config
	ExampleModule.config(require('example/config/api'));
	ExampleModule.config(require('example/config/routing'));
  // Config the model views
  ExampleModule.config(require('example/model/user'));

  ExampleModule.config(require('example/config/ngRender'));

	// Controller
	ExampleModule.controller('MainController', require('example/controller/MainController'));
	ExampleModule.controller('SendPostController', require('example/controller/SendPostController'));
  ExampleModule.controller('UserController', require('example/controller/UserController'));

	// Directive
	ExampleModule.directive('postLink', require('example/directive/PostLink'));
	ExampleModule.directive('sendEmail', require('example/directive/SendEmail'));
  ExampleModule.directive('servicePoint', require('example/directive/UserDirective'));

	return ExampleModule;

});
