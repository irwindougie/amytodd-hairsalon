var app = angular.module('app');

app.controller('RegisterCtrl', function ($scope, $state, alert, $auth) {
    $scope.submit = function () {
        $auth.signup({ email: $scope.email, password: $scope.password })
            .then(function (res) {
                alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '!\nPlease remember to verify your email within the next several days.');
                $auth.setToken(res.data.token);
                $state.go('home');
            }).catch(function (err){
                alert('warning', 'Opps!', err.message);
            });
    }
})