angular.module('app').factory('HttpService',
    function($http, $q, IAPI) {
    	var defaultSettings = {
            /**
             * default ajaxsettings of $http
             */
            // url: '',
            method: 'GET',
            // data: {},
            // params: {},
            // headers: {},
            // cache: false,
            /**
             * custom properties
             * useBaseURI: if true, settings.url = IAPI.baseURI + settings.url
             */
            useBaseURI: true
        };

        var sanitize = function(settings){
            var url = settings.url;
            var match = url.match(/^(http|https)\:\/\//),
                protocol = match ? match[0] : '',
                sanitized = url
                   .replace(/^(http|https)\:\/\//, '') // remove the leading http:// (temporarily)
                   .replace(/\\+/g, '/')       // replace consecutive backslash with a single slash
                   .replace(/\/+/g, '/')       // replace consecutive slashes with a single slash
                   .replace(/\/+$/, '');       // remove trailing slashes
            settings.url = protocol + sanitized;
            /**
             * remove custom ajaxsettings
             */
            delete settings.useBaseURI;
        };

    	return {
    		ajax: function(ajaxsettings){
                var settings = angular.extend({}, defaultSettings, ajaxsettings), 
                    deferred = $q.defer();

                if(settings.useBaseURI){
                    settings.url = IAPI.baseURI + settings.url;
                }
                sanitize(settings);

                var sequence = parseInt(Math.random() * 1000, 10);
                console.log('sequence: ' + sequence + ' - ajaxsettings: ', settings);

    			$http(settings)
                .success(function(response, status, headers, config) {
                    console.log('sequence: ' + sequence + ' - response: ', response);
                    deferred.resolve(response);
                })
                .error(function(response, status, headers, config){
                    console.log('sequence: ' + sequence + ' - response: ', response);
                    var errorMsg = "status: " + status + '.\n';
                    switch (status){
                        case 0: errorMsg += 'Can not connect to server.\n' + settings.url; break;
                        case 400: errorMsg += 'Bad rerquest.'; break;
                        case 401: errorMsg += 'Authenticate Failed. Please Login First.'; break;
                        case 403: errorMsg += 'Access forbidden. Authorize Failed.'; break;
                        case 404: errorMsg += 'Can not find target URL.\n' + settings.url; break;
                        case 405: errorMsg += 'Method not allowed. Check "http type"'; break;
                        default:
                            errorMsg += 'Unexpected Error. Please Connect Your Administrator.';
                    }
                    alert(errorMsg);
                    deferred.reject(response);
                })
                .finally(function(response){
                    //console.log('finally');
                })

                return deferred.promise;
    		}
    	}
    });