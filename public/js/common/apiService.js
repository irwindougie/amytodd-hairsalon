var app = angular.module('app');

app.service('apiService', function ($http, $state, $window, $q, authToken) {
    /* --- Home Page API --- */
    this.getCompanyLogo = function () {
        return "Logo";
    };

    this.getScheduleDays = function () {
        return $http.get('/api/scheduler');
    };

    this.login = function (email, password) {
        return $http.post('/api/login', { email: email, password: password }).success(CacheUser);
    };

    this.register = function (email, password) {
        return $http.post('/api/register', { email: email, password: password }).success(CacheUser);
    };

    this.logout = function(){
        var defer = $q.defer();
        $http.post('/api/logout').then(function(){
            authToken.removeToken();
            defer.resolve();
        })
        return defer.promise;
    }

    /* --- Reusable Functions --- */
    function CacheUser(res){
        authToken.setToken(res.token);
        $state.go('home');
    }
})