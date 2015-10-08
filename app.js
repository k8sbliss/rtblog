var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/posts');
    
    $stateProvider
        
        .state('compose', {
            url: '/compose',
            templateUrl: 'compose.html',
            controller: 'cController'
        })

        .state('update', {
            url: '/update/:id',
            templateUrl: 'update.html',
            controller: 'uController'
        })
 
         .state('updateSuccess', {
            url: '/updatesuccess',
            templateUrl: 'updatesuccess.html',
        })

         .state('deleteSuccess', {
            url: '/deletesuccess',
            templateUrl: 'deletesuccess.html',
        })

         .state('submitSuccess', {
            url: '/submitsuccess',
            templateUrl: 'submitsuccess.html',
        })

        .state('post', {
            url: '/post/:id',
            templateUrl: 'post.html',
            controller: 'postController'
        })

        .state('posts', {
            url: '/posts',
            views: {
                '': { templateUrl: 'posts.html' },

                'mainBody@posts': { 
                    templateUrl: 'mainBody.html',
                    controller: 'mainController' },

                'sidebar@posts': { 
                    templateUrl: 'sidebar.html',
                    controller: 'mainController'
                }
            }
            
        });
        
});

//controller for the main page
app.controller('mainController', function($scope, svc) {

    //vars for posts paging
    $scope.pageSize = 5;
    $scope.currentPage = 0;
    $scope.orderBy = "-id";
    
    $scope.numberOfPages = function(){
        return Math.ceil($scope.ct/$scope.pageSize);                
    };

    //get all data from api
    svc.get().then(function(data){
            $scope.posts = data.data;
            $scope.ct = $scope.posts.length;
    });


    // delete post in api and the view
    $scope.delete = function(id){
        svc.delete(id).then(function(){
            $scope.posts.forEach(function(el,idx){
                if(el.id === id){
                    $scope.posts.splice(idx, 1);
                }
            });
        });
    };

});

// filter for the posts paging system
app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; 
        return input.slice(start);
    };
});

//controller for the single post page
app.controller('postController', function($scope, $stateParams, $state, svc) {

    // get and view a single post from the api and be able to delete
    svc.getEntry($stateParams.id).then(function(data){
            $scope.post = data.data;
    });

    // delete the post from the single post page then redirects to success page
    $scope.delete = function(id){
        svc.delete(id).then(function(){
            $state.go('deleteSuccess');
        });
    };

});


//controller for updating post page
app.controller('uController', function($scope, $stateParams, $state, svc) {

    $scope.singleEntry = {};

    //get a single post from the api
    svc.getEntry($stateParams.id).then(function(data){
        $scope.singleEntry = data.data;
    });

    //after form submission, updates the post to the api
    $scope.submitForm = function(isValid){
        if (isValid){
            svc.put($stateParams.id, $scope.singleEntry).then(function(){
            $state.go('updateSuccess');
        });
        }

    };

});

//controller for creating new post page
app.controller('cController', function($scope, $state, svc) {

    $scope.art = {};

    $scope.clear = function(){
        $scope.art = {};
    };

    //after form submission, send the new post to the api, and redirects to success page
    $scope.submitForm = function(isValid){
        if (isValid){
            svc.post($scope.art).then(function(){
             $state.go('submitSuccess');
         });
        }

    };
    
});

