'use strict';

angular.module('app')
	.constant('IStorage', {
		user: 'app_user',
		other: 'sec commit3'
	})
	.constant('IResponseStatus', {
		success: 'SUCCESS'
	})
	.constant('IAPI', {
		baseURI: ''//http://localhost:8080/rest/
	})
