angular.module('app').controller('umLoginCtrl', function($scope, $http, umNotifier, umIdentity, umAuth) {
	$scope.identity = umIdentity;
	$scope.signin = function(username, password) {
		umAuth.authenticateUser(username, password).then(function (success) {
			if(success) {
				umNotifier.success('You have successfully signed in');
			} else {
				umNotifier.error('Username/Password combination incorrect');
			}
		})
	};
});