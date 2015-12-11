angular.module('app', ['ui.router', 'ui.bootstrap', 'ngResource', 'countTo', 'angular-loading-bar', 'ui.select', 'ngSanitize', 'angularSpinner']).config(function ($stateProvider, $urlRouterProvider) {
     
    
    $urlRouterProvider.otherwise('app/dashboard')
    
   //Insert States Here
   
    $stateProvider
        .state('app', {url: '/app', templateUrl: 'templates/app/app.html', controller: 'AppController'})
    
        .state('app.dashboard', {url: '/dashboard', templateUrl: '/templates/app/dashboard/dashboard.html', controller: 'DashboardController'})
    
        .state('app.posts', {abstract: true, url: '/posts', template: '<ui-view>'})
            .state('app.posts.grid', {url: '/grid', templateUrl: 'templates/app/Post/grid/grid.html', controller: 'PostGridController'})
            .state('app.posts.detail', {url: '/grid', templateUrl: 'templates/app/Post/detail/detail.html', controller: 'PostDetailController'});
        
});



//Telephone Filter Code
angular.module('app').filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});


//Ui-Select 'Props Filter' Code
angular.module('app').filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});