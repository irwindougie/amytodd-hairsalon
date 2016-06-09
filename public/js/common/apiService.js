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

    /* --- Thrid Party API --- */
    var client_id = '652711667071-5jbc0tder8vflra4bfehcd7i9vv1s9on.apps.googleusercontent.com';
    var urlBuilder = [
        'response_type=code',
        'client_id=' + client_id,
        'redirect_uri=' + window.location.origin,
        'scope=profile email'
    ];

    this.googleAuth = function(){
        var url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urlBuilder.join('&');
        var options = "width=500, height=500, left=" + ($window.outerWidth - 500) / 2 + ", top =" + ($window.outerHeight - 500) / 2.5;

        var deferred = $q.defer();

        var popup = $window.open(url,'',options);
        $window.focus();

        $window.addEventListener('message', function(event){
            if(event.origin === $window.location.origin){
                popup.close();

                $http.post('/api/auth/google',{
                    code:event.data,
                    clientId: client_id,
                    redirectUri: window.location.origin
                }).success(function(jwt){
                    CacheUser(jwt);
                    deferred.resolve(jwt);
                });
            }
        });
        return deferred.promise;
    }

    /* --- Reusable Functions --- */
    function CacheUser(res){
        authToken.setToken(res.token);
        $state.go('home');
    }
})