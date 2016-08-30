angular.module('app', [])
.factory('handle', function($http) {
	return {
		went: [],
		go: [],
		addPlace: function(place, been) {
			if (!this.repeatAlert(place)) {
				if (been) {
					this.went.push(place);
				} else {
					this.go.push(place);
				}
			}
		},
		repeatAlert: function(place) {
			if (this.went.indexOf(place) > -1 || this.go.indexOf(place) > -1) {
				alert('This location has already been added.  Please enter a new location.');
				return true;
			}
			return false;
		},
		// displayPhoto: function($scope, url) {
		// 	console.log("inside displayPhoto", url);
		// 	$scope.background = url || 'https://drscdn.500px.org/photo/103460517/h%3D1080_k%3D1_a%3D1/876e5fa40d334800658768314f40e0be';

		// },
		getPhoto: function(query) {
			var urlBase = 'https://api.500px.com/v1/photos/search?term=';
			var imgSize = '&image_size=6';
			var consumerKey = '&consumer_key=dxxr3fLmMYZ3amDX1fGx6HEvLMGenEIUWzLcCkPr';
			var imgURL;

			return $http.get(
				// "https://api.500px.com/v1/photos/search?term=" + query + '&image_size=6&consumer_key=dxxr3fLmMYZ3amDX1fGx6HEvLMGenEIUWzLcCkPr',
				// {
				// 	consumer_key: 'dxxr3fLmMYZ3amDX1fGx6HEvLMGenEIUWzLcCkPr',
				// 	term: query,
				// 	image_size: 6
				// }
				urlBase + query + imgSize + consumerKey
			).then(function(results) {
				
				var rand = Math.floor(Math.random() * 10);
				
				var image = 'https://500px.com' + results.data.photos[rand].url;
				var imageUrl = results.data.photos[rand].image_url;
				//on success, call displayPhoto
				//this.displayPhoto(imageUrl);
				imgURL = imageUrl;
				console.log('imgURL>>>', imgURL);
				return imgURL;
			}.bind(this), function(err) {
					console.log("error: ", err);
			});
			console.log("imgURL", imgURL);
			// return imgURL;
		}
	}
})
.controller('visitCtrl', function($scope, handle) {

	$scope.background = 'https://drscdn.500px.org/photo/117938279/h%3D1080_k%3D1_a%3D1/0db95d3e636cc1173514983a4e0bf348';
	// $scope.background = 'https://drscdn.500px.org/photo/136406239/h%3D1080_k%3D1_a%3D1/2e0e7371eba9a89b546a1a17414d1679';
	$scope.visit = function() {
		
		handle.getPhoto($scope.location).then(function(url) {
			console.log('yooo', url);
			$scope.displayPhoto(url);
		});
		
		handle.addPlace($scope.location, false);
		$scope.go = handle.go;
		$scope.location = '';
	};

	$scope.visited = function() {
		console.log("inside visited");
		handle.getPhoto($scope.location);
		handle.addPlace($scope.location, true);
		$scope.went = handle.went;
		$scope.location = '';
	};

	$scope.move = function(place) {
		console.log("inside move");
		console.log("moving", place);
		handle.went.push(place);
		$scope.went = handle.went;
		$scope.removeFromGo(place);
		console.log("went: ", handle.went);
		console.log("go: ", handle.go);
	};

	$scope.removeFromGo = function(place) {
		console.log("inside remove", place);
		handle.go = handle.go.filter(function(loc) {
			return loc !== place;
		});
		$scope.go = handle.go;
	};

	$scope.removeFromWent = function(place) {
		console.log("inside remove", place);
		handle.went = handle.went.filter(function(loc) {
			return loc !== place;
		});
		$scope.went = handle.went;
	};

	$scope.displayPhoto = function(url) {
		console.log("inside displayPhoto", url);
		$scope.background = url;
	};

	// $scope.getPhoto = function(query) {
	// 	$.ajax({
	// 		url: "https://api.500px.com/v1/photos/search?",
	// 		type: 'GET',
	// 		data: {
	// 			consumer_key: 'dxxr3fLmMYZ3amDX1fGx6HEvLMGenEIUWzLcCkPr',
	// 			term: query,
	// 			image_size: 6
	// 		},
	// 		success: function(results) {
	// 			var rand = Math.floor(Math.random() * 10);
	// 			var image = results.photos[rand].imgage_url;
	// 			console.log(image);
	// 		},
	// 		error: function(err) {
	// 			console.log("error: ", err);
	// 		}
	// 	});
	// };
});