var app = angular.module('auth');

app.factory('authToken', function ($window) {
    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'userToken';
    var authToken = {
        getToken: function () {
            if (!cachedToken) cachedToken = storage.getItem(userToken);

            return cachedToken;
        },
        setToken: function (token) {
            cachedToken = token;
            storage.setItem(userToken, token);
        },
        removeToken: function () {
            cachedToken = null;
            storage.removeItem(userToken);
        },
        isAuthenticated: function () {
            return !!authToken.getToken();
        }
    }
    return authToken;
});