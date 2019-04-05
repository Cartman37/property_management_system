var app = angular.module('main', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: './components/home.html',
		controller: 'homeCtrl'
	}).when('/logout', {
		resolve: {
			deadResolve: function($location, user) {
				user.clearData();
				$location.path('/');
			}
		}
	}).when('/login', {
		templateUrl: './components/login.html',
		controller: 'loginCtrl'
	}).when('/dashboard', {
		resolve: {
			check: function($location, user) {
				if(!user.isUserLoggedIn()) {
					$location.path('/login');
				}
			}
		},
		templateUrl: './components/dashboard.html',
		controller: 'dashboardCtrl'
	}).when('/items', {
		templateUrl: './components/item/items.html',
		controller: 'itemCtrl'
	}).when('/appointments', {
		templateUrl: './components/appointment/appointments.html',
		controller: 'apptCtrl'
	}).when('/clients', {
		templateUrl: './components/client/clients.html',
		controller: 'clientCtrl'
	}).when('/package', {
		templateUrl: './components/package/getpackage.html',
		controller: 'packageCtrl'
	}).when('/properties', {
		templateUrl: './components/property/properties.html',
		controller: 'propertyCtrl'
	}).when('/users', {
		templateUrl: './components/user/users.html',
		controller: 'userCtrl'
	})
		.otherwise({
			template: '404'
		});

	$locationProvider.html5Mode(true);
});

app.service('user', function() {
	var username;
	var loggedin = false;
	var id;

	this.getName = function() {
		return username;
	};

	this.setID = function(userID) {
		id = userID;
	};
	this.getID = function() {
		return id;
	};

	this.isUserLoggedIn = function() {
		if(!!localStorage.getItem('login')) {
			loggedin = true;
			var data = JSON.parse(localStorage.getItem('login'));
			username = data.username;
			id = data.id;
		}
		return loggedin;
	};

	this.saveData = function(data) {
		username = data.user;
		id = data.id;
		loggedin = true;
		localStorage.setItem('login', JSON.stringify({
			username: username,
			id: id
		}));
	};

	this.clearData = function() {
		localStorage.removeItem('login');
		username = "";
		id = "";
		loggedin = false;
	}
});

app.controller('homeCtrl', function($scope, $location) {
	$scope.goToLogin = function() {
		$location.path('/login');
	};
	$scope.register = function() {
		$location.path('/register');
	}
});

app.controller('loginCtrl', function($scope, $http, $location, user) {
	$scope.login = function() {
		var username = $scope.username;
		var password = $scope.password;
		$http({
			url: 'http://localhost:3000/angularjs-mysql/server.php',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: 'username='+username+'&password='+password
		}).then(function(response) {
			if(response.data.status === 'loggedin') {
				user.saveData(response.data);
				$location.path('/dashboard');
			} else {
				alert('invalid login');
			}
		})
	}
});

app.controller('dashboardCtrl', function($scope, user, $http) {
	$scope.user = user.getName();

	$scope.newPass = function() {
		var password = $scope.newpassword;
		$http({
			url: 'http://localhost/angularjs-mysql/updatePass.php',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: 'newPass='+password+'&id='+user.getID()
		}).then(function(response) {
			if(response.data.status === 'done') {
				alert('Password updated');
			} else {
				alert('CSRF maybe?');
			}
		})
	};
});

app.controller('itemCtrl', function($scope, $location) {
});

app.controller('apptCtrl', function($scope, $location) {
});

app.controller('clientCtrl', function($scope, $location) {
});

app.controller('packageCtrl', function($scope, $location) {
});

app.controller('propertyCtrl', function($scope, $location) {
});

app.controller('userCtrl', function($scope, $location) {
});
