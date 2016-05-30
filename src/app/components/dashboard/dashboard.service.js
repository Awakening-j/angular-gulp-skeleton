angular.module('app').factory('DashboardService', 
	function (HttpService) {

		return {
			loadJson: function(url){
			    return HttpService.ajax({url: url});
			}
		};
	});