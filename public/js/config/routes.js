(function () {
    var app = angular.module('routes', ['ui.router', 'satellizer']);

    app.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', '$httpProvider', '$authProvider', function ($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider, $authProvider) {

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

        $authProvider.loginUrl = '/api/auth/login';
        $authProvider.signupUrl = '/api/auth/register';

        $authProvider.google({
            clientId: '652711667071-5jbc0tder8vflra4bfehcd7i9vv1s9on.apps.googleusercontent.com',
            url: '/api/auth/google'
        })

        $authProvider.facebook({
            clientId: '494950647373050',
            url: '/api/auth/facebook'
        })


        $httpProvider.interceptors.push('authInterceptor');
    }])

    app.run(['$state', '$stateParams', function ($state, $stateParams) { }])
})();