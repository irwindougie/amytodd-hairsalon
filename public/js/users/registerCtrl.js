var app = angular.module('app');

app.controller('RegisterCtrl', function ($scope, alert, $auth) {
    $scope.submit = function () {
        $auth.signup({email: $scope.email, password: $scope.password})
            .success(function (res) {
                alert('success', 'Account Created!', 'Welcome, ' + res.user.email + '!');
            })
            .error(function (err) {
                alert('warning', 'Opps!', err.message);
            });
    }
})