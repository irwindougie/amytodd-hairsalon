var app = angular.module('app');

app.controller('LoginCtrl', function ($scope, apiService, alert) {
    $scope.submit = function () {
        apiService.login($scope.email, $scope.password)
            .success(function (res) {
                alert('success', 'Login Successful!', 'Welcome back, ' + res.user.email + '!');
            })
            .error(HandleError);
    }

    $scope.google = function () {
        apiService.googleAuth().then(function (res) {
            alert('success', 'Login Successful!', 'Welcome back, ' + res.user.displayName + '!');
        }, HandleError);
    }


    function HandleError(err) {
        alert('warning', 'Opps!', err.message);
    };
})