app.service('svc', function($http){

	this.post = function(art){
		return $http.post('http://localhost:3000/posts', art);
	}

	this.get = function(){
		return $http.get('http://localhost:3000/posts');
	}

	this.delete = function(id){
		return $http.delete('http://localhost:3000/posts/' + id);
	}

	this.getEntry = function(id){
		return $http.get('http://localhost:3000/posts/' + id);
	}

	this.put = function(id, art){
		return $http.put('http://localhost:3000/posts/' + id, art);
	}

});