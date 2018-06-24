var app = angular.module('myApp', []);
app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});

app.controller('videoController', ['$scope',
  function MyCtrl($scope) {
	 $scope.name='';

    $scope.product = [{
      name: 'somename',
      description: 'some description',
      media: [{
        src: 'v5Asedlj2cw'
      }]
    },
    {
      name: 'somename1',
      description: 'some description 2',
      media: [{
        src: 'v5Asedlj2cw'
      }]
    },
	{
      name: 'somename2',
      description: 'some description 2',
      media: [{
        src: 'fN9liaavpc8'
      }]
    },
	{
      name: 'somename3',
      description: 'some description 2',
      media: [{
        src: 'QS9UpbZ3tCA'
      }]
    }
					  
					  
    ]
    
    ;

    $scope.getIframeSrc = function(src) {
      return 'https://www.youtube.com/embed/' +src;
    };
  }
]);
app.directive('sidebarToggle', [function() {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {

			scope.element = iElement[0];
			scope.body = document.body;

			scope.element.addEventListener("click", function() {
				var _element = document.getElementById(iAttrs.sidebarToggle);
				_element.classList.toggle("sidebar--is-open");

				var _bgSidebar = document.getElementById(iAttrs.sidebarToggle + "-bg");
				_bgSidebar.classList.toggle("sidebar-bg--is-visible");

				//control body
				if (scope.body.style.overflowY == "auto") {
					scope.body.style.overflowY = "hidden";
				} else {
					scope.body.style.overflowY = "auto";
				}
			});

		}
	};
}]);

app.directive('sidebar', ['$compile', function($compile) {
	return {
		restrict: 'E',
		link: function (scope, iElement, iAttrs) {

			scope.body = document.body;
			scope.element = iElement[0];

			//renderize sidebar
			scope.element.style.display = "block";

			//add width on sidebar
			function isNumber(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}

			if (isNumber(iAttrs.size)) {
				scope.element.style.maxWidth = iAttrs.size + 'px';
			} else {
				scope.element.style.maxWidth = iAttrs.size;
			}

			//add class to position on sidebar
			scope.element.classList.add("sidebar--" + iAttrs.position);

			//renderize bg-sidebar
			var bgSidebar = document.createElement("div");
			bgSidebar.setAttribute("class", "sidebar-bg");
			bgSidebar.setAttribute("id", iAttrs.id + "-bg");
			bgSidebar.setAttribute("sidebar-toggle", iAttrs.id);
			scope.body.appendChild(bgSidebar);

			$compile(bgSidebar)(scope);

		}
	};
}]);

