angular.module('app').factory('umIdentity', function () {
	return {
		currentUser: undefined,
		isAuthenticated: function() {
			return !!this.currentUser;
		}
	}
})