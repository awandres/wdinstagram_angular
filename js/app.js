"use strict";

(function(){
  angular.module("wdinstagram", [
    'ui.router',
    'ngResource'
  ])
  .config([
    '$stateProvider',
    RouterFunction
  ])
  .controller('IgIndexController', [
    'Ig',
    IgIndexControllerFn
  ])
  .controller('IgNewController', [
    'Ig',
    '$state',
    IgNewControllerFn
  ])
  .controller('IgShowController', [
    'Ig',
    '$stateParams',
    IgShowControllerFn
  ])
  .controller('IgEditController', [
    'Ig',
    '$state',
    '$stateParams',
    IgEditControllerFn
  ])
  .factory('Ig' [
    '$resource',
    igService
  ])

  function igService($resource) {
    return $resource('http://localhost:3000/entries/:id', {}, {
      update: {method: 'PUT'}
    })
  }

  function IgIndexControllerFn(Ig) {
    this.instagrams = Ig.query()
  }

  function IgNewControllerFn(Ig,$state) {
    this.instagram = new Ig()
    this.create = function() {
      this.instagram.$save(() => {
        $state.go('igIndex')
      })
    }
  }

  function IgShowControllerFn(Ig, $stateParams) {
    this.instagram = Ig.get({id: $stateParams.id})
  }

  function IgEditControllerFn(Ig, $state, $stateParams) {
    this.instagram = Ig.get({id: $stateParams.id})
    this.update = function() {
      this.instagram.$update({id: $stateParams.id}, (instagram)=> {
        $state.go('igShow', {id: instagram.id})
      })
    }
    this.destroy = function() {
      this.instagram.$delete({id: $stateParams.id}, (instagram) => {
        $state.go('igIndex')
      })
    }
  }

  function RouterFunction ($stateProvider) {
    $stateProvider
    .state('igIndex', {
      url: '/instagram',
      templateUrl: 'js/ng-views/index.html',
      controller: 'IgIndexController',
      controllerAs: 'vm'
    })
    .state('igNew', {
      url: '/instagram',
      templateUrl: 'js/ng-views/new.html',
      controller: 'IgNewController',
      controllerAs: 'vm'
    })
    .state('igShow', {
      url: '/instagram',
      templateUrl: 'js/ng-views/show.html',
      controller: 'IgShowController',
      controllerAs: 'vm'
    })
    .state('igEdit', {
      url: '/instagram',
      templateUrl: 'js/ng-views/edit.html',
      controller: 'IgEditController',
      controllerAs: 'vm'
    })
  }


})();
