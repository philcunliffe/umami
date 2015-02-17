angular.module('app').factory('umAuth', function ($http, umIdentity, $q) {
	return {
		authenticateUser: function(username, password) {
			var dfd = $q.defer();
			$http.post('/login', {username: username, password: password}).then(function(response) {
				if (response.data.success) {
					umIdentity.currentUser = response.data.user;
					dfd.resolve(true);
				} else {
					dfd.resolve(false);
				}
			});
			return dfd.promise;
		}
	}
})