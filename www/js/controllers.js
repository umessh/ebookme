angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state) {
     
     $scope.form={tag:''};
    $scope.search = function(){
      $state.go('list',{'tag':$scope.form.tag})
    };
})
.controller('ListCtrl', function($scope, $stateParams, $http) {
    $scope.url = 'http://it-ebooks-api.info/v1/search/'; 
    $scope.bookUrl = 'http://it-ebooks-api.info/v1/book/'; 
    $scope.searchTag = $stateParams.tag
    $scope.result = ''
    $scope.books = []
    searchUrl = $scope.url + $scope.searchTag;
    $http.get(searchUrl).then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
     $scope.result = resp.data;
     $scope.books = resp.data.Books;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });
  $scope.download= function(bookId){
    bookInfoUrl = $scope.bookUrl + bookId;
    $http.get(bookInfoUrl).then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
     $scope.result = resp.data;
     window.open(resp.data.Download,'_blank');
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
  }
})
.controller('InfoCtrl', function($scope) {});
