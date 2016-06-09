var app = angular.module('app');

app.controller('navbarCtrl', function ($scope, apiService, authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
    
    this.logo = apiService.getCompanyLogo();
});

app.controller('LogoutCtrl', function(apiService, $state){
    apiService.logout().then(function() {
        $state.go('home');
    });
});