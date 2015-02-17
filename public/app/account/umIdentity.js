angular.module('app').factory('umIdentity', function ($window, umUser) {
	var currentUser;
	if(!!$window.bootstrappedUserObject) {
		currentUser = new umUser();
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function() {
			return !!this.currentUser;
		}
	}
})