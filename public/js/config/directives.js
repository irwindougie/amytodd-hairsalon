var app = angular.module('app');

app.directive('navbar', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/navbar.html',
        controller: 'navbarCtrl',
        controllerAs: 'nav'
    }
})

app.directive('alert', function(){
    return {
        restrict: 'E',
        templateUrl: 'js/common/alert.html'
    }
})