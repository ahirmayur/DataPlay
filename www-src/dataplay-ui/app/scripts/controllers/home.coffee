'use strict'

###*
 # @ngdoc function
 # @name dataplayApp.controller:HomeCtrl
 # @description
 # # HomeCtrl
 # Controller of the dataplayApp
###
angular.module('dataplayApp')
  .controller 'HomeCtrl', ['$scope', '$location', 'Home', 'Auth', 'Overview', 'config', ($scope, $location, Home, Auth, Overview, config) ->
    $scope.config = config

    $scope.searchquery = ''

    $scope.validatePatterns = [
      {
        title: "A&E waiting times"
      }
      {
        title: "Crime Rate London"
      }
      {
        title: "GDP Prices"
      }
      {
        title: "Gold Prices"
      }
      {
        title: "NHS Spending"
      }
      {
        title: "Crime Rate London"
      }
    ]

    $scope.myActivity = []
    $scope.recentObservations = []
    $scope.dataExperts = []

    $scope.init = ->
      Home.getActivityStream()
        .success (data) ->
          if data instanceof Array
            $scope.myActivity = data.map (d) ->
              date: Overview.humanDate new Date d.time
              text: d.string

      Home.getRecentObservations()
        .success (data) ->
          if data instanceof Array
            $scope.recentObservations = data.map (d) ->
              user:
                name: d.username
                avatar: "http://www.gravatar.com/avatar/#{d.MD5email}?d=identicon"
              text: d.comment

      Home.getDataExperts()
        .success (data) ->
          if data instanceof Array

            medals = ['gold', 'silver', 'bronze']

            $scope.dataExperts = data.map (d, key) ->
              obj =
                rank: key + 1
                name: d.username
                avatar: "http://www.gravatar.com/avatar/#{d.MD5email}?d=identicon"
                score: d.reputation

              if obj.rank <= 3 then obj.rankclass = medals[obj.rank - 1]

              obj

    $scope.search = ->
      $location.path "/search/#{$scope.searchquery}"

    return
  ]
