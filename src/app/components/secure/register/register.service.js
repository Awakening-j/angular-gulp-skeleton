angular.module('app').factory('RegisterService', 
	function (HttpService, IAPI) {

		return {
			register: function(url, doneCallback){
			    HttpService.ajax({url: IAPI.baseURI + url}, doneCallback);
			}
		};
	});