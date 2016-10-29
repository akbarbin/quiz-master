angular.module('quizMaster')
.controller('ExamsCtrl', [
'$scope',
'$http',
'$state',
'Question',
function($scope, $http, $state, Question) {
	$scope.questions = Question.query();
}])
.controller('ExamsShowCtrl', [
'$scope',
'$stateParams',
'$http',
'$filter',
'$state',
'Question',
function($scope, $stateParams, $http, $filter, $state, Question) {
	$scope.question = Question.get({id: $stateParams.id});
	$scope.exam = {};

	$scope.validateExam = function() {
		$http.post('/exams/check_answer.json', {exam: $scope.exam}).then(function(response){
			$scope.question.result = response.data.result;
			//filter the array
			var foundItem = $filter('filter')($scope.questions, { id: $scope.question.id  }, true)[0];
			//get the index
			var index = $scope.questions.indexOf(foundItem);

			$scope.questions[index].result = response.data.result;
		},
		function(res) {

		});
	};
}])
