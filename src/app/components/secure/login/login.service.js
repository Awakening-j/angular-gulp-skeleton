angular.module('app').factory('LoginService',
	function (HttpService, IAPI) {

		return {
			loadJson: function(url, doneCallback){
			    HttpService.ajax({url: IAPI.baseURI + url}, doneCallback);
			}
		};
	});