angular.module('ExamplePage')
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.examples = [
            { name: 'one', content:'<p>Foo bar baz 1</p><p>Foo bar baz 2</p><p>Foo bar baz 3</p><p>Foo bar baz 4</p>' },
            { name: 'two', content:'<p>herp derp</p>'}
        ];

        $scope.messWithScope = function() {
        	console.log('foo');
        	console.log($scope.examples);
        	console.log($scope.examples[0]);
        	console.log($scope.examples[0].content);
        	$scope.examples[0].content = $scope.examples[0].content + '<br /><strong>foo</strong>';
        	console.log($scope.examples[0].content);
        	// $scope.$digest();
        }
    }]);