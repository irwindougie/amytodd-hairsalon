var app = angular.module('app');

app.controller('LoginCtrl', function ($scope, $state, alert, $auth) {
    $scope.submit = function () {
        $auth.login({ email: $scope.email, password: $scope.password })
            .then(function (res) {
                var message = 'Welcome back, ' + res.data.user.email + '!';
                if (!res.data.user.active) message += '\nPlease remember to activate your account soon!'
                alert('success', 'Login Successful!', message);
                $state.go('home');
            }, HandleError);
    }

    $scope.authenticate = function (provider) {
        $auth.authenticate(provider).then(function (res) {
            alert('success', 'Login Successful!', 'Welcome back, ' + res.data.user.displayName + '!');
            $state.go('home');
        }, HandleError);
    }

    function HandleError(err) {
        alert('warning', 'Opps!', err.message);
    };
})