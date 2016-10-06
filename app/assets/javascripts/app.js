var app = angular.module('nbaApp', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/partial1', {
      templateUrl: "/partials/partial1.html",
      controller: 'playersController'
    })
    .when('/partial2', {
      templateUrl: "/partials/partial2.html",
      controller:'teamsController'
    })
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

})
//
// app.controller("playersController", function($scope){
//   $scope.players = [
//     {firstName: "Michael", lastName: "Jordan"},
//     {firstName: "Lberone", lastName: "James"},
//     {firstName: "Kevin", lastName: "Garnett"},
//     {firstName: "Dwayne", lastName: "Wade"},
//     {firstName: "Jordan", lastName: "Clarkson"},
//     {firstName: "Derek", lastName: "Fisher"},
//     {firstName: "Jimmy", lastName: "Butler"}
//   ]
// })
//
// app.controller('teamsController', function($scope){
//
//   $scope.teams = [
//     {name: "Boston Celtics"},
//     {name: "Brooklyn Nets"},
//     {name: "New York Knicks"},
//     {name: "Philadelphia 76ers"},
//     {name: "Toronto Rapters"},
//     {name: "Chicago Bulls"},
//     {name: "Cleveland Cavaliers"},
//     {name: "Detroit Pistons"},
//     {name: "Indiana Pacers"},
//     {name: "Milwaukee Bucks"},
//     {name: "Atlanta Hawks"},
//     {name: "Charlotte Hornets"},
//     {name: "Miami Heat"},
//     {name: "Orlando Magic"},
//     {name: "Washington Wizards"},
//     {name: "Denver Nuggets"},
//     {name: "Minnesota Timberwolves"},
//     {name: "Oklahoma City Thunder"},
//     {name: "Portland Trail Blazers"},
//     {name: "Utah Jazz"},
//     {name: "Golden State Warriors"},
//     {name: "Los Angeles Clippers"},
//     {name: "Los Angeles Lakers"},
//     {name: "Phoenix Suns"},
//     {name: "Sacramento Kings"},
//     {name: "Dallas Mavericks"},
//     {name: "Houston Rockets"},
//     {name: "Memphis Grizzlies"},
//     {name: "New Orleans Pelicans"},
//     {name: "San Antonio Spurs"}
//   ]
// })
////////////////////////////////////////////////////////////PLAYER

app.factory('playerFactory', function($http){
  var factory = {}
  factory.index = function(callback) {
    $http.get('/players').success(function(output){
      callback(output)
    })
  }
  factory.create = function(playerInfo, callback){
    console.log('inside factory create');
    $http.post('/players', playerInfo).success(function(output){
      console.log('hello');

      callback(output)
    })
  }
  return factory
})

app.controller('playersController', function($scope, playerFactory){
  playerFactory.index(function(json){
    $scope.players = json
  })
  $scope.createPlayer = function(){
    // console.log('inside createPlayer controller');
    playerFactory.create($scope.newPlayer, function(json){
      // console.log('does anything come back from factory');
      $scope.players = json
      $scope.newPlayer = {}
    })
  }
})
////////////////////////////////////////////////////////////PLAYER




////////////////////////////////////////////////////////////TEAM

app.factory('teamFactory', function($http){
  var factory = {}
  factory.index = function(callback) {
    $http.get('/teams').success(function(output){
      callback(output)
    })
  }
  factory.createTeam = function(newTeam, callback){
    $http.post('/teams', newTeam).success(function(output){
      callback(output)
    })

  }
  return factory
})

app.controller('teamsController', function($scope, teamFactory){
  teamFactory.index(function(json){
    $scope.teams = json
  })
  teamFactory.createTeam($scope.newTeam, function(json){
    //if its $scope.team what happens
    $scope.team = json
    $scope.newTeam = {}
  })
})
