angular.module('quizMaster')
.factory('Question', [
'$resource',
function($resource) {
	return $resource('/questions/:id.json', { id: '@id' }, {
		query: { method: 'GET', isArray: true },
		create: { method: 'POST' },
		show: { method: 'GET' },
		update: { method: 'PUT', params: { id: '@id' } },
		delete: { method: 'DELETE', params: { id: '@id' } }
	})
}])
