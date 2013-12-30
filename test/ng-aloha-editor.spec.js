'use strict';
describe('Directive: aloha', function () {
  // load the directive's module
  beforeEach(module('ngAlohaEditor'));
  var element,
    scope;
  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
  it('appends aloha classes to the element', inject(function ($compile) {
    element = angular.element('<div aloha></div>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.attr('class')).toBe('ng-scope ng-isolate-scope angular-aloha-element0');
  }));
});
