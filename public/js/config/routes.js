(function(){
    var app = angular.module('routes', ['ui.router']);
    
    app.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', '$httpProvider', function ($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider) {
        
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/');   
        
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'js/home/home.html'
            })
                        
            .state('services', {
                url: '/services'
            })
            .state('schedule', {
                url: '/schedule',
                templateUrl: 'js/scheduler/scheduler.html',
                controller: 'SchedulerCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'js/users/register.html',
                controller: 'RegisterCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'js/users/login.html',
                controller: 'LoginCtrl'
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            })

            $httpProvider.interceptors.push('authInterceptor');
    }])
    
    app.run(['$state', '$stateParams', function($state, $stateParams){}])
})();