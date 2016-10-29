angular.module('quizMaster')
.controller('QuestionsCtrl', [
'$scope',
'$state',
'$stateParams',
'Question',
function($scope, $state, $stateParams, Question) {
	$scope.questions = Question.query();

	$scope.deleteQuestion = function(index) {
		Question.delete({id: $scope.questions[index].id}, function() {
			$scope.questions.splice(index, 1)
		}, function(response){
			console.log(response);
		});
	}

	$scope.errorClass = function(name) {
		var field = $scope.form[name];
		return field.$invalid && field.$dirty ? "has-error" : "";
	};
}])
angular.module('quizMaster')
.controller('QuestionsNewCtrl', [
'$scope',
'$state',
'$stateParams',
'Question',
function($scope, $state, $stateParams, Question) {
	$scope.question = {};

	$scope.create = function(){
		Question.create({question: $scope.question}, function() {
			$state.go('questions');
		}, function(response) {
			// set error
			$scope.errors = {};
			angular.forEach(response.data, function(errors, field) {
				$scope.form[field].$dirty = true;
				$scope.form[field].$setValidity('server', false);
				$scope.errors[field] = errors.join(', ');
			});
		});
	}

	$scope.errorClass = function(name) {
		var field = $scope.form[name];
		return field.$invalid && field.$dirty ? "has-error" : "";
	};
}])
.controller('QuestionsEditCtrl', [
'$scope',
'$state',
'$stateParams',
'Question',
function($scope, $state, $stateParams, Question) {
	$scope.question = Question.get({id: $stateParams.id});

	$scope.update = function() {
		Question.update({id: $scope.question.id, question: $scope.question}, function(res) {
			$state.go('questions');
		}, function(response){
			// set error
			$scope.errors = {}
			angular.forEach(response.data, function(errors, field) {
				$scope.form[field].$dirty = true;
				$scope.form[field].$setValidity('server', false);
				$scope.errors[field] = errors.join(', ');
			});
		});
	}

	$scope.errorClass = function(name) {
		var field = $scope.form[name];
		return field.$invalid && field.$dirty ? "has-error" : "";
	};
}])

.controller('QuestionsShowCtrl', [
'$scope',
'$state',
'$stateParams',
'Question',
function($scope, $state, $stateParams, Question) {
	$scope.question = Question.get({id: $stateParams.id});
}])
