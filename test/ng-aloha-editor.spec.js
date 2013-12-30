'use strict';
describe('Directive: aloha', function () {
  // load the directive's module
  // http://stackoverflow.com/a/16662825/393758
  beforeEach(angular.mock.module('ngAlohaEditor'));
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
