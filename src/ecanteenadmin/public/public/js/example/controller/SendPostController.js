define(function (require) {
    'use strict';

	function SendPostController($stateParams, notification) {
        this.postId = $stateParams.id;
        // notification is the service used to display notifications on the top of the screen
        this.notification = notification;
	};
	
    SendPostController.prototype.sendEmail = function() {
        if (this.email) {
            this.notification.log('Email successfully sent to ' + this.email, {addnCls: 'humane-flatty-success'});
        } else {
            this.notification.log('Email is undefined', {addnCls: 'humane-flatty-error'});
        }
    };

	SendPostController.$inject = ['$stateParams', 'notification'];
	
	return SendPostController;
});
