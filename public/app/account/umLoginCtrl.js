angular.module('app').controller('umLoginCtrl', function($scope, $http, $location, umNotifier, umIdentity, umAuth) {
	$scope.identity = umIdentity;
	$scope.signIn = function(username, password) {
		umAuth.authenticateUser(username, password).then(function (success) {
			if(success) {
				umNotifier.success('You have successfully signed in');
				$scope.username = '';
				$scope.password = '';
			} else {
				umNotifier.error('Username/Password combination incorrect');
			}
		})
	};
	$scope.signOut = function () {
		umAuth.signOutUser().then(function () {
			$scope.username = '';
			$scope.password = '';
			umNotifier.success('You have successfully signed out');
			$location.path('/');
		});
	};
});