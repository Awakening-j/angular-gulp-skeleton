'use strict';

angular.module('app')
	.directive('pluginDirective', function() {
		return {
			restrict: 'A',
			link: function(scope, iElement, iAttrs){

			}
		}
	})

	.directive('dropdownMultiselectInputgroup', function($compile, $timeout) {
		var options = {
			loading: true,
	    	wait: 300
		};
	    return {
	    	restrict: 'A',
	    	replace: 'true',
	    	scope: {
	    		dropdownItems: '=',
	    		selectedDropdownItems: '=',
	    		extraSettings: '=',
	    		msiSearchModel: '=',
	    		msiOnSearch: '&'
	    	},
	    	template: function(element, attrs){
	    		var template = 
	    			'<div class="msi-wrap">' +
			    		'<form name="msiForm">' +
				    		'<div class="input-group">' +
						      '<input type="text" ng-model="msiSearchModel" class="form-control msi-seachbox" placeholder="Search for...">' +
						      '<span class="input-group-btn">' +
					        	'<button class="btn btn-primary" type="submit">Go!</button>' +
						      '</span>' +
						    '</div>' +
					    '</form>' +
					    '<div ng-dropdown-multiselect options="dropdownItems" selected-model="selectedDropdownItems" extra-settings="extraSettings"></div>' +
				    '</div>';
	    	    return template;
	    	},
	        link: function(scope, iElement, iAttrs){
	        	var showDropdown = function(){
	        	    iElement.find('.dropdown-menu-form').show();
	        	};

	        	var hideDropdown = function(){
	        	    iElement.find('.dropdown-menu-form').hide();
	        	};

	        	scope.onSearch = _.debounce(function(){
                	scope.msiOnSearch();
	        	}, 300);

	        	angular.element('.msi-seachbox').on('focus', function(e){
	        		if(scope.msiSearchModel.length > 0){
                    	showDropdown();
	        		}
	            });

	            scope.$watch('msiSearchModel', function(newValue, oldValue){
	                if(newValue != oldValue){
	                	if(newValue.length == 0){
	                		hideDropdown();
	                	}else {
	                		showDropdown();
	                		scope.onSearch();
	                	}
	                }
	            });

	            angular.element(document).on('click', function(e){
	                var $target = angular.element(e.target);
	                if($target.hasClass('msi-wrap') || $target.parents('.msi-wrap').length > 0){
	                    //ignore
	                }else {
	                    hideDropdown();
	                }
	            });

	         //    var loading = (iAttrs.msiLoading + '') == 'false' ? false : true;
	         //    var wait = iAttrs.msiWaitMs;

	         //    var template = "";

	         //    var parent = iElement.parent();
	         //    parent.css('position', 'relative');
	         //    var inputName = iAttrs.name || iAttrs.ngModel || 'msiSearchbox';
	         //    var focus = iElement.attr('msi-focus');
	         //    var ngModel = iAttrs.ngModel || 'msiSearchbox';
	         //    iElement.attr('name', inputName)
	         //            .attr('ng-model', ngModel)
	         //            .addClass('msi-seachbox')
	         //            .removeAttr('multiselect-input');//avoid endless loop
	         //    var errorHtml = '<span class="search-field-loading"></span><span class="search-field-required" ng-class="{\'on\': msiForm.' + inputName + '.$dirty && msiForm.' + inputName + '.$error.required}">Required</span>',
	         //        dropdownHtml = '<div class="msi-dropdown" ng-dropdown-multiselect options="dropdownItems" selected-model="selectedDropdownItems" extra-settings="extraSettings"></div>',
	         //        inputHtml = iElement[0].outerHTML,
	         //        $form = angular.element(document.createElement('form'));
	         //    $form.addClass('input-group  multiselectInputForm')
	         //         .attr('name', 'msiForm')
	         //         .append(inputHtml)
	         //         .append(errorHtml)
	         //         .append(dropdownHtml);

	         //    var content = $compile($form[0].outerHTML)(scope);
	         //    iElement.after(content);
	         //    iElement.remove();


	         //    angular.element(document).on('click', function(e){
	         //        var $target = angular.element(e.target);
	         //        if($target.hasClass('multiselectInputForm') || $target.parents('.multiselectInputForm').length > 0){
	         //            //ignore
	         //        }else {
	         //            angular.element('.msi-dropdown').hide();
	         //        }
	         //    });

	         //    angular.element('.msi-seachbox').on('input', function(e){
	         //        if(scope[ngModel] && scope[ngModel].length > 0)
	         //            angular.element('.msi-dropdown').show();
	         //        else
	         //            angular.element('.msi-dropdown').hide();
	         //    });

	         //    angular.element('.msi-seachbox').on('focus', function(e){
	         //        if(scope[ngModel] && scope[ngModel].length > 0)
	         //            angular.element('.msi-dropdown').show();
	         //    });

	         //    var timer = false;
	         //    if(focus){
	         //        angular.element('.msi-seachbox').focus();
	         //    }

	         //    scope.$watch(ngModel, function (newVal) {
	         //        if(newVal){
	         //            //if(autoLoading){
	         //                angular.element('.search-field-loading').show();
	         //            //}
	         //            if (timer) {
	         //                $timeout.cancel(timer);
	         //            }
	         //            timer = $timeout(function () {
	         //                if (!scope.$$phase) {
	         //                    scope.$apply(function(){
	         //                        var watch = scope.$watch('dropdownItems', function(newValue, oldValue){
	         //                            if(autoLoading){
	         //                                angular.element('.search-field-loading').hide();
	         //                            }
	         //                            watch();
	         //                        }, true);
	         //                        scope.$eval(iAttrs.msiOnSearch);
	         //                    });
	         //                }
	         //            }, iAttrs.msiWaitMs || 300);
	         //        }
	         //    });
	        }
	    }
	});