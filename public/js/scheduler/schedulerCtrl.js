var app = angular.module('app');

app.controller('SchedulerCtrl', function ($scope, apiService) {
    apiService.getScheduleDays()
        .success(function (res) { $scope.days = res; })
        .error(HandleError);

    function HandleError(err) {
        alert('warning', 'Opps!', err.message);
    };
})