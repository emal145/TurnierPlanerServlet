/**
 * 
 */
var services = angular.module('services.services', ['ngResource']);

services.factory('TournamentFactory', function ($resource) {
    return $resource('/Rest/rest/tournament', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: false
        }
    })
});

