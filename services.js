app.service('svc', function($http){

$http.defaults.headers.common['X-Parse-Application-Id'] = 'kALKRilqFndwQTsIo5UStkexavT1aMTE1i0TjEEI';
$http.defaults.headers.common['X-Parse-REST-API-Key'] = 'tvwMqtRDwtox8R47vcXeRkGokfE9sQv8KhJcCtZV';


	this.post = function(art){
		return $http.post('https://api.parse.com/1/classes/posts/', art);
	}

	this.get = function(){
		return $http.get('https://api.parse.com/1/classes/posts/');
	}

	this.delete = function(id){
		return $http.delete('https://api.parse.com/1/classes/posts/' + id);
	}

	this.getEntry = function(id){
		return $http.get('https://api.parse.com/1/classes/posts/' + id);
	}

	this.put = function(id, art){
		return $http.put('https://api.parse.com/1/classes/posts/' + id, art);
	}

});