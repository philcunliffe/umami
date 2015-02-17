angular.module('app').factory('umAuth', function ($http, umIdentity, $q, umUser) {
	return {
		authenticateUser: function(username, password) {
			var dfd = $q.defer();
			$http.post('/login', {username: username, password: password}).then(function(response) {
				if (response.data.success) {
					var user = new umUser();
					angular.extend(user, response.data.user);
					umIdentity.currentUser = user;
					dfd.resolve(true);
				} else {
					dfd.resolve(false);
				}
			});
			return dfd.promise;
		},
		signOutUser: function() {
			var dfd = $q.defer();
			$http.post('/logout', {logOut: true}).then(function () {
				umIdentity.currentUser = undefined;
				dfd.resolve();
			});
			return dfd.promise;
		}
	}
})