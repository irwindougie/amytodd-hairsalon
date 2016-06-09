var app = angular.module('app');

app.controller('RegisterCtrl', function ($scope, alert, apiService) {
    $scope.submit = function () {
        apiService.register($scope.email, $scope.password)
            .success(function (res) {
                alert('success', 'Account Created!', 'Welcome, ' + res.user.email + '!');
            })
            .error(function (err) {
                alert('warning', 'Opps!', err.message);
            });
    }
})