angular.module('app').value('umToastr', toastr);

angular.module('app').factory('umNotifier', function (umToastr) {
	return {
		success: function(msg) {
			umToastr.success(msg);
			console.log('success' + msg);
		},
		error: function(msg) {
			umToastr.error(msg);
			console.log('error: ' + msg);
		}
	}
})