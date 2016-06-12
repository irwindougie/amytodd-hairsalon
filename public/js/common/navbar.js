var app = angular.module('app');

app.controller('navbarCtrl', function ($scope, apiService, $auth) {
    $scope.isAuthenticated = $auth.isAuthenticated;

    this.logo = apiService.getCompanyLogo();
});

app.controller('LogoutCtrl', function ($auth, $state) {
    $auth.logout();
    $state.go('home');
});