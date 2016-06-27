
var app = angular.module('blogNews',['ui.router']);


var postService = app.service('postService', function(){
                        var count = 0;
                        this.posts = [
                                        {id: count++, title: 'post 1', upvotes: 5,
                            comments: [
                                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                              ]},
                                        {id: count++, title: 'post 2', upvotes: 2,
                            comments: [
                                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                              ]},
                                        {id: count++, title: 'post 3', upvotes: 1,
                            comments: [
                                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                              ]},
                                        {id: count++, title: 'post 4', upvotes: 9,
                            comments: [
                                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                              ]},
                                        {id: count++, title: 'post 5', upvotes: 4,
                            comments: [
                                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                              ]}
                                     ];
                        this.getPosts = function(){
                            return posts;
                        }

                        this.addPost = function(title, link){
                            if(!title || title == ''){
                                return;
                            }
                            this.posts.push({id: count++, title: title, link: link, upvotes: 0,
                            comments: [
                                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                              ]});
                        }

                        this.incrementUpvotes = function(post){
                            post.upvotes += 1;
                        }

                        this.addComment = function(commentBody, id){
                             if(commentBody === '') { return; }
                                var post = this.posts[id];
                                post.comments.push({
                                body: commentBody,
                                author: 'user',
                                upvotes: 0
                                });
                             };

                    });

var homeController = app.controller('homeController', ['$scope', 'postService', function($scope, postService){
                        $scope.test = "My first Angular JS app";

                        $scope.posts = postService.posts;

                        $scope.addPost = function(){
                            postService.addPost($scope.title, $scope.link);
                            $scope.title = '';
                            $scope.link = '';
                        }

                        $scope.incrementUpvotes = function(post){
                            postService.incrementUpvotes(post);
                        }
                        }]);

var postController = app.controller('postController',['$scope','$stateParams','postService', function($scope, $stateParams, postService){
                        $scope.post = postService.posts[$stateParams.id];
                        $scope.addComment = function(){
                          postService.addComment($scope.commentBody, $stateParams.id);
                          $scope.commentBody = '';
                        };

                        }]);

var config = app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
                        $stateProvider.state('home',{
                            url: '/home',
                            templateUrl: '/home.html',
                            controller: 'homeController'
                        });
                        $stateProvider.state('postComments',{
                            url: '/post/{id}',
                            templateUrl: '/posts.html',
                            controller: 'postController'
                        });
                        $urlRouterProvider.otherwise('home');
                    }]);
