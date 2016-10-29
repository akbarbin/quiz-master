angular.module('quizMaster', ['ui.router', 'templates', 'ngResource'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_index.html',
      controller: 'MainCtrl'
    })
		.state('questions', {
			url: '/questions',
			templateUrl: 'questions/_index.html',
			controller: 'QuestionsCtrl'
		})
		.state('questions_new', {
			url: '/questions/new',
			templateUrl: 'questions/_new.html',
			controller: 'QuestionsNewCtrl'
		})
		.state('questions_show', {
			url: '/questions/:id',
			templateUrl: 'questions/_show.html',
			controller: 'QuestionsShowCtrl'
		})
		.state('questions_edit', {
			url: '/questions/:id/edit',
			templateUrl: 'questions/_edit.html',
			controller: 'QuestionsEditCtrl'
		})
		.state('exams', {
			url: '/exams',
			templateUrl: 'exams/_index.html',
			controller: 'ExamsCtrl'
		})
		.state('exams.questions', {
			url: '/questions/:id',
			templateUrl: 'exams/_show.html',
      controller: 'ExamsShowCtrl'
		});

  $urlRouterProvider.otherwise('home');
}])
.directive('serverError', [function(){
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope,element,attrs,ctrl){
      return element.on('change keyup', function(){
        return scope.$apply(function(){
          return ctrl.$setValidity('server', true);
        });
      });
    }
  };
}]);
